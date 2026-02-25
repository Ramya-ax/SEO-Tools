"""
Project Workspace Store
Manages project CRUD operations in data/projects.json
"""
import json
import os
import uuid
from datetime import datetime
from typing import List, Optional

from core.project_model import Project
from core.project_store import create_project as create_seo_state

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
PROJECTS_FILE = os.path.join(DATA_DIR, "projects.json")


def _load_projects_file() -> List[dict]:
    """Load the projects list from disk."""
    if not os.path.exists(PROJECTS_FILE):
        return []
    with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []


def _save_projects_file(projects: List[dict]):
    """Save the projects list to disk."""
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(PROJECTS_FILE, "w", encoding="utf-8") as f:
        json.dump(projects, f, indent=4, default=str)


def create_workspace_project(project_name: str, domain: str) -> Project:
    """Create a new project and ensure SEO state exists for the domain."""
    # Clean domain
    clean_domain = domain.replace("https://", "").replace("http://", "").rstrip("/")

    # Generate UUID
    project_id = str(uuid.uuid4())[:8]

    # Create the project
    project = Project(
        project_id=project_id,
        project_name=project_name,
        domain=clean_domain,
        created_at=datetime.now()
    )

    # Ensure SEO state exists for this domain
    create_seo_state(clean_domain)

    # Save to projects file
    projects = _load_projects_file()
    projects.append(project.model_dump())
    _save_projects_file(projects)

    return project


def get_all_projects() -> List[Project]:
    """Get all projects."""
    projects_data = _load_projects_file()
    return [Project(**p) for p in projects_data]


def get_project(project_id: str) -> Optional[Project]:
    """Get a single project by ID."""
    projects_data = _load_projects_file()
    for p in projects_data:
        if p["project_id"] == project_id:
            return Project(**p)
    return None


def delete_project(project_id: str) -> bool:
    """Delete a project by ID. Does NOT delete the SEO state data."""
    projects_data = _load_projects_file()
    filtered = [p for p in projects_data if p["project_id"] != project_id]
    if len(filtered) == len(projects_data):
        return False  # Not found
    _save_projects_file(filtered)
    return True
