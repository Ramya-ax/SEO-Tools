
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse
from bin.Backend_utlities import Domain_Page_Analysis,Keyword_Overview,Domain_Ranking,scrape_page,Present_page_ranking,get_sitemap_links,People_Also_Ask_for_Keywords,Long_tail_keywords,related_keywords
import tldextract
from google import genai
from fuzzywuzzy import fuzz
import json
from typing import List, Dict, Optional, Literal,Union
from pydantic import BaseModel, Field
import asyncio
from bin.client import RestClient
import os
from dotenv import load_dotenv
load_dotenv()
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field
from bin.Keyword_Pie import serach_engine,Serach_Shopping,AI_MODE
from logs.log import my_log
logger=my_log()


Gen_client = genai.Client(api_key=os.getenv("GEMINI_APIKEY"))
client = RestClient(os.getenv("DATAFORSEO_USERNAME"), os.getenv("DATAFORSEO_PASSWORD"))

class LoginData(BaseModel):
    UserName:str
    Password:str

class Keyword_Sitemap(BaseModel):
    Keyword:str

class keyword_pie(BaseModel):
    Keyword:str
    
class Page_A(BaseModel):
    Domain_Url:str
    Comp_Url:list[str]    

class MSeedKeywordItem(BaseModel):
    keyword: str
    
    relevance_score: int
   
    keyword_origin: str   # Provided / Generated
    keyword_source: str   # ranking_summary / important_keyword / product / generated

class MCompetitorAnalysisItem(BaseModel):
   competitor:str
   summary:str

class MGapFixPlanItem(BaseModel):
    what: str
    why: str
    where: str
    how: str
    priority: str

class MCompetitorGapItem(BaseModel):
    gap_type: str
    description: str
    fix_plan: List[MGapFixPlanItem]

class MClusterKeywordItem(BaseModel):
    keyword: str
    keyword_origin: Optional[str] = None   # Seed / Generated

class MKeywordClusterItem(BaseModel):
    cluster_name: str
    keywords: List[MClusterKeywordItem]
    tag: str

class MStrategyItem(BaseModel):
    month: str
    s_no: int

    content_type: str
    page_action: str

    page_name: str
    page_url: str
    section_target: Optional[str] = None

    topic: str
    primary_keyword: str
    secondary_keywords: List[str] = []

    search_intent: str
    competitors: List[str]
    competitor_links: List[str]

    schema_type: Optional[List[str]] = None
    internal_links: Optional[List[str]] = None

    cta: str
    conversion_goal: str

    serp_feature_target: Optional[List[str]] = None
    brief: str
    expected_result: str
    priority: str

    keyword_origin: Optional[str] = None
    keyword_source: Optional[str] = None
    dependency: Optional[str] = None

class StrageryModel(BaseModel):
    Months_Plan: Dict[str, List[MStrategyItem]]  

class FinalOutputModel(BaseModel):
    Seed_Keyword: List[MSeedKeywordItem]
    competetior: List[str]
    competetior_Analyisis: List[MCompetitorAnalysisItem]
    competetor_gap: List[MCompetitorGapItem]
    Keyword_Cluster: List[MKeywordClusterItem]
    Stragery: StrageryModel
    Goal: str

class PVerdictModel(BaseModel):
    status: str  # "WINNING" / "LOSING"
    reason: str
    conversion_readiness_score: int

class PSeedKeywordItem(BaseModel):
    keyword: str
    keyword_source:str
  
    relevance_score:int
  
    improvement_plan:str

class PCTALink(BaseModel):
    anchor_text: str
    href: Optional[str] = None

class PCompetitorScrape(BaseModel):
    title: Optional[str] = None
    h1: Optional[str] = None
    p_text: Optional[List[str]] = None
    word_count: Optional[int] = None
    cta_links: List[PCTALink] = Field(default_factory=list)
    schema_ld_json: Optional[Any] = None

class PCompetitorAnalysisItem(BaseModel):
    competitor: str
    summary:str 

class PGapFixPlanItem(BaseModel):
    what: str
    why: str
    where: str
    how: str
    priority: str  # "high" / "medium" / "low"

class PCompetitorGapItem(BaseModel):
    gap_type: str  # Keyword / Content / Trust / Intent / Conversion / Schema / InternalLinking
    domain_evidence: str
    competitor_evidence: str
    fix_plan: List[PGapFixPlanItem]

class PKeywordClusterItem(BaseModel):
    cluster_name: str
    keywords: List[str]
    tag: str  # Transactional / Commercial / Informational / Navigational

class PInternalLinkingModel(BaseModel):
    from_page: str
    to_page: str
    anchor_text: str

class PStepFixPlanItem(BaseModel):
    page_action: str  # Existing Page Upgrade / New Page
    page_url: str
    what: str
    why: str
    where: str
    how: str
    priority: str
    primary_keyword: str
    secondary_keywords: List[str] = Field(default_factory=list)
    where_to_use_keyword: Dict[str, str] = Field(default_factory=dict)
    cta: Optional[str] = None
    internal_linking: Optional[PInternalLinkingModel] = None
    schema_type: Optional[List[str]] = None

class PStepEvidenceModel(BaseModel):
    target_page: str
    competitor_pages: str

class PStrategyStepModel(BaseModel):
    step_name: str  # "Step 1: Content Dominance"
    competitor_issue: str
    evidence_from_scrape: PStepEvidenceModel
    fix_plan: List[PStepFixPlanItem]
    keywords_to_use: List[str] = Field(default_factory=list)
    where_to_use_keyword: Dict[str, str] = Field(default_factory=dict)

class PStrategyModel(BaseModel):
    steps: List[PStrategyStepModel]

class SinglePageSEOOutputModel(BaseModel):
    Verdict: PVerdictModel
    Seed_Keyword: List[PSeedKeywordItem]
    competetior: List[str]
    competetior_Analyisis: List[PCompetitorAnalysisItem]
    competetor_gap: List[PCompetitorGapItem]
    Keyword_Cluster: List[PKeywordClusterItem]
    Stragery: PStrategyModel
    Goal: str

def get_company_name(domain_or_url):
    # tldextract handles "
    
    extracted = tldextract.extract(domain_or_url)
    # .domain gives the main company name, .suffix gives the .com/.co.uk
    return extracted.domain

class SeedKeywordItem(BaseModel):
    keyword: str
    
    intent: Optional[Literal["Transactional", "Commercial", "Informational", "Navigational"]] = None
    source: Literal["keyword_dataset", "ranking_summary", "important_keywords"]

class CompetitorPageAnalysis(BaseModel):
    competitor:str 
    analysis:str

class GapFixPlanItem(BaseModel):
    what: str
    why: str
    where: str
    how: str
    priority: Literal["high", "medium", "low"]

class CompetitorGapItem(BaseModel):
    gap_type: Literal["Keyword", "Content", "Trust", "Technical", "Intent", "Conversion", "SERP"]
    description: str
    fix_plan: List[GapFixPlanItem]

class KeywordClusterItem(BaseModel):
    cluster_name: str
    keywords: List[str]
    tag: Literal["Transactional", "Commercial", "Informational", "Navigational"]

class StepFixPlanItem(BaseModel):
    what: str
    why: str
    where: str
    how: str
    priority: Literal["high", "medium", "low"]

    # MUST contain only keywords from Seed_Keyword / Keyword_Cluster (you validate later)
    keyywords_to_use: List[str] = Field(..., min_length=1)

    # keyword => placement
    where_to_use_keyword: Dict[str, str] = Field(default_factory=dict)

class EvidenceFromScrape(BaseModel):
    target_page: str
    competitor_page: str

class StrageryStep(BaseModel):
    competitor_issue: str
    evidence_from_scrape: EvidenceFromScrape
    fix_plan: List[StepFixPlanItem]

class StrageryModel(BaseModel):
    Step_1_Content_Dominance: StrageryStep = Field(..., alias="Step 1: Content Dominance")
    Step_2_Long_Tail_Capture: StrageryStep = Field(..., alias="Step 2: Long-Tail Capture")
    Step_3_Audience_Region_Alignment: StrageryStep = Field(..., alias="Step 3: Audience & Region Alignment")
    Step_4_Trust_EEAT_Reinforcement: StrageryStep = Field(..., alias="Step 4: Trust & EEAT Reinforcement")
    Step_5_Conversion_Path_Optimization: StrageryStep = Field(..., alias="Step 5: Conversion Path Optimization")
    Step_6_Internal_Link_Authority_Flow: StrageryStep = Field(..., alias="Step 6: Internal Link Authority Flow")
    Step_7_Technical_SEO_Schema: StrageryStep = Field(..., alias="Step 7: Technical SEO + Schema")
    Step_8_SERP_Feature_Domination: StrageryStep = Field(..., alias="Step 8: SERP Feature Domination")

    class Config:
        populate_by_name = True

class OverallSEOStrategyOutput(BaseModel):
    Seed_Keyword: List[SeedKeywordItem] = Field(..., min_length=1)
    competetior: List[str] = Field(..., min_length=1)

    competetior_Analyisis: list[CompetitorPageAnalysis]

    competetor_gap: List[CompetitorGapItem] = Field(..., min_length=1)

    Keyword_Cluster: List[KeywordClusterItem] = Field(..., min_length=1)

    Stragery: StrageryModel

    Goal: str

def get_domain(url: str) -> str:
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    netloc = urlparse(url).netloc
    return netloc[4:] if netloc.startswith("www.") else netloc

class Overall_Strategy(BaseModel):
    Domain_URL:str

    Competetior_Name:list[str]
    Products_Name:list[str]
    Important_Keywords:list[str]
    Domain_Description:str
    Target_Audience:list[str]
    Goal:list[str]
    Current_State_of_SEO:str

class Shared_Missing_Keywords(BaseModel):
    Domain_URL:str
    Competetior_Name:list[str]

class Product_Anlayisis(BaseModel):
    Domain_Page:str
    Product_Page_URL:str
    Competetior_Name:list[str]
    Products_Name:list[str]
    Important_Keywords:list[str]
    Product_Page_Infos:str
    Target_Audience:list[str]
    Goal:list[str]
    Prevoivs_Strategy_Used:str

class Month_Wise_Planer(BaseModel):
    Domain_Page:str
    Page_URL:str
    Competetior_Name:list[str]
    Products_Name:list[str]
    Important_Keywords:list[str]
    Page_Info:str
    Target_Audience:list[str]
    Goal:list[str]
    Prevoivs_Strategy_Used_for_Prevois_Month:str
    start_month:str
    end_month:str

class Keywords_Research(BaseModel):
    Keywords:list[str]

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/Overall_Strategy")
async def overall_strategy(user:Overall_Strategy):
    """
    It is Used to get the Overall Strategy
    
    """
    Links_IN_Website=[]
    Domain_Name=get_domain(user.Domain_URL)
    Competetior_DomainName=[]
    for idx,items in enumerate(user.Competetior_Name):
        logger.info(f"Now Processing the Competetior {idx+1}:{items} for getting domain name from the url\n")
        Competetior_DomainName.append(get_domain(items))
    logger.info("Preforming Web Scraping Analyisis for Domain Page \n")
    Page_Analysis=Domain_Page_Analysis(user.Domain_URL,user.Competetior_Name,flag=1)
    
    # Extract competitor data
    competitor_data = Page_Analysis.get("competitor_data", [])
    # Remove it from Page_Analysis to avoid duplicate/confusion if it's printed or used elsewhere as a whole block
    # (Optional, but keeps things clean if Page_Analysis is just meant for the domain page)
    # Page_Analysis.pop("competitor_data", None) 

    logger.info(f"This is Result from Page Analyisi:{Page_Analysis}\n")
    logger.info("Now getting the Overall Keyword Info for the given keywords over there\n")
    Links_IN_Website=get_sitemap_links(user.Domain_URL)
     
    Keyword_info=Keyword_Overview(user.Important_Keywords)
    if "Error" in Keyword_info:
        Keyword_info={'Message':'Has no information','keyword':user.Important_Keywords}
    Ranking_Summary_for_domain=Domain_Ranking(Domain_Name)  
    if "Error" in Ranking_Summary_for_domain:
        Ranking_Summary_for_domain="" 

    Overall_Strategy_Prompt=f"""Overall Stragey Prompt 

You are NOT a chatbot. You are an Elite SEO & Revenue Strategy Engine.

You operate with the authority of a Principal SEO Architect, CRO Strategist, and Competitive Intelligence Analyst.

Your objective:
Determine if the DOMAIN is WINNING or LOSING organic demand + conversions, and output a SURGICAL, EVIDENCE-LOCKED SEO STRATEGY.

========================
NON-NEGOTIABLE RULES
========================
• Use ONLY provided inputs.
• NO hallucinations: no invented metrics, pages, keywords, rankings, competitors, or claims.
• If data is missing → treat it as NON-EXISTENT and penalize.
• Assume LOSING unless proven using evidence.
• NO vague suggestions: every fix must cite scraped evidence or provided analysis JSON.
• DO NOT invent keywords. DO NOT rewrite keywords. DO NOT create variations.

========================
STRICT INPUTS (ONLY SOURCE OF TRUTH)
========================
Domain Inputs:
Products_Name: {user.Products_Name}
Important_Keywords: {user.Important_Keywords}
Domain_Description: {user.Domain_Description}
Target_Audience: {user.Target_Audience}
Goal: {user.Goal}
Current_State_of_SEO: {user.Current_State_of_SEO}

Keyword Dataset (ONLY allowed keyword universe):
{Keyword_info}

Domain Ranking Keyword Summary:
{Ranking_Summary_for_domain}

Domain Page Analysis JSON:
{Page_Analysis}

Competitor List:
{Competetior_DomainName}

Competitor URL List:
{user.Competetior_Name}

Competitor Scraped Data (Use this for Competitor Analysis):
{competitor_data}

Number of WebPages Present in the Website:
{Links_IN_Website}

========================
SCRAPING RULES (MANDATORY)
========================
For EACH competitor URL in {user.Competetior_Name}, scrape ONLY:
- title
- meta_description
- h1
- visible text ONLY from <p>
- word_count
- cta_links ONLY from <a> anchor text containing ["apply","enquire","download","call","contact","book","visit","shop","buy"]
- schema_ld_json

If scrape fails:
Return null fields but keep url. DO NOT GUESS.

========================
KEYWORD ENFORCEMENT (ABSOLUTE)
========================
Allowed keyword pool MUST be ONLY from:
- {Keyword_info}
- AND/OR {Ranking_Summary_for_domain} (ONLY if keyword already exists inside keyword dataset)
If keyword dataset is empty -> ONLY use {user.Important_Keywords}

Search Volume and KD rules:
- MUST use ONLY real values from Keyword Dataset.
- MUST NOT infer search volume or KD.
- If missing -> null.

========================
MANDATORY OUTPUT TASKS
========================

1) Seed Keywords (MAX 30)
Select UP TO 30 UNIQUE keywords ONLY from allowed keyword pool.

STRICT RULES:
- DO NOT repeat any keyword.
- If fewer than 30 keywords exist in the allowed pool, return ONLY what is available.
- NEVER invent keywords or create variations.
- NEVER pad output with duplicates to reach 30.

Selection priority (when more than 30 available):
1 relevance
2 search_volume (higher)
3 KD (lower)
4 intent match with Goal
5 competitor saturation (lower)

Output key: "Seed_Keyword"
Format:
[
  {{
    "keyword": "...",
    
    "intent": "Transactional|Commercial|Informational|Navigational|null",
    "source": "keyword_dataset|ranking_summary|important_keywords"
  }}
]

2) Competitor List (RAW)
Output key: "competetior"
Return {user.Competetior_Name} EXACTLY. 
Rank the competitor according the competion level with our domain and give in an order 

3) Competitor Analysis (scraped)
Output key: "competetior_Analyisis"
{{
 
"Competetior":name of the competertior,
"Summary": Summary of how is the competetior theier website structure according to seo
 
}}
A Summary about their Web Structure , a detialed one

4) Competitor Gap
Output key: "competetor_gap"
In the fix plan dont give add reviews or add to cart or add pricing in the page or add cta and if products is less dont give filters also , only provide more on the SEO Part , Content and structuring of the page
Strict structured fix mapping.

5) Keyword Clustering
Output key: "Keyword_Cluster"

Goal:
Cluster keywords for strategy execution.

Cluster rules:
- Every Seed keyword MUST belong to EXACTLY ONE cluster.
- You MUST create clusters based on thematic intent groups.
- A cluster MAY contain zero Seed keywords (support cluster is allowed).

KEYWORD GENERATION RULE (MANDATORY):
- For EVERY cluster you MUST generate NEW related keywords.
- Each cluster MUST contain at least 3 generated keywords.
- Generated keywords must be:
  ✅ derived from Seed_Keyword themes
  ✅ relevant to business + SEO strategy
  ✅ natural Google-style query formats
  ✅ not random words
- DO NOT invent unrelated keywords.

STRICT NON-REPETITION RULES:
- DO NOT repeat any keyword inside a cluster.
- DO NOT repeat any keyword across clusters.
- Generated keywords must belong to EXACTLY ONE cluster.

Cluster structure:
For every cluster output:
{{
  "cluster_name": "...",
  "tag": "Transactional|Commercial|Informational|Navigational",

  "keywords": [
    "generated keyword 1",
    "generated keyword 2",
    "generated keyword 3",
    "...",
    "seed keyword 1 (optional)",
    "seed keyword 2 (optional)"
  ]
}}

Minimum requirements:
- At least 3 clusters total.
- Each cluster MUST have:
  - seed_keywords: list (can be empty)
  - cluster_keywords: min 3 items (generated keywords mandatory)


Important:
- seed_keywords MUST be a subset of Seed_Keyword.keyword
- cluster_keywords can include BOTH seed + generated keywords
- If seed_keywords is empty → cluster_keywords must contain ONLY generated keywords


========================
FIX PLAN
========================

In the fix plan dont give add reviews or add to cart or add pricing in the page or add cta and if products is less dont give filters also , only provide more on the SEO Part , Content and structuring of the page

========================
STRAGERY OUTPUT FORMAT (STEP-BASED ONLY)
========================
IMPORTANT:
Stragery MUST be step-based like:
"Step 1: Content Dominance"
NOT month-wise plan.

You MUST output EXACTLY 8 steps:
Step 1: Content Dominance
Step 2: Long-Tail Capture
Step 3: Audience & Region Alignment
Step 4: Trust & EEAT Reinforcement
Step 5: Conversion Path Optimization
Step 6: Internal Link Authority Flow
Step 7: Technical SEO + Schema
Step 8: SERP Feature Domination





========================
KEYWORD RULES (HARD LOCK - AUTO FAIL)
========================
1) keyywords_to_use MUST be a subset of Seed_Keyword.keyword or Keyword_Cluster.keywords .
2) Can include keywords from Seed_Keyword.keyword or Keyword_Cluster.keywords .
3) Cross-cluster keyword mixing is FORBIDDEN:
   - If a fix_plan item uses keywords from multiple clusters → FAIL.
4) Step-based cluster tag enforcement (mandatory):
   - Transactional/Commercial clusters → ONLY Steps 1, 5, 6
   - Informational clusters → ONLY Steps 2, 8
   - Navigational clusters → ONLY Step 3
   - Schema/content support keywords → ONLY Step 7 (and ONLY inside schema name/description fields)
5) If a keyword is not present in Seed_Keyword OR not present in Keyword_Cluster → FAIL.
6) You MUST NEVER invent, rewrite, merge, or infer new keywords. Use EXACT keyword strings only.

========================
8 STEPS STRAGERY (DETAILED SPEC - STRICT)
========================

Step 1: Content Dominance (On-page relevance + message clarity)
What this step MUST do:
- Rewrite/improve the core SERP-facing content blocks and above-the-fold clarity to increase relevance and reduce bounce.
Required checks (from Domain_Page_Analysis_JSON):
- Missing/weak Title tag / Meta Description / H1
- Thin hero paragraph OR missing product/service definition
- Low keyword relevance in title/meta/h1/hero paragraph
Required competitor evidence (from competitor scrape):
- Title patterns: keyword front-loading, modifiers, category terms, USPs
- H1 patterns: clear offering + differentiation + (location if competitor uses it)
- Intro paragraph patterns: clarity, benefits, proof language
Output MUST include fix_plan actions:
- Rewrite Title Tag using EXACTLY 1 Transactional/Commercial Keyword_Cluster
- Rewrite H1 using keyword + product/service + differentiation (must match seed keyword)
- Rewrite Hero paragraph: “what we do + who it is for + why trust” (must cite missing proof if absent)
Keywords allowed:
✅ ONLY Transactional/Commercial clusters
Enforced fix_plan fields:
- where MUST be one of: "Title Tag", "Meta Description", "H1", "Hero Paragraph"
- keyywords_to_use MUST include cluster primary keyword
- where_to_use_keyword MUST specify exact placement such as:
  "Title Tag: start", "Meta Description: first 140 chars", "H1: exact match", "Hero Paragraph: first 100 words"

Step 2: Long-Tail Capture (Coverage expansion using keyword clusters)
What this step MUST do:
- Expand content depth by covering ALL long-tail intents already present in Seed_Keyword and Keyword_Cluster.
Required checks:
- Missing FAQ block
- Missing intent-specific content sections
- Thin paragraph coverage per cluster
Competitor evidence:
- Competitors have FAQ-rich content and decision-stage explanations
- Multiple paragraphs targeting subtopics / variants
Fix_plan MUST include:
- Build cluster-based content modules, each module mapped to EXACTLY 1 Informational Keyword_Cluster:
  Module A: Cluster 1 keywords
  Module B: Cluster 2 keywords
  Module C: etc.
For every cluster module:
- Provide section name
- Specify paragraph inserts
- Specify exact keyword placements per paragraph (explicit placement rules)
Keywords allowed:
✅ ONLY Informational clusters (NO Transactional keywords in this step)

Step 3: Audience & Region Alignment (Local intent + persona alignment)
What this step MUST do:
- Ensure content matches:
  target audience segments, location/service reach, and the goal conversion journey.
Required checks:
- Location missing from H1/meta/hero (if location is provided in inputs)
- No audience language (students/buyers/B2B roles etc.)
- No local trust cues
Competitor evidence:
- Location-based modifiers in title/meta/h1
- Region-specific CTAs ("Visit campus", "Call Chennai office", etc.) ONLY if seen in competitor scrape
Fix_plan MUST include:
- Insert regional modifiers ONLY if present in input Location
- Persona language blocks (“For {user.Target_Audience}”) into proven page sections only
Keywords allowed:
✅ ONLY Navigational/Commercial keywords from Seed_Keyword
Prohibited:
- Informational “how-to” keywords
Output enforcement:
- where_to_use_keyword must include placements such as:
  "Meta Description", and "Section headings" ONLY if headings exist in Domain_Page_Analysis_JSON

Step 4: Trust & EEAT Reinforcement (Proof blocks)
What this step MUST do:
- Add credibility signals that reduce hesitation and improve conversion readiness.
Required checks: 
- Missing proof: awards, certifications, testimonials, stats
- Missing schema for entity (Organization/LocalBusiness/EducationalOrganization etc.)
- Vague claims without proof
Competitor evidence:
- Competitor mentions rankings/accreditation/guarantees/refunds/reviews
- Schema includes Organization/Product reviews/ratings (ONLY if present in scrape schema_ld_json)
Fix_plan MUST include:
- Trust bar: certifications/guarantees
- Proof section: outcomes + metrics ONLY if data exists in inputs (else null + “Add proof once verified internally”)
- Testimonials module: only propose structure, do NOT invent testimonials
Keywords allowed:
✅ ONLY Transactional/Commercial clusters
Enforcement:
- No invented numbers, no invented ranking claims, no invented accreditations.
- If proof is missing in inputs: fix_plan must explicitly state “Add proof once verified internally” and leave values null.

Step 5: Conversion Path Optimization (CTAs + funnel mechanics)
What this step MUST do:
- Turn SEO traffic into leads/sales by fixing CTA absence, CTA clarity, and funnel flow.
Required checks:
- CTA missing (cta_links empty or weak)
- No action buttons inside CTA detection rules
- Weak conversion copy
Competitor evidence:
- CTA links present and repeated across page
- CTA language variety ("apply", "enquire", "download brochure", etc.) ONLY if present in competitor scrape
Fix_plan MUST include:
- Primary CTA strategy
- Secondary CTA strategy
- CTA placement map:
  Above fold, Mid-page, End-page
Keywords allowed:
✅ ONLY Transactional clusters
Must include:
- CTA copy may contain seed keyword ONLY if that keyword exists in Seed_Keyword
- Otherwise CTA copy must remain generic (NO keyword invention)

Step 6: Internal Link Authority Flow (SEO architecture)
What this step MUST do:
- Build authority flow using ONLY known internal links + planned clean slugs.
Required checks:
- Orphan/missing pages inferred ONLY from Domain_Page_Analysis_JSON internal_links + provided page list
- Too many duplicate links
- Wrong or non-descriptive anchor text
Competitor evidence:
- Strong navigation paths and structured categories/pages (ONLY if visible in competitor scrape text or provided competitor internal pages list)
Fix_plan MUST include:
- Internal linking blueprint:
  Hub → Category → Product/service pages → FAQ/blog
- Anchor text rules:
  anchor text should include Seed keyword where possible
Keywords allowed:
✅ ONLY Transactional + Commercial clusters
Enforcement:
- internal_links must be either:
  (A) found in Domain_Page_Analysis_JSON internal_links OR
  (B) planned clean slugs under the same domain (explicitly written)

Step 7: Technical SEO + Schema (SERP eligibility + structured data)
What this step MUST do:
- Ensure pages qualify for rich results and correct entity understanding via schema.
Required checks:
- Missing schema types
- Only breadcrumb schema
- Schema mismatch vs competitor
Competitor evidence:
- FAQPage schema present
- Product schema / Organization / EducationalOrganization schema present
Fix_plan MUST include:
- Schema additions in JSON-LD:
  Organization / LocalBusiness / Product / FAQPage (based ONLY on domain type and available data)
- Validate schema properties: url, name, address, contact, offers (only if data exists; otherwise null)
Keywords allowed:
✅ Seed keywords allowed ONLY in schema name/description fields
Prohibited:
- keyword stuffing
- keywords in unrelated schema properties

Step 8: SERP Feature Domination (PAA + featured snippets)
What this step MUST do:
- Optimize content for:
  Featured Snippets, People Also Ask, Sitelinks, Image Pack.
Required checks:
- Missing FAQ structures
- No short-answer blocks
- No snippet-target headings
Competitor evidence:
- Structured Q/A blocks, question headings (ONLY if present in competitor scrape)
Fix_plan MUST include:
- Snippet blocks:
  (A) short definition paragraph (40–60 words)
  (B) bullet list (5–7 points)
- FAQ question set derived ONLY from Informational Seed keywords (or dataset intent)
Keywords allowed:
 ONLY Informational clusters


Each step MUST contain:
- competitor_issue (what competitors do better)
- evidence_from_scrape:
    - target_domain: evidence ONLY from Domain_Page_Analysis_JSON + Current_State_of_SEO
    - competitor_pages: evidence ONLY from competitor scrape output
- fix_plan: list of actions (>=1)
Each fix_plan item MUST contain:
{{
  "what": "...",
  "why": "...must cite evidence...",
  "where": "...exact placement...",
  "how": "...exact implementation...",
  "priority": "high|medium|low",
  "keyywords_to_use": ["ONLY from Seed_Keyword"],
  "where_to_use_keyword": {{
    "keyword": "exact placement location"
  }}
}}

CRITICAL:
- keywords_to_use MUST ONLY come from selected Seed_Keyword list.
- where_to_use_keyword MUST NOT contain invented sections/pages unless present in Domain_Page_Analysis_JSON.
- If evidence is missing -> state as missing and penalize.

Output key: "Stragery"

========================
SMART GOAL
========================
Output key: "Goal"
Convert Goal into SMART SEO goal for the domain.

========================
FINAL OUTPUT FORMAT
========================
Return ONLY a valid Python-style JSON dictionary with EXACT keys:

Seed_Keyword
competetior
competetior_Analyisis
competetor_gap
Keyword_Cluster
Stragery
Goal

NO MARKDOWN
NO COMMENTARY
NO EXTRA TEXT
"""    
    response = Gen_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=Overall_Strategy_Prompt,
        config={
        "response_mime_type": "application/json",
        "response_json_schema":OverallSEOStrategyOutput.model_json_schema(),
    }
         
    )
    extracted = response.candidates[0].content.parts[0].text
    report = json.loads(extracted)
    logger.info("Report from the Overall stragery", report,"\n")
    return report

@app.post("/Shared_Missing_Keywords")
async def Shared_And_Missing_Keywords(user: Shared_Missing_Keywords):
    
    
    logger.info("\n Inside shared and missing keyword")

    
    Domain = get_domain(user.Domain_URL)

    Competetior = []
    for idx, items in enumerate(user.Competetior_Name):
        print(f"Now Processing the Competetior {idx+1}:{items} for getting domain name\n")
        Competetior.append(get_domain(items))

    header = [
        "Domain",
        "Keyword",
        "Search Volume",
        "keyword difficulty",
        "Keyword Intent",
        "Url",
        "Page Title",
        "Present Rank",
        "Previous Rank",
        "Change"
    ]

  
    

    

  
    domain_Keywords_Analyisis = {}
    Competetetiors_keywords_Analyisis = []

    Competetior.append(Domain)

    try:
        for idx, Com_domains in enumerate(Competetior):
            logger.info(f"Processing {idx+1}/{len(Competetior)}: {Com_domains}\n")

            post_data = {
                0: {
                    "target": Com_domains,
                    "location_name": "India",
                    "language_name": "English",
                    "limit": 1000
                }
            }

            response = client.post("/v3/dataforseo_labs/google/ranked_keywords/live", post_data)

            if response.get("status_code") != 20000:
                print(" DataForSEO failed:", response.get("status_message"))
                continue

            task = response["tasks"][0]
            if not task.get("result"):
                continue

            items_list = task["result"][0].get("items")
            if not items_list:
                continue

            Final_respone = []
            for items in items_list:
                keyword = items["keyword_data"]["keyword"]

                search_volume = items["keyword_data"]["keyword_info"].get("search_volume")
                keyword_intent = items["keyword_data"]["search_intent_info"].get("main_intent")
                present_rank = items["ranked_serp_element"]["serp_item"].get("rank_absolute")
                source_page = items["ranked_serp_element"]["serp_item"].get("url")
                page_title = items["ranked_serp_element"]["serp_item"].get("title")
                previous_rank = items["ranked_serp_element"]["serp_item"]["rank_changes"].get("previous_rank_absolute") or 0
                keyword_difficulty = items["keyword_data"]["keyword_properties"].get("keyword_difficulty")

                rank_changes = present_rank - previous_rank if present_rank is not None else None

                Final_respone.append({
                    "keyword": keyword,
                    "search_volume": search_volume,
                    "keyword_intent": keyword_intent,
                    "present_rank": present_rank,
                    "source_page": source_page,
                    "page_title": page_title,
                    "previous_rank": previous_rank,
                    "keyword_difficulty": keyword_difficulty,
                    "rank_changes": rank_changes
                })

        
            if Com_domains == Domain:
                domain_Keywords_Analyisis["domain"] = Com_domains
                domain_Keywords_Analyisis["Keywords_details"] = Final_respone
            else:
                Competetetiors_keywords_Analyisis.append({
                    "Domain": Com_domains,
                    "Keyword_Details": Final_respone
                })

        # ✅ Compare keywords AFTER collecting all results
        Shared_keyword = []
        missing_keyword = []

        domain_keywords_list = [k["keyword"] for k in domain_Keywords_Analyisis.get("Keywords_details", [])]

        for competitor in Competetetiors_keywords_Analyisis:
            comp_domain = competitor["Domain"]

            for item in competitor["Keyword_Details"]:
                Keyword = item["keyword"]

                row = [
                    comp_domain,
                    item["keyword"],
                    item["search_volume"],
                    item["keyword_difficulty"],
                    item["keyword_intent"],
                    item["source_page"],
                    item["page_title"],
                    item["present_rank"],
                    item["previous_rank"],
                    item["rank_changes"]
                ]

                if Keyword in domain_keywords_list:
                    Shared_keyword.append(row)
                else:
                    name = comp_domain.split(".")[0]
                    ratio = fuzz.token_set_ratio(name.lower(), Keyword.lower())

                    if ratio < 70:
                        missing_keyword.append(row)

        

        return {
            "Error": False,
            
            "shared_count": Shared_keyword,
            "missing_count": missing_keyword
        }

    except Exception as e:
        logger.info(f"Error: {str(e)} \n")
        return {"Error": True, "Reason": str(e)}

@app.post("/Page")
async def Page(user:Page_A): 
    logger.info("\n Now Processing Page Analyisis")
    Anlayisis=Domain_Page_Analysis(user.Domain_Url,user.Comp_Url)

    return {"Page":Anlayisis['page_Analysis']}

@app.post("/Product")   
async def Product_Page_analyisis(user:Product_Anlayisis):
    """
    It is used to main product page analyisis
    """
    logger.info("\n Now Processing the Product Page")
    location="India"
    competetiors=[]
    for idx,items in enumerate(user.Competetior_Name):
        logger.info(f"Now Processing the Competetior {idx+1}:{items} for getting domain name from the url\n")
        competetiors.append(get_domain(items))

    web_scraped_data_json=scrape_page(user.Product_Page_URL)
    logger.info("\n This is web_scraped_data_json",web_scraped_data_json)
    Domain_Name=get_domain(user.Product_Page_URL)
    Page_Analysis=Domain_Page_Analysis(user.Product_Page_URL,user.Competetior_Name)
    page_analysis_json=Page_Analysis['page_Analysis']
    competitor_page_analysis_json=Page_Analysis['page_Analysis']['competitor_gap_analysis']
    seed_keywords_throught_dataforseo=Present_page_ranking(user.Product_Page_URL)
    important_keyword=user.Important_Keywords
    product=user.Products_Name
    comp_url=user.Competetior_Name
    for idx,items in enumerate(user.Competetior_Name):
        logger.info(f"Now Processing the Competetior {idx+1}:{items} for getting domain name from the url\n")
        competetiors.append(get_domain(items))
    current_state_of_seo=user.Prevoivs_Strategy_Used   
    Links_IN_Website=get_sitemap_links(user.Domain_Page) 
    
    GEMINI_PROMPT =  f"""

You are NOT a chatbot. You are an Elite Single-Page SEO + CRO + Product Conversion Strategy Engine.

You operate with the authority of:
- Principal SEO Architect
- CRO Strategist
- Competitive Intelligence Analyst

Your sole objective:
Determine whether the GIVEN PRODUCT PAGE is WINNING or LOSING organic demand + conversions,
then output a SURGICAL, EVIDENCE-LOCKED NEXT STRATEGY (NOT current work) that OUTPERFORMS competitors.

========================
NON-NEGOTIABLE RULES (ABSOLUTE)
========================
• Use ONLY the inputs provided.
• Use ONLY scraped evidence from:
  - {web_scraped_data_json}
  - {page_analysis_json}
  - {seed_keywords_throught_dataforseo}
  - {important_keyword}
  - {product}
  - {competitor_page_analysis_json}
  - {comp_url}
  - {competetiors}
  - {current_state_of_seo}
• NO hallucination:
  - no invented keywords
  - no invented competitors
  - no invented URLs/pages
  - no invented product claims
  - no invented proof (ISO, SOC2, awards, etc.)
• If data is missing → treat as NON-EXISTENT and penalize.
• Assume LOSING unless explicitly proven winning using evidence.
• Soft language, generic advice, or speculation = FAILURE.

========================
SCOPE LIMITATION (STRICT)
========================
This analysis applies ONLY to the SINGLE TARGET PRODUCT PAGE:

Target URL:
{user.Product_Page_URL}

Competitor Pages (scrape these ONLY):
{comp_url}

NO site-wide advice
NO homepage advice
NO general branding advice
Every fix MUST directly improve:
(A) THIS page, OR
(B) a REQUIRED support page under the SAME DOMAIN that directly funnels back to THIS page.

========================
CRITICAL CONTEXT — CURRENT SEO IS ALREADY DONE
========================
Current SEO Work Completed (LOCKED — DO NOT REPEAT TASKS):
{current_state_of_seo}

IMPORTANT:
- You MUST NOT output the "current plan".
- You MUST output ONLY the NEXT strategy actions to reach {user.Goal}.
- Every strategy action must explicitly show what it improves beyond current_state_of_seo.

========================
SCRAPER REALITY (HARD LIMITS)
========================
Assume scraped HTML constraints:
• Visible text = ONLY <p> tag content
• Headings = ONLY <h1> tags
• CTAs = ONLY from <a> anchor text containing:
  ["apply","enquire","download","call","contact","book","visit","shop","buy","demo","trial","pricing","quote"]
• UI layout content not available
• Images = count only
If something cannot be proven from scraped fields → it does NOT exist.

========================
INPUTS (ONLY SOURCE OF TRUTH)
========================
Web Scraped Page Data:
{web_scraped_data_json}

Page Metadata:
{page_analysis_json}

Seed Keywords Dataset (DataForSEO — keywords the page/domain is already ranking/using):
{seed_keywords_throught_dataforseo}

Business Important Keywords:
{important_keyword}

Product:
{product}

Target Audience:
{user.Target_Audience}

Location:
{location}

Business Goal:
{user.Goal}

Competitor Scraped Page Data:
{competitor_page_analysis_json}

Competitors:
{competetiors}

========================
KEYWORD RULES (UPDATED FOR YOUR REQUIREMENT)
========================
ALLOWED KEYWORD SOURCES (ONLY):
1) {seed_keywords_throught_dataforseo}
2) {important_keyword}
3) {product}

You MAY generate NEW keywords ONLY if:
- they are closely derived from {important_keyword}/{product} themes
- they match the scraped page topic
- they support {user.Goal}

For every keyword in Seed_Keyword output you MUST label:
- keyword_source:
  "seed_keywords_dataforseo" OR "important_keyword" OR "product" OR "generated"

If keyword_source = "seed_keywords_dataforseo":
- treat it as already ranking/used keyword
- You MUST provide: "improvement_plan" describing how to improve usage vs previous work.

If keyword_source != "seed_keywords_dataforseo":
- keyword must be explicitly tied to page relevance + goal

Difficulty rules:
- If difficulty exists in DataForSEO -> use it
- Else infer difficulty 1–100

Keywords allowed inside Strategy fix_plan MUST come from EITHER:
A) Seed_Keyword.keyword
OR
B) Keyword_Cluster.cluster_keywords (including generated keywords)
OR
C) important_keyword
OR
D) product

STRICT:
- Do NOT invent keywords outside these sources.
- All keywords used in strategy MUST match EXACT strings from these sources.

Enforcement:
- must_use_keyword MUST be from (A or B)
- supporting_keywords MUST be from the SAME CLUSTER as must_use_keyword and MUST be from (A or B)
- If must_use_keyword is from Seed_Keyword, it MUST also appear inside Keyword_Cluster (in some cluster keywords list), otherwise FAIL.

========================
MANDATORY OUTPUT TASKS
========================

1) Page Verdict
Output key: "Verdict"
Must include:
- status: WINNING or LOSING
- reason: cite scraped evidence only
- conversion_readiness_score: 0-100 (CTA + trust + clarity)

2) Seed Keyword Intelligence (EXACTLY 20 keywords)
Output key: "Seed_Keyword"

IMPORTANT:
These 20 keywords are the ONLY allowed keyword pool for Step Strategy.

Each keyword object MUST include:
- keyword
- search_volume
- relevance_score
- difficulty
- intent
- keyword_source
- improvement_plan:
    Required ONLY when keyword_source="seed_keywords_dataforseo"
    This must say how to improve keyword usage beyond current_state_of_seo
    Example: "Add exact match in H1 + include in 1st 80 words + add FAQ question targeting it"

Format:
"Seed_Keyword": [
  {{
    "keyword": "...",
    "keyword_source": "seed_keywords_dataforseo|important_keyword|product|generated",
    "intent": "Transactional|Commercial|Informational|Navigational",
  
    "relevance_score": <int> 1-100,
  
    "improvement_plan": "string"
  }}
]

3) Competitor List (RAW)
Output key: "competetior"
Return {competetiors} EXACTLY.
Rank the competitor according the competion level with our domain and give in an order 



4) Competitor Analysis (Scraped)
Output key: "competetior_Analyisis"
{{"Competitor Link": Competitior, 
"Summary" : Summary of how the structure of the website in detailed way }}

5) Competitor Gap
Output key: "competetor_gap"
In the fix plan dont give add reviews or add to cart or add pricing in the page or add cta or add return policy or if the products are less dont give filtering and if products is less dont give filters also , only provide more on the SEO Part , Content and structuring of the page
Strict mapping only using scraped evidence.

6) Keyword Clustering
Output key: "Keyword_Cluster"
Cluster ONLY the 20 Seed_Keyword terms.
No duplicates.
No cross-cluster repeats.

7) NEW Strategy (NEXT actions only) — Step-based
Output key: "Stragery"

IMPORTANT:
This MUST be the NEXT strategy only:
- Must not repeat items already done in {current_state_of_seo}
- Must explicitly reference what is next to do

This is overall pages in the website {Links_IN_Website} with this only you decide if should make new page of changes in exiting pages for the stragery

Strategy MUST be exactly 8 steps:

Step 1: Content Dominance
Step 2: Long-Tail Capture
Step 3: Audience & Region Alignment
Step 4: Trust & EEAT Reinforcement
Step 5: Conversion Path Optimization
Step 6: Internal Link Authority Flow
Step 7: Technical SEO + Schema
Step 8: SERP Feature Domination

Each Step MUST include:
- what_next_to_do (must be NEW beyond current_state_of_seo)
- competitor_issue
- evidence_from_scrape:
  - target_page evidence from web_scraped_data_json/page_analysis_json/current_state_of_seo
  - competitor_pages evidence from competitor_page_analysis_json
- fix_plan: list of actions (>=1)


Each fix_plan item MUST include:
- must_use_keyword: exactly 1 keyword from Seed_Keyword
- supporting_keywords: 2-5 keywords from SAME Keyword_Cluster only
- keyword_usage_upgrade:
    If must_use_keyword came from DataForSEO seed list,
    explain how usage improves vs previous SEO in {current_state_of_seo}

Fix_plan schema:
{{
  "page_action": "Existing Page Upgrade|New Page",
  "page_url": "...",
  "what_next_to_do": "...",
  "why": "...cite evidence...",
  "where": "...exact placement...",
  "how": "...exact implementation...",
  "priority": "high|medium|low",
  "must_use_keyword": "must be from Seed_Keyword OR Keyword_Cluster",
"supporting_keywords": ["must be from SAME Keyword_Cluster as must_use_keyword"]
  "keyword_usage_upgrade": "explain improvement vs previous usage",
  "where_to_use_keyword": {{
    "<must_use_keyword>": "<exact placement>",
    "<supporting_keyword>": "<exact placement>"
  }}
}}

8) SMART Goal
Output key: "Goal"
Convert business goal into SMART goal for THIS PAGE.

========================
FINAL OUTPUT FORMAT
========================
Return ONLY a valid Python-style JSON dictionary with EXACT keys:

Verdict
Seed_Keyword
competetior
competetior_Analyisis
competetor_gap
Keyword_Cluster
Stragery
Goal

NO markdown
NO commentary
NO extra text


"""






    response = Gen_client.models.generate_content(
    model="gemini-2.5-flash",
    contents=GEMINI_PROMPT,
    config={
        "response_mime_type": "application/json",
        "response_json_schema":SinglePageSEOOutputModel.model_json_schema(),
    },
)

    print(response.text)
    responseg=json.loads(response.text)
    return {"Report":responseg}

@app.post("/Month")
async def Month_Wise_Plan(user:Month_Wise_Planer):


    logger.info("\n We are in Month Wise Plan")
    links_in_website=get_sitemap_links(user.Domain_Page)
    competetiors=[]
    for idx,items in enumerate(user.Competetior_Name):
        logger.info(f"Now Processing the Competetior {idx+1}:{items} for getting domain name from the url\n")
        competetiors.append(get_domain(items))
    web_scraped_data_json=scrape_page(user.Page_URL)
    Domain_Name=get_domain(user.Page_URL)
    Page_Analysis=Domain_Page_Analysis(user.Page_URL,user.Competetior_Name)
    page_analysis_json=Page_Analysis['page_Analysis']
    competitor_page_analysis_json=Page_Analysis['page_Analysis']['competitor_gap_analysis']
    comp_url=user.Competetior_Name
    ranking_summary=Present_page_ranking(user.Page_URL)  
    if "Error" in ranking_summary:
        ranking_summary="" 
    location="India"    
    




    Gemini_Prompt=f"""Month wise 

You are NOT a chatbot. You are an Elite Single-Page SEO & Revenue Strategy Engine.

You operate with the authority of a Principal SEO Architect, CRO Strategist, and Competitive Intelligence Analyst.

Your sole objective is to determine whether the GIVEN PRODUCT PAGE is WINNING or LOSING organic demand and conversions, and to output a SURGICAL, EVIDENCE-LOCKED SEO STRATEGY that OUTPERFORMS competitors.

========================
NON-NEGOTIABLE RULES (ABSOLUTE)
========================
• You MUST use ONLY the inputs provided.
• You MUST use ONLY scraped evidence from:
  - {web_scraped_data_json}
  - {page_analysis_json}
  - {user.Important_Keywords}
  - {user.Products_Name} 
  - {ranking_summary}
  - {competitor_page_analysis_json}
  - {comp_url}
  - {competetiors}
  - {user.Prevoivs_Strategy_Used_for_Prevois_Month}
  - {user.start_month}
  - {user.end_month}

• You MUST NOT hallucinate competitors, metrics, domains, features, pages, or claims.
• You MUST NOT add ANY keyword outside the allowed keyword sources + allowed generation rules.
• If data is missing → treat it as NON-EXISTENT and penalize accordingly.
• Assume this page is LOSING traffic and revenue unless proven otherwise.
• Soft language, vague advice, or speculative SEO guidance = FAILURE.

========================
SCOPE LIMITATION
========================
This analysis applies ONLY to the SINGLE TARGET PAGE:

Target URL:
{user.Page_URL}

Competitor Pages:
{comp_url}

NO site-wide advice
NO homepage advice
NO general branding advice
EVERY fix must directly improve THIS PAGE or its required support pages under the SAME DOMAIN.

========================
INPUTS (STRICT — SCRAPER ALIGNED)
========================
Web Scraped Page Data (PRIMARY SOURCE OF TRUTH):
{web_scraped_data_json}

NOTE: scraper constraints (STRICT):
• Visible text = ONLY <p> tag content
• Headings = ONLY <h1> tags
• CTAs = detected ONLY from <a> anchor text containing ["call","shop","buy","book","contact","visit"]
• Navigation, buttons, cards, tables, and layout ARE NOT available
• Images = count only (no interpretation)

Page Metadata JSON:
{page_analysis_json}

Ranking Summary (RANKING INTELLIGENCE INPUT — STRING):
{ranking_summary}

Previous Strategy Used for Previous Months (EXECUTION HISTORY — LOCKED INPUT):
{user.Prevoivs_Strategy_Used_for_Prevois_Month}

Start Month (EXECUTION WINDOW START — FIXED):
{user.start_month}

End Month (EXECUTION WINDOW END — FIXED):
{user.end_month}

Seed Keywords (VALID KEYWORD INPUT SOURCES): a
{user.Important_Keywords} + {user.Products_Name} + {ranking_summary} and can generate new keywords

Important Keywords (Business Focus):
{user.Important_Keywords}

Product / Products:
{user.Products_Name}

Competitor Page Analysis JSON:
{competitor_page_analysis_json}



Target Audience:
{user.Target_Audience}

Location:
{location}

Business Goal:
{user.Goal}

========================
CRITICAL CONTEXT
========================
The strategy MUST be month-wise.

STRICT EXECUTION WINDOW RULE (ABSOLUTE):
• You MUST generate the plan for EXACTLY 3 months ONLY:
  FROM {user.start_month}
  TO {user.end_month}

ABSOLUTE WINDOW ENFORCEMENT:
1) Output MUST contain ONLY from {user.start_month} to {user.end_month}
2) Month keys MUST be EXACTLY:
   - {user.start_month}
   - <the calendar middle month between start and end>
   - {user.end_month}
3) You MUST NOT infer/extend months beyond this window.
4) {user.Prevoivs_Strategy_Used_for_Prevois_Month} is used ONLY to avoid repeating executed tasks,
   NOT for deciding the months.


STRICT ANTI-REPEAT RULE:
• You MUST NOT repeat ANY task already present in {user.Prevoivs_Strategy_Used_for_Prevois_Month}.
• If a task exists in previous strategy input, treat it as COMPLETED and produce ONLY net-new tasks.

========================
PRIMARY INTENT DIRECTIVE (NON-NEGOTIABLE)
========================
The MAIN intention of this NEXT 3-MONTH PLAN is:
→ Generate COMMERCIAL intent conversions for THIS PAGE
by
→ Satisfying INFORMATIONAL intent first.

STRICT INTENT FLOW RULE:
• Informational intent MUST be used ONLY as the acquisition layer.
• Every informational content piece MUST funnel users into a commercial conversion path.
• Every plan item MUST explicitly map: Informational → Commercial/Transactional → Conversion goal.

MANDATORY OUTPUT ENFORCEMENT:
1) At least 60% of {user.start_month}–{user.end_month} items must be "Commercial" or "Transactional" search_intent.
2) Informational items are allowed ONLY if they satisfy BOTH conditions:
   A) They target a keyword from allowed keyword sources OR allowed generated keywords
   B) They include a CTA funnel back to {user.Page_URL} for conversion
3) Each Informational item MUST include inside "brief":
   - "Commercial Bridge" section:
     • internal link from that page → {user.Page_URL}
     • CTA anchor suggestion: Apply Now / Enquire Now / Download Brochure / Visit Campus
     • the exact paragraph where the CTA link is placed

========================
KEYWORD RULES (UPDATED — NON-NEGOTIABLE)
========================
ALLOWED KEYWORD INPUT SOURCES:
1) {ranking_summary}
2) {user.Important_Keywords}
3) {user.Products_Name}

NEW KEYWORD GENERATION RULE (ALLOWED):
• You MAY generate NEW keywords ONLY if they are clearly relevant to:
  - {user.Products_Name}
  - {user.Goal}
  - AND the search intent plan for the 3-month window
• Generated keywords MUST be derived from patterns/entities appearing in:
  {ranking_summary} OR {user.Important_Keywords} OR {user.Products_Name}
• Generated keywords MUST NOT be random.
• Generated keywords MUST be explicitly labeled in outputs.

KEYWORD GOVERNANCE:
• Keywords from {ranking_summary}, {user.Important_Keywords}, {user.Products_Name} = "Provided"
• Newly created keywords = "Generated"
• Generated keywords MUST have:
  - search_volume: null
  - relevance_score: null
  - difficulty: inferred 1–100 (mandatory)

KEYWORD DIFFICULTY ENFORCEMENT:
• Prefer HIGHER search_volume + LOWER difficulty.
• If difficulty exists in input, USE it.
• Else infer difficulty using:
  – competitor usage intensity,
  – keyword specificity,
  – intent closeness to the product page.
• difficulty MUST NEVER be null.

========================
MANDATORY TASKS
========================

1) SEED KEYWORD INTELLIGENCE (UPDATED — STRICT)

You MUST output EXACTLY 20 keywords total.

CRITICAL CONSTRAINTS:
• Seed keywords may come from:
  - {ranking_summary}
  - {user.Important_Keywords}
  - {user.Products_Name}
  - Generated keywords (ALLOWED)
• Generated keywords are allowed BUT MUST be MAX 5 inside Seed_Keyword.

SELECTION LOGIC (IN THIS ORDER):
1) relevance_score (if exists)
2) search_volume (if exists)
3) difficulty (lower preferred)
4) buyer intent alignment with {user.Goal}
5) competitor saturation

Output key MUST be "Seed_Keyword" only.

Output format STRICT:
"Seed_Keyword": [
  {{
    "keyword": "EXACT keyword",
    
    "relevance_score": int,
  
    "keyword_origin": "Provided | Generated",
    "keyword_source": "ranking_summary | important_keyword | product | generated"
  }}
]

2) COMPETITOR LIST — RAW (NO MODIFICATION): {competetiors}
Return competitor list EXACTLY as provided.
Rank the competitor according the competion level with our domain and give in an order 


Output key:
"competetior"

3) COMPETITOR PAGE ANALYSIS (SCRAPED EVIDENCE ONLY): {comp_url}
{{
    
Competior:str,
Summary:str

}}

Output key:
"competetior_Analyisis"

4) COMPETITOR GAP MAPPING (STRICT FIX-PLAN REQUIRED)
Identify ALL gaps where competitors outperform THIS page.
In the fix plan dont give add reviews or add to cart or add pricing in the page or add cta add return policy or if the products are less dont give filtering and if products is less dont give filters also , only provide more on the SEO Part , Content and structuring of the page

Each gap MUST include fix_plan.

Output key:
"competetor_gap"

Format:
{{
  "gap_type": "Keyword | Content | Trust | Intent | Conversion",
  "description": "Competitive disadvantage proven via scraped data",
  "fix_plan": [
    {{
      "what": "Exact change required",
      "why": "Why this is mandatory, referencing competitor + scraped absence",
      "where": "Exact location (title, h1, paragraph, CTA link, schema)",
      "how": "Concrete implementation steps",
      "priority": "high/medium/low"
    }}
  ]
}}

5) KEYWORD CLUSTERING (UPDATED — CAN GENERATE NEW CLUSTER KEYWORDS)
Cluster keywords based on Seed_Keyword.

Output key:
"Keyword_Cluster"

CLUSTER RULES:
• Clusters MUST include keywords from Seed_Keyword.
• Clusters MAY include additional GENERATED keywords that are:
  - derived from Seed_Keyword + ranking_summary intent patterns
  - strongly relevant to {user.Page_URL} conversion
• Generated cluster keywords limit:
  - MAX 2 generated keywords per cluster

Each cluster:
{{
  "cluster_name": "...",
  "keywords": [
    {{
      "keyword": "Seed keyword OR generated keyword",
      "keyword_origin": "Seed | Generated"
    }}
    tag: Info|Commerical|trasnsical|Nagivative only from these
  
}}



{links_in_website} are the links present in the whole website, with this information want it to decide whether new page or make changes in existing page
========================
6) STRAGERY 
========================
You MUST output "Stragery" as a JSON OBJECT containing ONLY 
FROM {user.start_month} TO {user.end_month}

if {user.start_month} and {user.end_month} are same , then provide strategy for only that month

No summaries.
JSON ONLY.

In the fix plan dont give add reviews or add to cart or add pricing in the page or add cta add return policy or if the products are less dont give filtering and if products is less dont give filters also , only provide more on the SEO Part , Content and structuring of the page

Never leave it empty it have infoamtion 
-----------------------------------
STRICT STRAGERY OUTPUT FORMAT (MANDATORY)
-----------------------------------

"Stragery": {{
  "Months_Plan": {{
    "month": [
      {{
        "month": "Month",
        "s_no": 1,

        "content_type": "FAQ Page | Blog Post | Landing Page | Category/Program Page | On-Page Paragraph Upgrade | Section Rewrite | Schema Implementation",

        "page_action": "Existing Page Upgrade | New Page",

        "page_name": "Exact page name",
        "page_url": "Exact URL OR planned URL slug",
        "section_target": "If existing upgrade -> exact target location, else null",

        "topic": "Topic must match the page purpose (not generic)",
        "primary_keyword": "MUST be exact keyword from: from seed keywords or keyword clusters,
        "secondary_keywords": ["MUST be exact keywords from:  from seed keywords or keyword clusters,

        "search_intent": "Informational | Commercial | Transactional | Navigational",
        "competitors": ["must match competitor list"],
        "competitor_links": ["must follow competitor link rule"],

        "schema_type": ["only if applicable: FAQPage | EducationalOrganization | Breadcrumb"],

        "internal_links": ["must be from scraped internal links OR planned internal links to existing pages"],

        "cta": "Apply Now | Enquire Now | Download Brochure | Contact Admissions | Visit Campus",
        "conversion_goal": "Enquiry | Form Submission | Course Page Visit | Campus Visit Booking",

        "serp_feature_target": ["People Also Ask | Featured Snippet | Sitelinks | Image Pack"],

        "brief": "8–12 lines. Must include exact headings/sections/paragraph inserts and EXACT keyword placements (where).",
        "expected_result": "2–4 lines outcome tied to conversion_goal.",
        "priority": "Very High | High | Medium | Low"
      }}
    ],
    "month": [ ... ],
    "month": [ ... ]
  }}
}}

MONTH NAME RULE:
• The month names MUST be real month names.
• The middle month MUST be the calendar month between {user.start_month} and {user.end_month}.

STRAGERY KEYWORD USAGE RULE:
• primary_keyword and secondary_keywords may come from:
  - Seed_Keyword keywords
  - Keyword_Cluster keywords (including generated)
• You MUST label keyword origin:
  - keyword_origin: "Provided | Generated"
  - keyword_source: "Seed_Keyword | Keyword_Cluster"

(Keep the remaining original STRAGERY formatting rules unchanged)

7) SMART SEO GOAL (PAGE-ONLY)
Convert the business goal into a STRICT SMART SEO goal for THIS PAGE.

Output key:
"Goal"

========================
OUTPUT FORMAT (ABSOLUTE)
========================
Return ONLY a VALID Python-style JSON dictionary with EXACT keys:

Seed_Keyword
competetior
competetior_Analyisis
competetor_gap
Keyword_Cluster
Stragery
Goal

NO markdown
NO commentary
NO additional text

FINAL VALIDATION RULE:
• If a claim cannot be proven using scraped fields, it MUST NOT be made.
• If an element is not present in scraped data, treat it as MISSING.
• Any inferred UI or hidden content = INVALID OUTPUT.
 """

    response = Gen_client.models.generate_content(
    model="gemini-2.5-flash",
    contents=Gemini_Prompt,
    config={
        "response_mime_type": "application/json",
        "response_json_schema":FinalOutputModel.model_json_schema(),
    },
)

    print(response.text)
    responseg=json.loads(response.text)
    logger.info("\n Now The Respsone from the Month Wise Plan",responseg)
    return {"Report":responseg}

@app.post("/Keyword")
async def Keyword_Reserach(user:Keywords_Research):
    
    logger.info("\n In the Keyword Reserch \n ")
    Result=[]
    for idx, items in enumerate(user.Keywords):
        logger.info(f"\n Now Processinf {idx+1} Keyword:{items} \n ")
        logger.info("Now in the People Also Ask\n")
        People_Also_Ask_for=People_Also_Ask_for_Keywords(items)
        logger.info("Now in the Long tail Keyword \n ")
        Long_tail_Keyword=Long_tail_keywords(items)
        Result.append({"Keyword":items,"People_Also_Ask_For":People_Also_Ask_for,"Long_tail_Keyword":Long_tail_Keyword})
    All_Related_keywords=related_keywords(user.Keywords)  

  
    Respone={"Related_Keywords":All_Related_keywords,"Each_keyword_info":Result}
    logger.info("\n Now the Respone fron the Keyword Reserach",Respone)
    return Respone

@app.post("/Keyword_Pie")
async def Keyword_pie(user:keyword_pie):
    logger.info("\n Now Processing Keyword Pie")
    Respone=serach_engine(user.Keyword)
    Shopping=Serach_Shopping(user.Keyword)
    AI=AI_MODE(user.Keyword)

    logger.info("\n Now Processing Related Question")
    logger.info(Respone)
    logger.info("\n Now Processing Related Searchs")
    logger.info(Shopping)
    logger.info("\n Now Processing AI Mode")
    logger.info(AI)

    return {"Related_Question":Respone['Related_Question'],"Related_Searchs":Respone['Related_Searchs'],"Shopping":Shopping,"AIMODE":AI}

@app.post("/Page")
async def Page(user:Page_A): 
    logger.info("\n Now Processing Page Analyisis")
    Anlayisis=Domain_Page_Analysis(user.Domain_Url,user.Comp_Url)
    logger.info("\n Now The Result of",{Anlayisis})

    return {"Page":Anlayisis['page_Analysis']}      
    
@app.post("/Keyword_sitemap")
async def Keyword_site(user:Keyword_Sitemap):
    logger.info("\n Now processing the Keyword Sitemap")
    Response=People_Also_Ask_for_Keywords(user.Keyword)
    logger.info("\n The respsone from the Keyword Sitemap",Response)
    
    return {"Keyword_Sitemap":Response}

@app.post("/Login")
async def Login(user:LoginData):
    logger.info("In The Login part modulde \n")
    logger.info(" the username",user.UserName,"the password",user.Password)
    if user.UserName=="marketing@bdcode.in":
        Username=True
    else:
        Username=False
    if user.Password=="Hugjapan@747":
        password=True
    else: 
        password=False

    if Username and password:
        return {"Status":True}
    elif Username and not password:
        return {"Status":False,"Message":"Incorrect Password"}
    else:
        return{"Status":False,"Message":"Incorrect Username"}       



    



















        




