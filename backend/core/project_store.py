import json
import os
from core.seo_state import SEOState

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")

def get_project_path(domain: str) -> str:
    # Ensure domain is a safe filename
    safe_domain = domain.replace("https://", "").replace("http://", "").replace("/", "_")
    return os.path.join(DATA_DIR, f"{safe_domain}.json")

def project_exists(domain: str) -> bool:
    return os.path.exists(get_project_path(domain))

def create_project(domain: str) -> SEOState:
    if project_exists(domain):
        return load_project(domain)
    
    state = SEOState(domain=domain)
    save_project(state)
    return state

def load_project(domain: str) -> SEOState:
    path = get_project_path(domain)
    if not os.path.exists(path):
        return create_project(domain)
        
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
        return SEOState(**data)

def save_project(state: SEOState):
    os.makedirs(DATA_DIR, exist_ok=True)
    path = get_project_path(state.domain)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(state.model_dump(), f, indent=4, default=str)
