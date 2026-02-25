🎯 Objective

Transform the system from:

Stateless Analysis Engine ❌

into:

SEO Tracking Engine with Memory ✅

So every module:

Runs → Generates insights → Updates project SEO state

🏗️ Architecture to Introduce

Implement a Project-Based SEO State Layer

1. Create New Folder

Create:

core/

Inside it create:

seo_state.py
project_store.py
state_service.py
2. SEO State Model

Create a persistent state object that represents SEO journey of a domain.

Create in seo_state.py:

class SEOState(BaseModel):
    domain: str
    
    overall_strategy: dict | None = None
    page_analysis: dict | None = None
    product_analysis: dict | None = None
    
    keyword_data: list = []
    competitor_gaps: list = []
    
    issues: list = []
    improvements: list = []
    
    last_updated: datetime | None = None
    
    history: list = []
3. Project Storage (Initial JSON Based)

Create in project_store.py

Functions:

load_project(domain: str) -> SEOState
save_project(state: SEOState)
project_exists(domain: str) -> bool
create_project(domain: str)

Store as:

data/{domain}.json
4. State Service Layer

Create state_service.py

Add helper functions:

update_overall_strategy(domain, report)
update_page_analysis(domain, report)
update_product_analysis(domain, report)
update_keyword_data(domain, report)
update_gap_analysis(domain, report)

Each function should:

Load project state

Update relevant section

Append snapshot to history

Update timestamp

Save project

🔁 Module Integration

Now integrate state updates into existing endpoints WITHOUT changing their output.

A. /Overall_Strategy

After strategy report is generated:

Call:

update_overall_strategy(user.Domain_URL, report)
B. /Page

After page analysis:

update_page_analysis(user.Domain_Url, Anlayisis['page_Analysis'])
C. /Product

After product strategy:

update_product_analysis(user.Product_Page_URL, response)
D. /Shared_Missing_Keywords

After keyword gap generation:

update_gap_analysis(user.Domain_URL, result)
E. Domain Ranking / Keyword Overview

Store in:

update_keyword_data(domain, keyword_dataset)
🧾 History Tracking

Every update must append:

{
    "module": "page_analysis",
    "timestamp": now(),
    "snapshot": report_summary
}

to:

state.history
📊 New Endpoint

Add:

GET /project/{domain}/state

Returns full SEO journey state.

🔒 Requirements

Existing API responses MUST remain unchanged

All modules must still return their original output

State updates must run silently in background

No frontend changes required yet

No DB required (JSON only for now)

🚀 Final Outcome

After implementation:

Each time any module runs:

✔ State is updated
✔ SEO journey is stored
✔ Improvements are trackable
✔ System becomes longitudinal

⚡ Output Expectation

Implement:

SEOState model

Project storage layer

State update service

Module integrations

New dashboard endpoint

Do not modify prompts or SEO logic.