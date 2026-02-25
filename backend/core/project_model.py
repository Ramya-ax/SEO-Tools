from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Project(BaseModel):
    project_id: str
    project_name: str
    domain: str
    created_at: datetime
