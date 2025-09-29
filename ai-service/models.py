# ai-service/models.py
from pydantic import BaseModel
from typing import List, Dict, Optional

# --- Input Schemas ---
class TextInput(BaseModel):
    """Schema for text sent to the summarizer or entity extractor."""
    text: str
    min_length: Optional[int] = 50
    max_length: Optional[int] = 150

# --- Output Schemas (for entity extraction) ---
class Entity(BaseModel):
    """Represents a single extracted entity."""
    text: str
    label: str  # e.g., 'ORGANISM', 'FACTOR', 'OUTCOME'
    start_char: int
    end_char: int

class EntitiesOut(BaseModel):
    """Response schema for the entity extraction endpoint."""
    entities: List[Entity]
    
# --- Output Schemas (for relation extraction - crucial for the KG) ---
class Relation(BaseModel):
    """Represents a structured relationship for the Knowledge Graph."""
    subject: str
    relation: str  # e.g., 'CAUSES', 'INFLUENCES', 'STUDIED_IN'
    object: str

class RelationsOut(BaseModel):
    """Response schema for the relation extraction endpoint."""
    relations: List[Relation]