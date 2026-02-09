import requests
import json
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Referer": "https://www.google.com/",
}






payload={
    "Domain_Page":"https://gouthamjewellers.com",
    "Page_URL":"https://gouthamjewellers.com",
    "Competetior_Name":[
    "https://www.sayarjewellerysaidapet.com/",
    "https://www.tarinika.in/",
    "https://www.bhimagold.com/",
    "https://www.efifdiamonds.com/",
    "https://konikajewellery.com/",
],
    "Products_Name":["All types of Jewellery"],
    "Important_Keywords":[
    "Platinum Jewellery",
    "Antique Jewellery",
],
    "Page_Info":"Here’s a **30–40 word SEO-friendly page description** for **gouthamjewellers.com**:**Goutham Jewellers, Chennai offers exquisite pure gold, diamond, platinum and gemstone jewellery with exceptional craftsmanship, timeless designs and trusted heritage — perfect for weddings, gifts and everyday elegance. Shop certified, handcrafted jewellery online now.**"
,
    "Goal":["200% increase in Foot traffic to 1500 people per month by December 2026","Top Local rankings through GMB "," Families and gold investors"],
    "Target_Audience":[" Families and gold investors"],
    "Prevoivs_Strategy_Used_for_Prevois_Month":"categorized he jewellery into type, occasion, gender, by metal, by design. Entique jewellery was categorized according to design and content was optimized.",
    "start_month":"Feb",
    "end_month":"Feb"

}

Kpayload={"Keywords":["organza saree","georgette saree","Mysore silk sarees"]}

Opayload={
    "Domain_URL":"https://gouthamjewellers.com",

    "Competetior_Name":[
    "https://www.sayarjewellerysaidapet.com/",
    "https://www.tarinika.in/",
    "https://www.bhimagold.com/",
    "https://www.efifdiamonds.com/",
    "https://konikajewellery.com/"
],
    "Products_Name":["All types of gold jewellery"],
    "Important_Keywords":["Families and gold investors"],
    "Domain_Description":"Goutham Jewellers is a well-established jewellery brand and online store based in Chennai, India, known for its wide range of fine gold, diamond, gemstone, antique and traditional jewellery collections. The brand features exquisitely crafted pieces, from bridal and festive sets to modern and everyday designs, blending heritage artistry with contemporary style. Their collections include pure gold jewellery, lab-grown diamond pieces, traditional harams, temple-inspired designs, and elegant gemstone ornaments — all handcrafted with precision to appeal to diverse tastes and occasions.",
    "Target_Audience":["Families and gold investors"],
    "Goal":["200% increase in Foot traffic to 1500 people per month by December 2026 & Top Local rankings through GMB "],
    "Current_State_of_SEO":"Average foot traffic - 750 people/Month",
}

response = requests.post(
    url="http://localhost:8000/Month",
    json=payload,                     # ✅ best (auto sets content-type)
    timeout=(30, 500) ,
                    headers=headers                # ✅ (connect timeout 30s, read timeout 5 mins)
)

print(response.status_code)
print(response.text)

file_path = r"C:\Users\wmsys\Music\seo tool\backend\sample.json"
with open(file_path, 'w') as json_file:
   
      print(response.text)

