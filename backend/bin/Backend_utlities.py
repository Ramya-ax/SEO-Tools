from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
from google import genai
import json
import os
from pydantic import BaseModel, Field
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import gzip
from client import RestClient
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from typing import List, Any
import os
from dotenv import load_dotenv
load_dotenv()

client = RestClient(os.getenv("DATAFORSEO_USERNAME"), os.getenv("DATAFORSEO_PASSWOR"))
Gen_client = genai.Client(api_key=os.getenv("GEMINI_APIKEY"))
visited_sitemaps=set()    
REQUEST_TIMEOUT = (5, 40)

REAL_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Referer": "https://www.google.com/",
}

def create_session():
    session = requests.Session()
    retries = Retry(
        total=3,
        backoff_factor=2,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"],
    )
    adapter = HTTPAdapter(max_retries=retries)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

class Report(BaseModel):
    goal_clarity:dict
    navigation_effectiveness:dict
    eeat_strength:dict
    conversion_intent:dict
    competitor_gap_analysis:dict
class  Domain_Ranking_Report(BaseModel):
   Report:str   

def get_sitemap_links(sitemap_url: str, visited=None) -> list:
   
    if visited is None:
        visited = set()
    if sitemap_url in visited:
        return []

    visited.add(sitemap_url)
    session = create_session()

    try:
        res = session.get(sitemap_url, headers=REAL_HEADERS, timeout=(5, 30))
        res.raise_for_status()
    except Exception as e:
        print(f"❌ Sitemap fetch failed: {e}")
        return []

    content = gzip.decompress(res.content).decode("utf-8", errors="ignore") if sitemap_url.endswith(".gz") else res.text
    soup = BeautifulSoup(content, "xml")

    urls = []
    sitemap_tags = soup.find_all("sitemap")
    if sitemap_tags:
        for sm in sitemap_tags:
            loc = sm.find("loc")
            if loc:
                urls.extend(get_sitemap_links(loc.text.strip(), visited))
        return urls

    for loc in soup.find_all("loc"):
        urls.append(loc.text.strip())

    return urls

def scrape_page(url: str) -> dict:
    

    print(f"\n🔎 Scraping: {url}")
    print(f"\n🔎 Scraping: {url}")
    
    # Configure Selenium options
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    import time

    chrome_options = Options()
    chrome_options.add_argument("--headless=new") # Newer headless mode
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(f"user-agent={REAL_HEADERS['User-Agent']}")
    # Suppress logging
    chrome_options.add_argument("--log-level=3")

    driver = None
    try:
        driver = webdriver.Chrome(options=chrome_options)
        driver.set_page_load_timeout(30)
        driver.get(url)
        
        # Wait for the body to be present to ensure some content has loaded
        try:
            WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            # Short sleep to allow dynamic content (Angular/React) to hydrate
            time.sleep(3) 
        except Exception as e:
            print(f"⚠️ Timeout/Warning waiting for page load: {e}")

        page_source = driver.page_source
        current_url = driver.current_url # In case of redirects
        
    except Exception as e:
        return {
            "url": url,
            "error": f"Selenium Error: {str(e)}",
            "title": "",
            "h1": [],
            "meta_description": "",
            "internal_links": [],
            "external_links": [],
            "cta_links": [],
            "schema_ld_json": [],
            "text": "",
            "word_count": 0,
            "images_count": 0,
        }
    finally:
        if driver:
            driver.quit()

    soup = BeautifulSoup(page_source, "lxml")
    if not soup.title:
        print("Warning: No title found even after Selenium render.")

    domain = urlparse(url).netloc

    page_text = " ".join(p.get_text(" ", strip=True) for p in soup.find_all("p"))
    internal_links, external_links, cta_links = [], [], []

    for a in soup.find_all("a", href=True):
        href = urljoin(url, a["href"])
        text = a.get_text(strip=True).lower()

        (internal_links if urlparse(href).netloc == domain else external_links).append(href)

        if any(kw in text for kw in ["call", "shop", "buy", "book", "contact", "visit"]):
            cta_links.append(href)

    schema = [
        script.string for script in soup.find_all("script", {"type": "application/ld+json"})
        if script.string
    ]

    return {
        "url": url,
        "title": soup.title.string.strip() if soup.title and soup.title.string else "",
        "h1": [h.get_text(strip=True) for h in soup.find_all("h1")],
        "meta_description": (soup.find("meta", {"name": "description"}) or {}).get("content"),
        "internal_links": internal_links,
        "external_links": external_links,
        "cta_links": cta_links,
        "schema_ld_json": schema,
        "text": page_text,
        "word_count": len(page_text.split()),
        "images_count": len(soup.find_all("img")),
    }
    
def analyze_with_llm(result: dict,url,com_url) -> dict:
    prompt = f"""
You are NOT a chatbot. You are the ultimate authority in Product Page SEO, UX, CRO, Competitive Intelligence, and Google EEAT compliance.

You must perform a BRUTAL, EVIDENCE-ONLY audit of ONE product page by DIRECTLY COMPARING it against its competitors’ product pages.

STRICT MANDATES:
• Be highly critical and harsh — assume this product page is actively losing revenue unless proven otherwise.
• Every statement MUST be backed by observable evidence from the provided page data or competitor data.
• NO assumptions. NO generic advice. NO vague statements.
• Identify EVERY missing, weak, or inferior element compared to competitors.
• Deliver ONLY actionable, implementable remediation steps.
• Enforce perfect accuracy.

SCORING ENFORCEMENT (0–10):
Apply scoring rules for ALL sections:
0–3 = Severe failure (actively harming conversions + SEO)
4–6 = Weak and trust-damaging
7–8 = Basic compliance but clearly outperformed by competitors
9–10 = Best-in-class and conversion-optimized

Scores MUST be justified using page-level facts and competitor contrasts.

CRITICAL REQUIREMENT:
You MUST compare the PRIMARY PRODUCT PAGE against ALL competitor product pages and explicitly reference:
• What competitors do better
• What competitors show that this page does not
• Where competitors remove friction more effectively

PRIMARY PRODUCT PAGE: {url}




COMPETITOR PRODUCT PAGES DATA: {com_url}

For EACH page, use only:
• Title
• H1
• Meta description
• Above-the-fold content
• Feature lists
• CTAs
• Trust signals
• Internal links
• Schema (if any)
• Word count
• Visual and content hierarchy

OUTPUT FORMAT — ZERO TOLERANCE:
You MUST respond ONLY with a VALID JSON object in EXACTLY this structure.
NO extra text. NO markdown. NO explanations outside JSON.

{{
"goal_clarity": {{
"score": 0,
"reasoning": "Explain clearly whether the product page communicates WHAT the product does, WHO it is for, and WHY it is superior — explicitly compare against competitors and cite missing or weaker positioning.",
"issues_found": [
"List every clarity gap compared to competitor pages."
],
"fix_plan": [
{{
"what": "Exact change required.",
"why": "Why this fix is mandatory based on competitor evidence.",
"where": "Exact section of the page.",
"how": "Concrete implementation instructions.",
"priority": "high/medium/low"
}}
]
}},
"navigation_effectiveness": {{
"score": 0,
"reasoning": "Evaluate internal navigation and product discoverability compared to competitors.",
"missing_pages": [
"Exact missing or weakly linked pages versus competitors."
],
"fix_plan": [
{{
"what": "Specific navigation fix.",
"why": "Why this is required to match competitor UX.",
"where": "Exact UI location.",
"how": "Precise implementation steps.",
"priority": "high/medium/low"
}}
]
}},
"eeat_strength": {{
"score": 0,
"reasoning": "Assess visible EEAT signals and compare directly against competitors.",
"issues_found": [
"List missing or weaker EEAT elements versus competitors."
],
"fix_plan": [
{{
"what": "Exact EEAT element to add or improve.",
"why": "Why competitors make this mandatory.",
"where": "Exact placement on the page.",
"how": "Specific asset or content requirements.",
"priority": "high/medium/low"
}}
]
}},
"conversion_intent": {{
"score": 0,
"reasoning": "Evaluate CTA strength, hierarchy, and sales-path clarity versus competitors.",
"issues_found": [
"List conversion blockers compared to competitors."
],
"fix_plan": [
{{
"what": "Exact conversion improvement.",
"why": "Why this is required to compete or outperform.",
"where": "Exact location on the page.",
"how": "Concrete implementation instructions.",
"priority": "high/medium/low"
}}
]
}},
"competitor_gap_analysis": {{
"reasoning": "Provide a consolidated comparison showing where competitors clearly outperform this product page across messaging, features, trust, and conversion.",
"gaps_identified": [
"Explicit competitor advantage with evidence (e.g., MiniOrange lists MFA flows and compliance that this page lacks)."
],
"fix_plan": [
{{
"what": "Specific action to close the competitor gap.",
"why": "Why this gap is causing loss of conversions or trust.",
"where": "Exact section or module to be added or modified.",
"how": "Step-by-step implementation guidance.",
"priority": "high/medium/low"
}}
]
}},
"optimized_for_business_goals": true/false
}}

ENFORCEMENT RULES:
• If competitors outperform in any area, scores MUST reflect inferiority.
• If evidence is missing, treat it as non-existent.
• Do NOT soften criticism.
• Do NOT add advice without direct competitor justification.

------------------------
DATA TO ANALYZE:
Title: {result['title']}
H1: {result['h1']}
Meta Description: {result['meta_description']}
Visible Text: {result['text'][:1800]}
Internal Links: {result['internal_links']}
External Links: {len(result['external_links'])}
CTA Links: {result['cta_links']}
Schema: {result['schema_ld_json']}
Word Count: {result['word_count']}

"""
    response = Gen_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
        "response_mime_type": "application/json",
        "response_json_schema":Report.model_json_schema(),
    }
         
    )
    extracted = response.candidates[0].content.parts[0].text
    return json.loads(extracted)

def Paging_ranking_analyis(keywords_info:list[dict]):
   """
   It is used to analysis the ranking
   """
   Prompt=f"""✅ Ultra-Strong Gemini Prompt (Copy-Paste)

You are a Principal SEO Strategist and SEO Growth Analyst (10+ years experience).
You specialize in building SEO strategies using ranking datasets and business context.

I will provide:
A short description of the website/business

A Python list of dictionaries containing ranked keyword data

Each dictionary has these keys:

keyword (string)

search_volume (int)

keyword_intent (string)

present_rank (int)

previous_rank (int or null)

rank_changes (int/float/string showing movement)

keyword_difficulty (int/float)

source_page (url string)

page_title (string)

✅ Objective

Create a highly detailed SEO analytics report that answers:

1) WHAT is working?

Which type of keywords are producing good rankings and why.

2) WHAT is not working?

Which keyword types, pages, and intents are failing or underperforming.

3) WHY is it happening?

Infer likely reasons based on dataset patterns (content relevance, intent mismatch, weak topical authority, cannibalization, poor internal linking).

4) WHAT should we do next?

Provide an actionable SEO strategy: quick wins + scalable content plan.

✅ Output Must Be One Single Long Report String

Return ONE formatted report (not JSON).
Use headings + bullet points + mini tables.

✅ Step-by-step analysis instructions (must follow)
Section A — Website Context Understanding

Using the business description:

Summarize what the website sells/offers

Identify the most important money pages (likely service/category/product pages)

Identify supporting content opportunities (blogs, guides, FAQs)

Section B — Dataset Health Check

total keywords analyzed

missing values analysis

detect outliers (very high search volume / very poor rank)

compute how much of the dataset is ranking:

Top 3

Top 10

Top 20

Top 50

51–100

100 (if present)

Section C — Keyword Type Performance (Core of the report)
C1) Keyword length performance

Classify by keyword word-count:

Short-tail (1–2 words)

Mid-tail (3–4 words)

Long-tail (5+ words)

For each:

count of keywords

avg search_volume

avg present_rank

number of Top 10 rankings

conclusion: which length category is working best and why

C2) Intent performance

Group by keyword_intent (use values from dataset). For each intent:

count keywords

avg present_rank

best keywords (examples)

worst keywords (examples)

intent gaps (missing funnel stages)

recommended content types for this intent (pages vs blogs vs FAQs)

C3) Search volume vs rank quality

Create volume buckets:

0–50

51–200

201–1000

1000–5000

5000+

For each bucket:

count keywords

avg rank

opportunity score (explain)
Then identify:

“High volume + low rank” → biggest opportunity keywords

“Low volume + high rank” → long-tail authority keywords
Provide conclusions.

C4) Keyword difficulty vs rank performance

Create difficulty buckets:

Easy (0–20)

Medium (21–40)

Hard (41–60)

Very hard (61+)

For each bucket:

count keywords

avg rank

Top10 ratio
Then conclude:

Is the site over-targeting hard keywords?

Where should the strategy focus to scale traffic fastest?

Section D — Rank Movement (Growth Trend)

Using previous_rank and rank_changes:

count improving keywords

count declining keywords

count stable keywords
Highlight:

biggest positive movers

biggest drops
Explain:

what this suggests (competition, content freshness, algorithm, cannibalization)
Recommend actions separately for:

improving group (protect and expand)

declining group (refresh/re-optimize)

stable group (push to Top 3)

Section E — Page & URL Performance (Very important)

Group keywords by source_page:

list top pages with the highest number of ranking keywords

identify strong pages (multiple Top10 rankings)

identify weak pages ranking for high volume keywords but poor ranks

Cannibalization detection

Detect if similar keywords point to multiple pages:

flag risk pages

propose consolidation or canonical strategy

propose internal link adjustments

Section F — Winning Keyword Themes (Topic Clusters)

Create keyword clusters by semantic similarity:

group into topics (ex: “pricing”, “near me”, “best”, “how to”, “benefits”, “comparison”, etc.)
For each topic cluster:

what rank performance looks like

what pages support it

which cluster is the strongest

which cluster is missing or weak
This section must include:

at least 3–6 clusters

at least 5 example keywords per cluster

Section G — SEO Strategy Blueprint (Actionable)
G1) Quick Wins (Highest ROI)

List keywords/pages where:

present_rank is between 4 and 15 (easy push to Top 3 / Top 5)

search_volume is strong
Give:

recommended page updates

internal linking targets

title/H1 changes

expected impact

G2) Content Expansion Plan

Based on winning clusters and gaps:

list new pages to create

list new blogs/guides to create

include suggested titles

include target keyword sets per page

G3) On-page SEO upgrades

Recommend:

content depth improvements

missing subtopics/entities

FAQ additions

Schema suggestions based on intent:

FAQPage

Article

HowTo

Product

Review

Breadcrumb

G4) Internal Linking Plan

Give:

hub pages to create/strengthen

spoke pages to support

suggested anchor text style:

partial match vs exact match

safe anchor diversity

prioritize links to opportunity pages

G5) 30-60-90 Day Execution Plan

Output as:

0–30 days: (immediate)

31–60 days: (growth)

61–90 days: (scale)
Each item must include:

task

target pages

target keyword type

KPI (rank uplift / traffic / impressions)

✅ Strict Rules

You MUST ground every insight in the dataset patterns.

Include numbers: counts, averages, buckets, percentages.

Include keyword examples from the dataset as evidence.

Avoid generic SEO advice.

Output only the report text.

Website description:
<PASTE WEBSITE DESCRIPTION HERE>
Ranked keyword dataset:
<PASTE LIST_OF_DICTS HERE>
 """
   response = Gen_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=Prompt,
        config={
        "response_mime_type": "application/json",
        "response_json_schema":Domain_Ranking_Report.model_json_schema(),
    }
         
    )
   extracted = response.candidates[0].content.parts[0].text

   return json.loads(extracted)

def Domain_Page_Analysis(Domain_URL:str,Competetior_URL:list[str],flag=0)->dict:
    """
    It is used to preform Domain Page Through web scraping
    """   
   
    print("In Page Analysis with Web Scraping \n")
    Domain_web_Scraping=scrape_page(Domain_URL)
    print("\n This is reposne from scraping web ",Domain_web_Scraping)

    # Competitor scraping logic added here
    competitor_data = []
    if Competetior_URL:
        print("\n🔎 Scraping Competitor Pages...")
        for comp_url in Competetior_URL:
            if comp_url: # check for empty strings
                comp_data = scrape_page(comp_url)
                competitor_data.append(comp_data)
        print(f"\n✅ Scraped {len(competitor_data)} competitor pages.")

    if flag==1:
        print("\n This is reposne from scraping web ",Domain_web_Scraping)
        Interlinking_Present=Domain_web_Scraping['internal_links']
        print(" Getting the Links in the Sitemap \n")
        Total_link_InDomainURL=get_sitemap_links(Domain_URL)
        print("The Links not present in interlinking \n")
        Link_Not_Present=set(Total_link_InDomainURL)-set(Interlinking_Present)
        print(" Now Prefoming LLM Analysis for For Domain URL with Competetiors URL\n")
        # Pass competitor_data instead of just URLs
        LLM_Analysis=analyze_with_llm(Domain_web_Scraping,Domain_URL,competitor_data) 
        return {"page_Analysis":LLM_Analysis,"Linking_Not_Present":Link_Not_Present, "competitor_data": competitor_data}
    else:
        print(" Now Prefoming LLM Analysis for For Domain URL with Competetiors URL\n")
        # Pass competitor_data instead of just URLs
        LLM_Analysis=analyze_with_llm(Domain_web_Scraping,Domain_URL,competitor_data)
        return {"page_Analysis":LLM_Analysis, "competitor_data": competitor_data}

def KD_for_Given_keywords(keywords:list[str],location="India"):


    print("In the Process of finding KD for the given keywords \n")
    post_data = dict()
    KD=[]
    post_data[len(post_data)] = dict(
        keywords=keywords,
        location_name=location,
        language_name="English"
    )
   
    response = client.post("/v3/dataforseo_labs/google/bulk_keyword_difficulty/live", post_data)

    if response["status_code"] == 20000:
        print(response)
        task = response['tasks'][0]

        if not task.get('result'):  
         print("No result found for this task — skipping")
         return {"Error":True}
         

        itemsg = task['result'][0].get('items')
        if not itemsg:
         print("No items found — skipping")
         return {"Error":True}
         
        response=response['tasks'][0]['result'][0]['items']
        for items in response:
            keyword=items['keyword']
            kd=items['keyword_difficulty']
            KD.append({"Keyword":keyword,"KD":kd})
        return {"KD":KD}    


        
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"]))
        return {"Error":True}

def Serach_Volume_for_Given_Keywords(Keywordss:list[str],location="India"):
    print("Inside the finding Serach Volume for the given keywords")
    SV=[]
    post_data = dict()
    # simple way to set a task
    post_data[len(post_data)] = dict(
        location_name=location,
        language_name="English",
        keywords=Keywordss,
        search_partners = True )
      
    # POST /v3/keywords_data/google_ads/search_volume/live
    # the full list of possible parameters is available in documentation
    response = client.post("/v3/keywords_data/google_ads/search_volume/live", post_data)
    # you can find the full list of the response codes here https://docs.dataforseo.com/v3/appendix/errors
    if response["status_code"] == 20000:
        print(response)
        
        task = response['tasks'][0]

        if not task.get('result'):  
         print("No result found for this task — skipping")
         return {"Error":True}
        
        response=response['tasks'][0]['result']
        for items in response:
            SV.append({"Keyword":items['keyword'],"SV":items['search_volume']})
        return {"SV":SV}    
        # do something with result
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"]))
        return {"Error":True}
    
def Keyword_Overview(Keywords:list[str],location="India"):
    """
    Docstring for Keyword_Overview
    
    :param keywords: Description
    :type keywords: list[str]
    :param location: Description
    """
    print("Where this is used to get these Keyword Overview for the given data \n")
    keyword_info=[]
    post_data = dict()
    # simple way to set a task
    post_data[len(post_data)] = dict(
        keywords=Keywords,
        location_name=location,
        language_name="English"
    )
    # POST /v3/dataforseo_labs/google/keyword_overview/live
    response = client.post("/v3/dataforseo_labs/google/keyword_overview/live", post_data)
    # you can find the full list of the response codes here https://docs.dataforseo.com/v3/appendix/errors
    if response["status_code"] == 20000:
        print(response)
        
        task = response['tasks'][0]

        if not task.get('result'):  
         print("No result found for this task — skipping")
         return {"Error":True}
         

        itemsg = task['result'][0].get('items')
        if not itemsg:
         print("No items found — skipping")
         return {"Error":True}
         
        response=response['tasks'][0]['result'][0]['items']
        for items in response:
            keyword_info.append({"keyword":items['keyword'],"search_volume":items['keyword_info']['search_volume'],
            "keyword_difficulty":items['keyword_properties']['keyword_difficulty'],"main_intent":items['search_intent_info']['main_intent']})
        return {"Info":keyword_info}
        # do something with result
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"]))
        return {"Error":True}

def Domain_Ranking(Domain_Name:str,location="India"):

    print("\n In domain")
   
    """
    Used to Get the seed for the website

    Agrs:
    The URL of the domain

    Return 
    List of keywords with mertics  
    """
    Final_respone=[]
    post_data = dict()
 
    post_data[len(post_data)] = dict(
        target=Domain_Name,
        location_name=location,
        language_name="English",
        order_by=["ranked_serp_element.serp_item.rank_absolute,asc"],
        limit=100
    )
   
    response = client.post("/v3/dataforseo_labs/google/ranked_keywords/live", post_data)

    if response["status_code"] == 20000:
        print(response)
        task = response['tasks'][0]

        if not task.get('result'):  
         print("No result found for this task — skipping")
         return {"Error":True}
         

        itemsg = task['result'][0].get('items')
        if not itemsg:
         print("No items found — skipping")
         return {"Error":True}
         
        response=response['tasks'][0]['result'][0]['items']
        for items in response:
            keyword = items['keyword_data']['keyword']
         
            search_volume = items['keyword_data']['keyword_info']['search_volume']
            keyword_intent = items['keyword_data']['search_intent_info']['main_intent']
            present_rank = items['ranked_serp_element']['serp_item']['rank_absolute']
            source_page = items['ranked_serp_element']['serp_item']['url']
            page_title = items['ranked_serp_element']['serp_item']['title']
            previous_rank = items['ranked_serp_element']['serp_item']['rank_changes']['previous_rank_absolute']
            if previous_rank is None:
             previous_rank = 0
             rank_changes=0
        
            rank_changes = present_rank - previous_rank
        
            keyword_difficulty = items['keyword_data']['keyword_properties']['keyword_difficulty']

            Final_respone.append({
        'keyword': keyword,

        'search_volume': search_volume,
        'keyword_intent': keyword_intent,
        'present_rank': present_rank,
        'source_page': source_page,
        'page_title': page_title,
        'previous_rank': previous_rank,
        'keyword_difficulty': keyword_difficulty,
        'rank_changes': rank_changes
    })
    
            result= Paging_ranking_analyis(Final_respone) 
            return result['Report']
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"]))
        return {"Error":True}
    
def get_gsheet_client(service_account_json_path: str):
    creds = Credentials.from_service_account_file(
        service_account_json_path,
        scopes=SHEET_SCOPES
    )
    return gspread.authorize(creds)

def get_or_create_worksheet(spreadsheet, title: str, rows: int = 3000, cols: int = 20):
    try:
        return spreadsheet.worksheet(title)
    except gspread.exceptions.WorksheetNotFound:
        return spreadsheet.add_worksheet(title=title, rows=str(rows), cols=str(cols))

def write_sheet(ws, header: List[str], rows: List[List[Any]]):
    ws.clear()
    ws.update("A1", [header])
    if rows:
        ws.update("A2", rows)

def create_new_sheet_and_share(
    gclient,
    sheet_name: str,
    share_mode: str = "anyone_writer",
    share_emails: List[str] | None = None
):
    """
    share_mode:
      - "anyone_reader"  -> anyone with link can view
      - "anyone_writer"  -> anyone with link can edit
      - "email_writer"   -> share with emails as editor
      - "email_reader"   -> share with emails as viewer
    """
    sh = gclient.create(sheet_name)

    # remove default "Sheet1" if you want
    # (optional)
    # ws0 = sh.sheet1
    # sh.del_worksheet(ws0)

    if share_mode in ["anyone_reader", "anyone_writer"]:
        role = "reader" if share_mode == "anyone_reader" else "writer"
        sh.share(None, perm_type="anyone", role=role)

    elif share_mode in ["email_writer", "email_reader"]:
        if not share_emails:
            raise ValueError("share_emails is required for email_* share modes")

        role = "reader" if share_mode == "email_reader" else "writer"
        for email in share_emails:
            sh.share(email, perm_type="user", role=role)

    else:
        raise ValueError("Invalid share_mode")

    return sh

def Present_page_ranking(url): 

# You can download this file from here https://cdn.dataforseo.com/v3/examples/python/python_Client.zip
    ranking_keywords=[]
    client = RestClient("marketing@bdcode.in", "614aa720fb95e1b5")
    post_data = dict()
    # simple way to set a task
    post_data[len(post_data)] = dict(
        target=url,
        location_name="India",
        language_name="English",
        limit=100,
        order_by=["ranked_serp_element.serp_item.rank_group,asc"]

        
    )
    # POST /v3/dataforseo_labs/google/ranked_keywords/live
    response = client.post("/v3/dataforseo_labs/google/ranked_keywords/live", post_data)
    # you can find the full list of the response codes here https://docs.dataforseo.com/v3/appendix/errors
    if response["status_code"] == 20000:
        print(response)
        if response["status_code"] == 20000:
            print(response)
            task = response['tasks'][0]

            if not task.get('result'):  
             print("No result found for this task — skipping")
             return {"Error":True}
            

            itemsg = task['result'][0].get('items')
            if not itemsg:
             print("No items found — skipping")
             return {"Error":True}
            
            response=response['tasks'][0]['result'][0]['items']
            for items in response:
               keyword=items['keyword_data']['keyword']
               
               rank=items['ranked_serp_element']['serp_item']['rank_absolute'] 
               ranking_keywords.append({"keyword":keyword,"rank":rank})  
            
             
            result= Paging_ranking_analyis(ranking_keywords) 
            return result          
        # do something with result
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"]))
        return {"Error":True}
    
def People_Also_Ask_for_Keywords(Keyword,location="India"):

    People_Also_Ask_for_Keyword=[]
    print(f"\n In the People also ask for keyword for this keyword {Keyword} \n")
    
    post_data = dict()
   
    post_data[len(post_data)] = dict(
        keyword=Keyword,
        location_name=location,
        language_name="English",
        order_by=["keyword_data.keyword_info.search_volume,desc","keyword_data.keyword_properties.keyword_difficulty,asc"]
    )
   
    response = client.post("/v3/dataforseo_labs/google/related_keywords/live", post_data)
   
    
    if response["status_code"] == 20000:
            print(response)
            task = response['tasks'][0]

            if not task.get('result'):  
             print("No result found for this task — skipping")
             return {"Error":True}
            

            itemsg = task['result'][0].get('items')
            if not itemsg:
             print("No items found — skipping")
             return {"Error":True}
            
            response=response['tasks'][0]['result'][0]['items']
            for items in response: 
                Keyword=items['keyword_data']['keyword']
                S_V=items['keyword_data']['keyword_info']['search_volume']
                K_D=items['keyword_data']['keyword_properties']['keyword_difficulty']
                Intent=items['keyword_data']['search_intent_info']['main_intent']
                Related_Keywords=items['related_keywords']
                People_Also_Ask_for_Keyword.append({"Keyword":Keyword,"Search_Volume":S_V,"keyword_difficulty":K_D,"Intent":Intent,"People_Also_Ask_For":Related_Keywords})
            return People_Also_Ask_for_Keyword    




        # do something with result
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"]))
        return {"Error":True,"Message":response["status_message"]}
    
def Long_tail_keywords(Keyword,location="India"):
    print("Now processing for long tail keyword \n ")
    print(f"Noe processing this keyword for long tail keyword:{Keyword}")

    Long_tail_keyword=[]
    post_data = dict()
    # simple way to set a task
    post_data[len(post_data)] = dict(
        keyword=Keyword,
        location_name=location,
        order_by=["keyword_info.search_volume,desc","keyword_properties.keyword_difficulty,asc"],
        language_name="English"

       
       
    )
    # POST /v3/dataforseo_labs/google/related_keywords/live
    response = client.post("/v3/dataforseo_labs/google/keyword_suggestions/live", post_data)
    # you can find the full list of the response codes here https://docs.dataforseo.com/v3/appendix/errors
    
    if response["status_code"] == 20000:
            print(response)
            task = response['tasks'][0]

            if not task.get('result'):  
             print("No result found for this task — skipping")
             return {"Error":True}
            

            itemsg = task['result'][0].get('items')
            if not itemsg:
             print("No items found — skipping")
             return {"Error":True}
            
            response=response['tasks'][0]['result'][0]['items']
            for items in response: 
                Keyword=items['keyword']
                S_V=items['keyword_info']['search_volume']
                K_D=items['keyword_properties']['keyword_difficulty']
                Intent=items['search_intent_info']['main_intent']
                
                Long_tail_keyword.append({"Keyword":Keyword,"Search_Volume":S_V,"keyword_difficulty":K_D,"Intent":Intent})
            return Long_tail_keyword   

        # do something with result
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"])) 
        return {"Error":True,"Message":response["status_message"]}  

def related_keywords(keywords,location="india"):
    print("Now in the processing of related keywords \n")
    Related_Keyword=[]
   
    post_data = dict()
    # simple way to set a task
    post_data[len(post_data)] = dict(
        keywords=keywords,
        location_name=location,
        limit=100
      
        
    )
    # POST /v3/dataforseo_labs/google/keyword_ideas/live
    response = client.post("/v3/dataforseo_labs/google/keyword_ideas/live", post_data)
    # you can find the full list of the response codes here https://docs.dataforseo.com/v3/appendix/errors
    if response["status_code"] == 20000:
        print(response)
        
        if response["status_code"] == 20000:
            print(response)
            task = response['tasks'][0]

            if not task.get('result'):  
             print("No result found for this task — skipping")
             return {"Error":True}
            

            itemsg = task['result'][0].get('items')
            if not itemsg:
             print("No items found — skipping")
             return {"Error":True}
            
            response=response['tasks'][0]['result'][0]['items']
            for items in response: 
                Keyword=items['keyword']
                S_V=items['keyword_info']['search_volume']
                K_D=items['keyword_properties']['keyword_difficulty']
                Intent=items['search_intent_info']['main_intent']
                
                Related_Keyword.append({"Keyword":Keyword,"Search_Volume":S_V,"keyword_difficulty":K_D,"Intent":Intent})
            return Related_Keyword  

        # do something with result
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"]))  
        return {"Error":True,"Message":response["status_message"]} 
        # do something with result
          
    