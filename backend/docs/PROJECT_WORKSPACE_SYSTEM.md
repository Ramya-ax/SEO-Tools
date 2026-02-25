🧠 Prompt: Implement Project-Based Workspace System

You are working on an AI-powered SEO platform.

The backend currently tracks SEO state per domain using JSON files.

We want to upgrade the system into a Project-Based Workspace Model.

This allows users to manage SEO for multiple websites by creating separate projects.

🎯 Objective

Instead of entering a domain each time:

User should:

Create a Project

Assign a Domain to that Project

Run SEO modules within that project

View dashboard tied to that project

Switch between projects

Each project represents:

👉 One website

🧱 Core Concept

Introduce:

Project Layer above SEO State.

Relationship:

Project → Domain → SEO State
🧱 Step 1 — Create Project Model

Create:

core/project_model.py

Add:

class Project(BaseModel):
    project_id: str
    project_name: str
    domain: str
    created_at: datetime
🧱 Step 2 — Project Storage

Create:

core/project_store.py

Store projects in:

data/projects.json

Functions:

create_project(project_name, domain)
get_all_projects()
get_project(project_id)
delete_project(project_id)

Each project must generate:

UUID as project_id
🧱 Step 3 — Domain Binding

Each project must:

Own exactly ONE domain.

On project creation:

Ensure SEO state exists.

If not:

create_project_state(domain)
🧱 Step 4 — Update Existing Module Flow

Modules must now work using:

project_id

Instead of:

domain input

So:

Resolve domain from project first.

🧱 Step 5 — New Endpoints
Create Project
POST /projects

Input:

project_name
domain
Get Projects
GET /projects
Get Project
GET /projects/{project_id}
Get Project Dashboard
GET /projects/{project_id}/dashboard

Must internally:

Load project → resolve domain → load state → compute dashboard

🧱 Step 6 — Project Switching

No backend session needed.

Frontend will:

Switch project_id context.

Backend must support stateless switching.

🧠 Step 7 — Backward Compatibility

Keep existing:

/project/{domain}/dashboard

But new UI should use:

/projects/{project_id}/dashboard
🔒 Rules

Do not break existing state system

Do not change SEO analysis logic

Do not modify recommendation engine

Project is only a wrapper

📦 Example Flow

User creates:

Project: Goutham Jewellers
Domain: gouthamjewellers.com

Backend:

Creates:

project_id: abc123

Now all:

Modules

Dashboard

Recommendations

run via:

project_id
🚀 Outcome

Users can:

Create multiple website projects

Run SEO workflows independently

Switch between projects like ChatGPT chats

End Prompt