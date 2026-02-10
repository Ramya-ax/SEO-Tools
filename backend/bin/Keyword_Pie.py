import requests
import os
from dotenv import load_dotenv
load_dotenv()
import json
import spacy 
nlp = spacy.load("en_core_web_sm")
from logs.log import my_log
logger=my_log()

def clean_title(title):
    title = title.split("|")[0]        # remove pipe parts
    title = title.split("...")[0]      # remove trailing dots
    return title.strip()

def is_generic_product(title):
    doc = nlp(title)

   
    for ent in doc.ents:
        if ent.label_ == "ORG":
            return False

    return True

def serach_engine(keyword:str,location="India",gl="in"):
    logger.info("Now Inside the Serach Engine Module \n")
    Pages=1 # Reduced to 1 to avoid redundant calls for now
    Related_Searches=[]
    Related_Question=[]
    for i in range(Pages):
        logger.info(f"Now getting Google's Serach Result Page {i+1} \n")
        url = "https://www.searchapi.io/api/v1/search"
        params = {
        "engine": "google",
        "q": keyword,
        "api_key": os.getenv("SERPAPI"),
        "location": location,
        "gl":gl,
             }

        try:
            response = requests.get(url, params=params)
            # logger.info(f"Response Status: {response.status_code}") # excessive logging
            data=response.json()
            
            if 'error' in data:
                 logger.error(f"API Error: {data['error']}")
                 continue

            RelatedQ=data.get('related_questions', [])
            Related=data.get('related_searches', [])
            
            if not Related:
                logger.warning("No related searches found")
            
            for items in Related:
                if is_generic_product(items.get('query', '')):
                     Related_Searches.append(items['query'])

            if not RelatedQ:
                logger.warning("No related questions found")

            for item in RelatedQ:
                if is_generic_product(item.get('question', '')):
                    Related_Question.append(item['question'])
                    
        except Exception as e:
            logger.error(f"Error in search_engine: {str(e)}")
            
    return {"Related_Question": Related_Question, "Related_Searchs":Related_Searches } 

def Serach_Shopping(keyword:str,location="India",gl="in"):
    logger.info("Now in the Shopping Keyword Processing shopping API \n")
    Pages=1
    Shopping=[]
   
    for i in range(Pages):
        url = "https://www.searchapi.io/api/v1/search"
        params = {
        "engine": "google_shopping",
        "q": keyword,
        "api_key": os.getenv("SERPAPI"),
        "location": location,
        "gl":gl,
             }

        try:
            response = requests.get(url, params=params)
            data=response.json()
            
            if 'error' in data:
                 logger.error(f"Shopping API Error: {data['error']}")
                 continue

            RelatedS=data.get('shopping_results', [])
            
            for items in RelatedS:
                if is_generic_product(items.get('title', '')):
                    Shopping.append({
                        "title": items.get('title'),
                        "price": items.get('price'),
                        "source": items.get('source'),
                        "thumbnail": items.get('thumbnail'),
                        "link": items.get('link')
                    })
        except Exception as e:
            logger.error(f"Error in Search_Shopping: {str(e)}")

    return Shopping            
 
def AI_MODE(keyword:str,location="India",gl="in"):
    logger.info("Now in the processing of the AI Mode Keyword \n")
    Google_Shorts=[]
    url = "https://www.searchapi.io/api/v1/search"
    
    # Shorts
    try:
        params = {
            "engine": "google_shorts", # Check if this engine exists in searchapi.io docs, otherwise standard google search might be needed
            "q": keyword,
            "api_key": os.getenv("SERPAPI"),
            "location": location,
            "gl":gl,
                }
        response = requests.get(url, params=params)
        data=response.json()
        RelatedS=data.get('shorts', [])
        
        for items in RelatedS:
            if is_generic_product(items.get('title', '')):
                text=clean_title(items.get('title', ''))
                Google_Shorts.append(text)
    except Exception as e:
        logger.error(f"Error in AI_MODE (Shorts): {str(e)}")

    # Forums
    try:
        logger.info("Now getting forum results")
        paramss = {
            "engine": "google", # typically forums are part of organic results or a specific google filter
            "q": keyword + " forum",
            "api_key": os.getenv("SERPAPI"),
            "location": location,
            "gl":gl,
                }
        responsee = requests.get(url, params=paramss)
        data=responsee.json()
        Relatedf=data.get('organic_results', [])
        
        for itemsq in Relatedf:
            if is_generic_product(itemsq.get('title', '')):
                 Google_Shorts.append(itemsq.get('title'))
    except Exception as e:
        logger.error(f"Error in AI_MODE (Forums): {str(e)}")

    return Google_Shorts        



    


    
    








           


        
