from datetime import datetime
from typing import Any, Dict
from core.project_store import load_project, save_project

def append_history(state, module_name: str, snapshot: Any):
    state.history.append({
        "module": module_name,
        "timestamp": datetime.now(),
        "snapshot": snapshot
    })
    state.last_updated = datetime.now()

def update_overall_strategy(domain: str, report: Any):
    state = load_project(domain)
    state.overall_strategy = report
    append_history(state, "overall_strategy", report)
    save_project(state)

def update_page_analysis(domain: str, report: Any):
    state = load_project(domain)
    state.page_analysis = report
    append_history(state, "page_analysis", report)
    save_project(state)

def update_product_analysis(domain: str, report: Any):
    state = load_project(domain)
    state.product_analysis = report
    append_history(state, "product_analysis", report)
    save_project(state)

def update_keyword_data(domain: str, keyword_dataset: Any):
    state = load_project(domain)
    state.keyword_data.append(keyword_dataset)
    append_history(state, "keyword_data", keyword_dataset)
    save_project(state)

def update_gap_analysis(domain: str, report: Any):
    state = load_project(domain)
    state.competitor_gaps.append(report)
    append_history(state, "gap_analysis", report)
    save_project(state)

def complete_action(domain: str, action_text: str):
    """Mark an action as completed — moves it to the improvements (Recent Wins) list."""
    state = load_project(domain)
    if action_text not in state.improvements:
        state.improvements.append(action_text)
    state.last_updated = datetime.now()
    save_project(state)
    return {"status": "ok", "action": action_text}

def save_module_inputs(domain: str, module: str, inputs: Dict):
    """Store the inputs used for a module run so they can be prefilled on re-run."""
    state = load_project(domain)
    state.module_inputs[module] = inputs
    state.last_updated = datetime.now()
    save_project(state)

def get_module_inputs(domain: str, module: str) -> Dict:
    """Retrieve stored inputs for a module to prefill the re-run form."""
    state = load_project(domain)
    return state.module_inputs.get(module, {})

