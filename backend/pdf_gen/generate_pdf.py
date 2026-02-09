import json
import os
import html
import pdfkit
from jinja2 import Environment, FileSystemLoader

# -----------------------------
# Configuration
# -----------------------------
WKHTMLTOPDF_PATH = r"C:\Program Files\wkhtmltox-0.12.6-1.mxe-cross-win64\wkhtmltox\bin\wkhtmltopdf.exe"

def generate_pdf_bytes(data: dict) -> bytes:
    """
    Generates a PDF header from the provided JSON data dictionary.
    Returns the PDF content as bytes.
    """
    # Base directory relative to this file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # -----------------------------
    # Data Preparation
    # -----------------------------
    # Extract Goal (force to top)
    goal = data.get("Goal") or data.get("goal") or ""
    
    # Remove Goal from main JSON so it doesn't repeat if iterating
    data_without_goal = {
        key: value for key, value in data.items()
        if key not in ["Goal", "goal"]
    }
    
    # -----------------------------
    # Formatting Specific Logic (Strategy / Roadmap)
    # -----------------------------
    # Detect if we have 'Stragery' name (backend format, dict) or 'roadmap' (frontend format, list)
    strategy_key = next((k for k in data_without_goal.keys() if k in ["Stragery", "Strategy", "roadmap"]), None)
    
    if strategy_key:
        strategy_data = data_without_goal[strategy_key]
        new_strategy = {}
        
        # Helper to format a single step based on its standardized keys (frontend mapping vs backend)
        def process_step(step_item):
            # Normalize keys
            # Frontend: step_number, title, issue, evidence, fix_plan_bullets (list of strings), priority, keywords_to_use
            # Backend: fix_plan (list of dicts), competitor_issue, etc.
            
            fmt = {}
            
            # --- ISSUE ---
            issue = step_item.get("issue") or step_item.get("competitor_issue")
            if issue:
                fmt["Issue"] = html.escape(str(issue))
            
            # --- EVIDENCE ---
            # Frontend string: "Target: ... vs Comp: ..."
            # Backend dict: {target_page:..., competitor_page:...}
            evidence_val = step_item.get("evidence") or step_item.get("evidence_from_scrape")
            if isinstance(evidence_val, str):
                # Valid sanitization first
                safe_ev = html.escape(evidence_val)
                # HTML replacement for bolding
                ev_str = safe_ev.replace("Target:", "<b>Target:</b>").replace("vs Comp:", "<br><b>vs Comp:</b>")
                fmt["Evidence"] = ev_str
            elif isinstance(evidence_val, dict):
                target = html.escape(str(evidence_val.get("target_page", "N/A")))
                comp = html.escape(str(evidence_val.get("competitor_page", "N/A")))
                fmt["Evidence"] = f"<b>Target:</b> {target} <br> <b>vs Comp:</b> {comp}"
                
            # --- FIX PLAN BULLETS ---
            # Frontend: fix_plan_bullets (List[str] already formatted "What: ...")
            # Backend: fix_plan (List[dict])
            
            frontend_bullets = step_item.get("fix_plan_bullets")
            backend_fix = step_item.get("fix_plan")
            
            final_bullets = []
            
            if frontend_bullets and isinstance(frontend_bullets, list):
                for b in frontend_bullets:
                    safe_b = html.escape(str(b))
                    # Apply bolding to labels
                    # "What: content... Why: content..."
                    b_fmt = safe_b.replace("What:", "<b>What:</b>") \
                             .replace("Why:", "<b>Why:</b>") \
                             .replace("Where:", "<b>Where:</b>") \
                             .replace("How:", "<b>How:</b>")
                    final_bullets.append(b_fmt)
                    
            elif backend_fix and isinstance(backend_fix, list):
                for plan in backend_fix:
                    bullet_str = (
                        f"<b>What:</b> {html.escape(str(plan.get('what', '')))} "
                        f"<b>Why:</b> {html.escape(str(plan.get('why', '')))} "
                        f"<b>Where:</b> {html.escape(str(plan.get('where', '')))} "
                        f"<b>How:</b> {html.escape(str(plan.get('how', '')))}"
                    )
                    final_bullets.append(bullet_str)
            
            if final_bullets:
                fmt["Fix Plan Bullets"] = final_bullets
                
            # --- PRIORITY ---
            prio = step_item.get("priority")
            # If backend structure, it's inside fix_plan[0]
            if not prio and backend_fix and len(backend_fix) > 0:
                prio = backend_fix[0].get('priority')
            if prio:
                fmt["Priority"] = html.escape(str(prio))
                
            # --- KEYWORDS ---
            kws = step_item.get("keywords_to_use")
            if not kws and backend_fix:
                 all_kws = []
                 for p in backend_fix:
                     all_kws.extend(p.get("keyywords_to_use", []))
                 kws = list(set(all_kws))
            
            if kws:
                # Rename to clean title or just "Keywords"
                # kws is a list of strings
                fmt["Keywords"] = [html.escape(str(k)) for k in kws]
                
            return fmt

        # If it's a LIST (Frontend 'roadmap'), convert to DICT with Titles as keys
        if isinstance(strategy_data, list):
            for i, step in enumerate(strategy_data):
                try:
                    # Title key
                    title = step.get("title") or f"Step {step.get('step_number', i+1)}"
                    new_strategy[title] = process_step(step)
                except Exception:
                    # Continue best effort
                    pass
        
        # If it's a DICT (Backend 'Stragery'), iterate items
        elif isinstance(strategy_data, dict):
            # Sort by key to ensure Step 1, Step 2, etc. order
            # Simple string sort works for Step 1..9. For 10+, we might need natural sort, 
            # but usually keys are unique enough or we can live with it for this MVP.
            sorted_items = sorted(strategy_data.items())
            for step_key, step_data in sorted_items:
                try:
                    new_strategy[step_key] = process_step(step_data)
                except Exception:
                    pass

        # Replace with new dictionary
        # We rename the key to "Execution Roadmap" for cleaner PDF heading
        del data_without_goal[strategy_key]
        data_without_goal["Execution Roadmap"] = new_strategy

    # -----------------------------
    # Load Jinja template
    # -----------------------------
    env = Environment(
        loader=FileSystemLoader(os.path.join(base_dir, "templates")),
        autoescape=False
    )
    
    template = env.get_template("report.html")
    
    pdf_html = template.render(
        goal=goal,
        data=data_without_goal
    )
    
    # -----------------------------
    # wkhtmltopdf configuration
    # -----------------------------
    config = pdfkit.configuration(wkhtmltopdf=WKHTMLTOPDF_PATH)
    
    # -----------------------------
    # PDF options
    # -----------------------------
    options = {
        "enable-local-file-access": "",
        "encoding": "UTF-8",
        "page-size": "A4",
        "margin-top": "20mm",
        "margin-bottom": "20mm",
        "margin-left": "20mm",
        "margin-right": "20mm",
        "quiet": ""
    }
    
    # -----------------------------
    # Generate PDF
    # -----------------------------
    # output_path=False returns the PDF as bytes
    pdf_content = pdfkit.from_string(
        pdf_html,
        False, 
        configuration=config,
        options=options,
        css=os.path.join(base_dir, "static", "report.css")
    )
    
    return pdf_content

if __name__ == "__main__":
    # Test run
    with open("sample.json", "r", encoding="utf-8") as f:
        sample_data = json.load(f)
    pdf_bytes = generate_pdf_bytes(sample_data)
    with open("final_report_test.pdf", "wb") as f:
        f.write(pdf_bytes)
    print("✅ Test PDF generated: final_report_test.pdf")
