🧠 Prompt: Implement Re-run Analysis with Pre-filled Inputs

You are working on an AI-powered SEO platform that follows a project-based workflow.

Users run SEO modules (e.g., Page Analysis, Product Analysis), receive recommendations, and then improve their website.

Now we want to support an iteration loop:

Run → Improve → Re-run

The goal is to reduce friction by allowing users to re-run analysis without re-entering previous inputs.

🎯 Objective

Implement a Re-run Analysis Feature where:

When the user clicks Re-run Analysis:

They are redirected to the module input page

Previously entered inputs are auto-filled

User can modify inputs if needed

User can re-run analysis easily

🧱 Step 1 — Extend SEO State Model

Update:

SEOState

Add:

module_inputs: dict = {}

Structure:

module_inputs: {
  "product": {...},
  "page": {...},
  "strategy": {...}
}
🧱 Step 2 — Store Inputs on Module Run

Whenever a module is executed, store the inputs used.

Example:

Product Analysis:

state.module_inputs["product"] = {
    "domain": user.Domain_URL,
    "product_url": user.Product_Page_URL,
    "competitors": user.competitors,
    "target_audience": user.target_audience,
    "goals": user.goals,
    "previous_strategy": user.previous_strategy
}

Page Analysis:

state.module_inputs["page"] = {
    "domain": user.Domain_Url,
    "competitors": user.Comp_Url
}

Save alongside report.

🧱 Step 3 — Create API to Fetch Inputs

Add new endpoint:

GET /projects/{project_id}/module-inputs/{module}

Behavior:

Load project

Resolve domain

Load state

Return stored inputs

Response:

{
  "inputs": {...}
}
🧱 Step 4 — Dashboard Integration

Add a:

👉 Re-run Analysis button

For each module.

Example:

Re-run Page Analysis
Re-run Product Analysis

🧱 Step 5 — Redirect Behavior

On click:

Frontend must:

Call:

/projects/{project_id}/module-inputs/{module}

Redirect to module page with:

rerun=true
🧱 Step 6 — Prefill Input Page

On module page load:

If:

rerun=true

Then:

Fetch stored inputs and auto-populate the form.

🧱 Step 7 — Editable Inputs

Prefilled inputs must remain editable.

User can:

Adjust

Add competitors

Update strategy

Modify goals

Then re-run.

🔒 Rules

Do not overwrite stored inputs unless user re-runs

Do not auto-run analysis

Only prefill

🚀 Outcome

Users can:

Improve → Re-run → Iterate

Without friction.

End Prompt