import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.get("/")
def home():
    return {"status": "Indra AI backend running"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    return {
        "reply": "Hello! I’m Indra AI 🙂 Your personal assistant is online."
    }
