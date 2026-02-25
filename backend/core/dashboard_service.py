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

def compute_trend(history):
    if not history or len(history) < 2:
        return "stable"
    return "improving"

def extract_recent(items, limit=5):
    if not items:
        return []
    return items[-limit:]

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
