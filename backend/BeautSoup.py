"""
Method: POST
Endpoint: https://api.dataforseo.com/v3/ai_optimization/llm_mentions/search/live
@see https://docs.dataforseo.com/v3/ai_optimization/llm_mentions/search/live
"""

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../../')))
from client import RestClient
import json

client = RestClient("marketing@bdcode.in", "614aa720fb95e1b5")

post_data = []
post_data.append({
        'language_name': 'English',
        'location_name': "India",
        'target': [
            
            {
                   "keyword": "Georgette sarees",
        "search_scope": ["any"]
                
                
            }
        ],
       ' limit':10,
        
        
        'order_by': [
            'ai_search_volume,desc'
        ],
       
    })
try:
    response = client.post('/v3/ai_optimization/llm_mentions/search/live', post_data)
    print(response)
    file_path = "/Users/ramyaraghuraman/Desktop/SEO_AGENT/SEO-Automation/Tring_SEO_Agent/beaut.json/majacob.json"
    with open(file_path, 'w') as json_file:
      json.dump(response, json_file, indent=4)
      print(json.dumps(response, indent=4))
    # do something with post result
except Exception as e:
    print(f'An error occurred: {e}')