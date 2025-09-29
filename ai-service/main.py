# ai-service/main.py
import uvicorn
import spacy
from fastapi import FastAPI
from transformers import pipeline
from typing import Dict 

from models import TextInput, EntitiesOut,Entity , RelationsOut # Import the schemas

# --- GLOBAL MODEL LOADING (Executes only once at startup) ---
# 1. Summarization Pipeline (for 'Actionable Insight Summary')
try:
    SUMMARIZER = pipeline("summarization", model="facebook/bart-large-cnn")
except Exception as e:
    # Fallback to a simpler model or raise error if model loading fails
    print(f"Failed to load BART model: {e}. Using a simpler one.")
    SUMMARIZER = pipeline("summarization")

# 2. SpaCy Model (for Named Entity Recognition)
NLP_SPACY = spacy.load("en_core_web_lg")

app = FastAPI(title="BioAstra NLP Microservice", version="1.0.0")

# --- ENDPOINTS ---

@app.post("/summarize", response_model=Dict[str, str])
async def get_summary(input_data: TextInput):
    """Generates a concise, actionable summary from publication text."""
    result = SUMMARIZER(
        input_data.text,
        max_length=input_data.max_length,
        min_length=input_data.min_length,
        do_sample=False
    )
    return {"summary": result[0]['summary_text']}

@app.post("/extract-entities", response_model=EntitiesOut)
async def extract_entities(input_data: TextInput):
    """Extracts biological/environmental entities from text."""
    doc = NLP_SPACY(input_data.text)
    entities = []
    # Simplified extraction, focusing on common NER labels
    for ent in doc.ents:
        entities.append(
            Entity(text=ent.text, label=ent.label_, start_char=ent.start_char, end_char=ent.end_char)
        )
    return EntitiesOut(entities=entities)

# NOTE: Relation Extraction (/extract-relations) is complex and requires specialized
# fine-tuned models, but the endpoint structure would be similar to above.
# The Node.js controller would call this to get structured data for Neo4j.

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)