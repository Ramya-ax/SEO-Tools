"""
Module-Based Recommendation Service
Extracts actionable SEO improvement suggestions from stored state data.
"""

from typing import Any, Dict, List


def _safe_get(obj, *keys, default=None):
    """Safely navigate nested dicts/lists."""
    current = obj
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key, default)
        elif isinstance(current, list) and isinstance(key, int) and key < len(current):
            current = current[key]
        else:
            return default
        if current is None:
            return default
    return current


def _extract_fix_plans(data: Any) -> List[Dict]:
    """
    Recursively find all fix_plan items in a nested data structure.
    Returns list of dicts with 'what' and 'priority' keys.
    """
    results = []
    if isinstance(data, dict):
        if "fix_plan" in data and isinstance(data["fix_plan"], list):
            for item in data["fix_plan"]:
                if isinstance(item, dict) and "what" in item:
                    results.append({
                        "action": item.get("what", ""),
                        "priority": item.get("priority", "medium"),
                        "why": item.get("why", ""),
                        "where": item.get("where", ""),
                    })
        for value in data.values():
            results.extend(_extract_fix_plans(value))
    elif isinstance(data, list):
        for item in data:
            results.extend(_extract_fix_plans(item))
    return results


def extract_from_strategy(state, recommendations: List, priority: List):
    """Extract recommendations from overall_strategy data."""
    strategy = state.overall_strategy
    if not strategy:
        return

    # Extract from competetor_gap fix plans
    gaps = strategy.get("competetor_gap", [])
    if isinstance(gaps, list):
        for gap in gaps:
            fix_plans = _extract_fix_plans(gap)
            for fp in fix_plans:
                recommendations.append(fp["action"])
                if fp["priority"] == "high":
                    priority.append(fp["action"])

    # Extract from Stragery steps
    stragery = strategy.get("Stragery", {})
    if isinstance(stragery, dict):
        # Could be a dict of step names -> step objects, or have Months_Plan
        months_plan = stragery.get("Months_Plan", stragery)
        if isinstance(months_plan, dict):
            for step_name, step_data in months_plan.items():
                fix_plans = _extract_fix_plans(step_data)
                for fp in fix_plans:
                    if fp["action"] not in recommendations:
                        recommendations.append(fp["action"])
                        if fp["priority"] == "high" and fp["action"] not in priority:
                            priority.append(fp["action"])
        elif isinstance(months_plan, list):
            for step_data in months_plan:
                fix_plans = _extract_fix_plans(step_data)
                for fp in fix_plans:
                    if fp["action"] not in recommendations:
                        recommendations.append(fp["action"])
                        if fp["priority"] == "high" and fp["action"] not in priority:
                            priority.append(fp["action"])


def extract_from_page(state, recommendations: List, priority: List):
    """Extract recommendations from page_analysis data."""
    page = state.page_analysis
    if not page:
        return

    # 1. Extract from fix_plan items (recursive search)
    fix_plans = _extract_fix_plans(page)
    for fp in fix_plans:
        if fp["action"] not in recommendations:
            recommendations.append(fp["action"])
            if fp["priority"] == "high" and fp["action"] not in priority:
                priority.append(fp["action"])

    # 2. Extract from issues_found arrays (page analysis specific)
    page_sections = ["goal_clarity", "navigation_effectiveness", "eeat_strength",
                     "conversion_intent", "competitor_gap_analysis"]
    for section_key in page_sections:
        section = page.get(section_key, {})
        if not isinstance(section, dict):
            continue

        # Extract issues_found or gaps_identified as recommended actions
        issues = section.get("issues_found", section.get("gaps_identified", []))
        if isinstance(issues, list):
            for issue in issues:
                if isinstance(issue, str) and issue.strip() and issue not in recommendations:
                    recommendations.append(issue.strip())

        # Extract missing_pages as recommendations (navigation section)
        missing = section.get("missing_pages", [])
        if isinstance(missing, list):
            for page_name in missing:
                if isinstance(page_name, str) and page_name.strip() and page_name not in recommendations:
                    recommendations.append(f"Add missing page: {page_name.strip()}")

        # If section scored low (<=4), mark its reasoning as priority
        score = section.get("score", 10)
        if isinstance(score, (int, float)) and score <= 4:
            reasoning = section.get("reasoning", "")
            if reasoning and isinstance(reasoning, str) and len(reasoning) > 20:
                action = f"Fix {section_key.replace('_', ' ')}: {reasoning[:120]}"
                if action not in priority:
                    priority.append(action)



def extract_from_product(state, recommendations: List, priority: List):
    """Extract recommendations from product_analysis data."""
    product = state.product_analysis
    if not product:
        return

    fix_plans = _extract_fix_plans(product)
    for fp in fix_plans:
        if fp["action"] not in recommendations:
            recommendations.append(fp["action"])
            if fp["priority"] == "high" and fp["action"] not in priority:
                priority.append(fp["action"])


def extract_from_gaps(state, recommendations: List, priority: List):
    """Extract recommendations from competitor_gaps data."""
    gaps = state.competitor_gaps
    if not gaps:
        return

    for gap_report in gaps:
        fix_plans = _extract_fix_plans(gap_report)
        for fp in fix_plans:
            if fp["action"] not in recommendations:
                recommendations.append(fp["action"])
                if fp["priority"] == "high" and fp["action"] not in priority:
                    priority.append(fp["action"])


def derive_keyword_actions(state, recommendations: List, priority: List):
    """Derive keyword-related recommendations from available data."""
    # Check if keyword data exists
    if state.keyword_data:
        recommendations.append("Review keyword clustering for content gaps")
        recommendations.append("Target long-tail keyword variations for quick wins")
        recommendations.append("Analyze People Also Ask opportunities")
    else:
        recommendations.append("Run Keyword Research to discover ranking opportunities")
        priority.append("Run Keyword Research to discover ranking opportunities")

    # If strategy has seed keywords, suggest optimization
    if state.overall_strategy:
        seed_keywords = state.overall_strategy.get("Seed_Keyword", [])
        if seed_keywords:
            recommendations.append("Optimize pages for top seed keywords")
            recommendations.append("Build content clusters around high-relevance keywords")

    # Check keyword clusters from strategy
    if state.overall_strategy:
        clusters = state.overall_strategy.get("Keyword_Cluster", [])
        if clusters:
            recommendations.append("Create dedicated landing pages for each keyword cluster")


def estimate_score_gain(module: str) -> int:
    """Estimate potential score gain from completing/improving a module."""
    mapping = {
        "strategy": 20,
        "page": 20,
        "product": 20,
        "keywords": 20,
        "gaps": 20
    }
    return mapping.get(module, 0)


def generate_module_recommendations(state, module: str) -> Dict:
    """
    Generate recommendations for a specific module based on stored state.
    Returns recommended_actions, priority_actions, and potential_score_gain.
    """
    recommendations: List[str] = []
    priority: List[str] = []

    # Check if the module has data
    module_data_map = {
        "strategy": state.overall_strategy,
        "page": state.page_analysis,
        "product": state.product_analysis,
        "keywords": state.keyword_data if state.keyword_data else None,
        "gaps": state.competitor_gaps if state.competitor_gaps else None,
    }

    module_data = module_data_map.get(module)

    # Special: keywords can derive actions even without keyword_data
    if module != "keywords" and not module_data:
        return {
            "module": module,
            "message": "Run this module to unlock insights",
            "recommended_actions": [],
            "priority_actions": [],
            "potential_score_gain": estimate_score_gain(module)
        }

    if module == "strategy":
        extract_from_strategy(state, recommendations, priority)
    elif module == "page":
        extract_from_page(state, recommendations, priority)
    elif module == "product":
        extract_from_product(state, recommendations, priority)
    elif module == "gaps":
        extract_from_gaps(state, recommendations, priority)
    elif module == "keywords":
        derive_keyword_actions(state, recommendations, priority)

    return {
        "module": module,
        "recommended_actions": recommendations[:5],
        "priority_actions": priority[:3],
        "potential_score_gain": estimate_score_gain(module)
    }


def generate_all_recommendations(state) -> Dict:
    """
    Aggregate recommendations from ALL completed modules.
    Returns combined priority_actions and recommended_actions.
    """
    all_recommendations: List[str] = []
    all_priority: List[str] = []

    # Run all extractors
    extract_from_strategy(state, all_recommendations, all_priority)
    extract_from_page(state, all_recommendations, all_priority)
    extract_from_product(state, all_recommendations, all_priority)
    extract_from_gaps(state, all_recommendations, all_priority)
    derive_keyword_actions(state, all_recommendations, all_priority)

    # Calculate total potential gain from incomplete modules
    total_potential = 0
    if not state.overall_strategy:
        total_potential += 20
    if not state.page_analysis:
        total_potential += 20
    if not state.product_analysis:
        total_potential += 20
    if not state.keyword_data:
        total_potential += 20
    if not state.competitor_gaps:
        total_potential += 20

    return {
        "recommended_actions": all_recommendations[:8],
        "priority_actions": all_priority[:5],
        "potential_score_gain": total_potential
    }
