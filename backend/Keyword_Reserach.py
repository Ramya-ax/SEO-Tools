from client import RestClient
client = RestClient("marketing@bdcode.in", "614aa720fb95e1b5")
def People_Also_Ask_for(Keyword:str,location="India"):
    print(f"\n Now In People also Ask for the Seed Keywords:{Keyword}")
    post_data = dict()
 
    post_data[len(post_data)] = dict(
        keyword=Keyword,
        location_name=location,
        language_name="English",
        filters=[
            ["keyword_data.keyword_info.search_volume", ">", 10]
        ],
        limit=3
    )
    # POST /v3/dataforseo_labs/google/related_keywords/live
    response = client.post("/v3/dataforseo_labs/google/related_keywords/live", post_data)
    # you can find the full list of the response codes here https://docs.dataforseo.com/v3/appendix/errors
    if response["status_code"] == 20000:
        print(response)
        # do something with result
    else:
        print("error. Code: %d Message: %s" % (response["status_code"], response["status_message"]))