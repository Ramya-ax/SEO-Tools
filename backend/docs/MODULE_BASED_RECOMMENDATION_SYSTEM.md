🧠 Prompt: Implement Module-Based Recommendation System

You are working on an AI-powered SEO Tracking Platform.

The backend already stores SEO insights in a persistent state per domain.

This includes:

overall_strategy

page_analysis

product_analysis

keyword_data

competitor_gaps

The frontend dashboard is evolving from a static status UI into a guided SEO improvement system.

Your task is to implement a Module-Based Recommendation Engine that dynamically provides SEO improvement suggestions based on which module the user selects.

🎯 Objective

When the user clicks a module in the dashboard (e.g., Strategy, Page, Keywords), the system should:

👉 Display recommendations specific to that module.

Instead of:

Checklist ❌

Provide:

Recommended Actions
Priority Actions

🧱 Modules

The recommendation system must support:

strategy
page
product
keywords
gaps
🧠 Behavior

Each module should return:

{
  "recommended_actions": [],
  "priority_actions": [],
  "potential_score_gain": number
}
🪄 Data Source

Extract actions ONLY from:

LLM-generated fix plans stored in:

state.overall_strategy

state.page_analysis

state.product_analysis

state.competitor_gaps

Keyword module can derive from:

Missing or weak keyword coverage.

🧱 Step 1 — Create Service

Create:

core/recommendation_service.py
🧠 Step 2 — Add Generator

Implement:

def generate_module_recommendations(state, module):

    recommendations = []
    priority = []

    if module == "strategy" and state.overall_strategy:
        extract_from_strategy(state, recommendations, priority)

    elif module == "page" and state.page_analysis:
        extract_from_page(state, recommendations, priority)

    elif module == "product" and state.product_analysis:
        extract_from_product(state, recommendations, priority)

    elif module == "gaps" and state.competitor_gaps:
        extract_from_gaps(state, recommendations, priority)

    elif module == "keywords":
        derive_keyword_actions(state, recommendations, priority)

    return {
        "recommended_actions": recommendations[:5],
        "priority_actions": priority[:3],
        "potential_score_gain": estimate_score_gain(module)
    }
🧠 Step 3 — Extractors

Implement extraction helpers:

extract_from_strategy()
extract_from_page()
extract_from_product()
extract_from_gaps()

Each should:

Pull:

fix_plan[].what

from stored reports.

High priority if:

priority == "high"
🧠 Step 4 — Score Gain Estimation
def estimate_score_gain(module):

    mapping = {
        "strategy": 20,
        "page": 20,
        "product": 20,
        "keywords": 20,
        "gaps": 20
    }

    return mapping.get(module, 0)
🌐 Step 5 — New API Endpoint

Add:

GET /project/{domain}/recommendations/{module}

Behavior:

Normalize domain

Load state

Call generator

Return recommendations

🟡 Edge Case

If module not yet completed:

Return:

{
  "message": "Run this module to unlock insights"
}
📦 Example Output
{
  "recommended_actions": [
    "Improve content clarity",
    "Add FAQ schema",
    "Strengthen internal linking"
  ],
  "priority_actions": [
    "Fix missing EEAT signals"
  ],
  "potential_score_gain": 20
}
🔒 Rules

Do NOT modify stored state

Do NOT re-run LLM

Use existing data only

🚀 Outcome

This enables:

Clickable modules → Dynamic SEO guidance

Turning the dashboard into:

An SEO Coach, not a monitor.

End Prompt