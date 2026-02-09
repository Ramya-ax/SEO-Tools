from Backend_utlities import scrape_page
import json

url = "https://gouthamjewellers.com"
print(f"Testing scraper on {url}...")
result = scrape_page(url)

print("Scrape Result Keys:", result.keys())
print("Title:", result.get('title'))
print("Word Count:", result.get('word_count'))
print("Headings:", result.get('h1'))
# Print a snippet of text to verify content
print("Text Snippet:", result.get('text', '')[:200])

if result.get('word_count', 0) > 100:
    print("✅ SUCCESS: Content scraped successfully.")
else:
    print("❌ FAILURE: Content seems empty.")
