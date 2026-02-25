from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class SEOState(BaseModel):
    domain: str
    
    overall_strategy: Optional[Dict[str, Any]] = None
    page_analysis: Optional[Dict[str, Any]] = None
    product_analysis: Optional[Dict[str, Any]] = None
    
    keyword_data: List[Any] = []
    competitor_gaps: List[Any] = []
    
    module_inputs: Dict[str, Any] = {}
    
    issues: List[Any] = []
    improvements: List[Any] = []
    
    last_updated: Optional[datetime] = None
    
    history: List[Dict[str, Any]] = []
