🧠 Prompt: Implement SEO Dashboard API Layer (Backend)

You are working on an existing FastAPI-based AI SEO system.

The system already has:

✔ Persistent SEO State Layer
✔ JSON-based project memory
✔ State updates across modules
✔ Endpoint: /project/{domain}/state

Your task is to implement a Dashboard API Layer that converts raw SEO state into frontend-ready insights.

⚠️ Do NOT modify existing endpoints
⚠️ Do NOT change response structures
⚠️ Do NOT modify analysis logic

Only build a derived dashboard layer.

🎯 Objective

Transform:

Raw SEO state ❌

into:

Actionable dashboard insights ✅

The dashboard should summarize:

SEO Score

Module Coverage

Issues

Improvements

Trend

Last Updated

🧱 Step 1 — Create New Service

Create:

core/dashboard_service.py
🧠 Step 2 — Add Dashboard Computation

Inside dashboard_service.py

Implement:

def compute_dashboard(state):
    seo_score = calculate_seo_score(state)
    issues = extract_recent(state.issues)
    improvements = extract_recent(state.improvements)
    trend = compute_trend(state.history)

    module_status = {
        "strategy": state.overall_strategy is not None,
        "page": state.page_analysis is not None,
        "product": state.product_analysis is not None,
        "keywords": len(state.keyword_data) > 0,
        "gaps": len(state.competitor_gaps) > 0
    }

    return {
        "seo_score": seo_score,
        "issues": issues,
        "improvements": improvements,
        "trend": trend,
        "modules": module_status,
        "last_updated": state.last_updated
    }
🧮 Step 3 — Add Score Engine
def calculate_seo_score(state):
    score = 0

    if state.overall_strategy:
        score += 20

    if state.page_analysis:
        score += 20

    if state.product_analysis:
        score += 20

    if state.keyword_data:
        score += 20

    if state.competitor_gaps:
        score += 20

    return score
📈 Step 4 — Add Trend Logic
def compute_trend(history):
    if not history or len(history) < 2:
        return "stable"
    return "improving"
🪄 Step 5 — Add Helper
def extract_recent(items, limit=5):
    if not items:
        return []
    return items[-limit:]
🌐 Step 6 — Add New Endpoint

Modify bin/main.py

Import:

from core.dashboard_service import compute_dashboard
from core.project_store import load_project

Add:

@app.get("/project/{domain:path}/dashboard")
async def project_dashboard(domain: str):
    try:
        domain = domain.replace("https://", "").replace("http://", "").rstrip("/")
        state = load_project(domain)

        dashboard = compute_dashboard(state)

        return dashboard

    except Exception as e:
        logger.error(f"Dashboard fetch failed: {e}")
        return {"error": str(e)}
🔒 Requirements

Do not modify /project/{domain}/state

Do not modify existing state structure

Do not change any SEO analysis logic

Dashboard must be derived from state only

📦 Expected Output

Example response:

{
  "seo_score": 80,
  "issues": [],
  "improvements": [],
  "trend": "improving",
  "modules": {
    "strategy": true,
    "page": true,
    "product": false,
    "keywords": true,
    "gaps": true
  },
  "last_updated": "2026-02-24"
}
🚀 Outcome

This API will allow frontend to:

Show SEO health

Track module coverage

Display recent issues

Show improvements

Visualize growth trend

without parsing raw state.

End of Prompt