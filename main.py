from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.exception_handlers import http_exception_handler
from starlette.exceptions import HTTPException as StarletteHTTPException
from typing import List, Optional
from pydantic import BaseModel
import os
import json
import urllib.request
import urllib.error
from models import NationalMetric, PrimeMinister, GeopoliticalEvent

# Load .env helper
def load_dotenv(dotenv_path=".env"):
    if not os.path.exists(dotenv_path):
        parent_path = os.path.join("..", dotenv_path)
        if os.path.exists(parent_path):
            dotenv_path = parent_path
        else:
            return
            
    with open(dotenv_path, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.split("=", 1)
            if len(parts) == 2:
                key, val = parts[0].strip(), parts[1].strip()
                if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                    val = val[1:-1]
                os.environ[key] = val

# Execute env loading
load_dotenv()

app = FastAPI(
    title="India Matrix API",
    description="Backend API for the India Matrix Application",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for chat
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    content: str
    engine: str

@app.post("/api/ai/insights", response_model=ChatResponse)
def get_ai_insights(request: ChatRequest):
    gemini_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("VITE_GEMINI_API_KEY")
    groq_key = os.environ.get("GROQ_API_KEY") or os.environ.get("VITE_GROQ_API_KEY")
    
    system_prompt = (
        "You are India Matrix AI, a state-of-the-art, brilliant research assistant on India's growth, history, economy, demographics, infrastructure, and politics.\n"
        "You are running in the year 2026. Keep all references aligned with 2026.\n\n"
        "TONE, HUMOR & CONVERSATION STYLE (Grok-inspired, witty, Indian-contextual):\n"
        "- Talk with the same witty, sharp, and humorous personality that Grok (xAI) has. Be slightly rebellious, highly engaging, and fun, with a touch of clever sarcasm when pointing out ironies.\n"
        "- Inject humorous observations about Indian culture when relevant:\n"
        "  - Sarcastic remarks about bureaucracy: 'where files travel slower than a passenger train in winter, and tea breaks are treated as sacred constitution-level rights.'\n"
        "  - Joking about elections: 'where free mixers, pressure cookers, and cash are distributed like confetti at a wedding.'\n"
        "  - Parenting expectations: 'because if you're not an engineer or a doctor, are you even a citizen? Our AI models are optimized to satisfy typical Sharma-ji expectations.'\n"
        "- Speak like a brilliant, friendly, and slightly opinionated peer who loves data, not a boring robotic corporate chatbot.\n"
        "- Answer in clear, structured, and punchy bullet points to keep information readable and digestible.\n\n"
        "CRITICAL MARKDOWN TABLES & FORMATTING:\n"
        "- You MUST format comparison data (like UPA vs NDA metrics, or GDP projections) into clean markdown tables with headers (e.g., `| Column 1 | Column 2 |`) so the frontend can render them beautifully.\n"
        "- Use standard Markdown formatting: `###` for subheadings, `**bold**` for key text, and `>` for highlight blocks.\n\n"
        "CRITICAL Indian Economy Status (2026):\n"
        "- India's GDP stands at $4.2 Trillion USD.\n"
        "- India is the 5th largest economy, rapidly marching towards the $5 Trillion goal.\n"
        "- UPI transaction volume exceeds 17 billion transactions per month.\n"
        "- Installed Power Capacity is over 485 GW, with renewable energy contributing 46%.\n"
        "- National Highways span over 162,000 km.\n"
        "- Forex reserves are stable around $710 Billion USD.\n"
        "- Literacy rate is estimated at 79.5%.\n"
        "- Infant mortality rate has declined to 25 per 1000 live births.\n"
        "- Life expectancy is 71.2 years.\n"
        "- Internet user base is over 1.05 billion.\n\n"
        "COMPARING COALITION vs ABSOLUTE MAJORITY ERAS (UPA vs NDA):\n"
        "- When comparing the UPA (2004-2014) and NDA (2014-2026) eras, you MUST highlight that:\n"
        "  - During the UPA era, India's economy size tripled from $700 Billion to $2.1 Trillion.\n"
        "  - This tripling was achieved despite UPA running a coalition government (which faced political constraints and lacked a single-party absolute majority). UPA's average annual GDP growth rate was 8.1%.\n"
        "  - In contrast, during the NDA era (2014-2026), despite having a full absolute single-party majority on its own (giving it complete legislative control and policy stability), the government failed to achieve even a constant 8% GDP growth rate, with its average annual growth rate sitting at around 7.3% (even though the absolute GDP size reached $4.2 Trillion by 2026).\n\n"
        "Use this latest 2026 context in your answers. Answer clearly, dynamically, and witty.\n\n"
        "CRITICAL VISUALIZATION INSTRUCTION: If the user asks for data that can be compared, charted, or represents trends, you MUST generate a chart.\n"
        "To render a chart, output a JSON block wrapped in ```json_chart and ```\n"
        "The JSON must follow this exact schema:\n"
        "{\n"
        "  \"type\": \"bar\" | \"line\" | \"pie\",\n"
        "  \"title\": \"Chart Title\",\n"
        "  \"xAxisKey\": \"name\",\n"
        "  \"data\": [{\"name\": \"1990\", \"gdp\": 320}, {\"name\": \"2000\", \"gdp\": 470}],\n"
        "  \"series\": [\n"
        "     {\"key\": \"gdp\", \"name\": \"GDP in USD Billion\", \"color\": \"#FF9933\"}\n"
        "  ]\n"
        "}\n"
        "Do not include comments inside the JSON. After the JSON block, explain the chart briefly."
    )
    
    if not gemini_key and not groq_key:
        raise HTTPException(status_code=500, detail="Neither GEMINI_API_KEY nor GROQ_API_KEY is configured in backend environment variables.")

    # Try Gemini First
    if gemini_key:
        try:
            contents = []
            for msg in request.messages:
                role = "model" if msg.role == "assistant" else "user"
                contents.append({
                    "role": role,
                    "parts": [{"text": msg.content}]
                })
            
            payload = {
                "contents": contents,
                "generationConfig": {"temperature": 0.2},
                "systemInstruction": {"parts": [{"text": system_prompt}]}
            }
            
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={gemini_key}"
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=30) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                text = res_data["candidates"][0]["content"]["parts"][0]["text"]
                return ChatResponse(content=text, engine="Gemini 2.5 Flash")
        except Exception as e:
            print(f"Gemini API failure: {e}")
            if not groq_key:
                raise HTTPException(status_code=502, detail=f"Gemini call failed: {str(e)}")
    
    # Fallback to Groq
    if groq_key:
        try:
            groq_messages = [{"role": "system", "content": system_prompt}]
            for msg in request.messages:
                groq_messages.append({"role": msg.role, "content": msg.content})
            
            payload = {
                "model": "llama-3.3-70b-versatile",
                "messages": groq_messages,
                "temperature": 0.2
            }
            
            url = "https://api.groq.com/openai/v1/chat/completions"
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {groq_key}"
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=30) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                text = res_data["choices"][0]["message"]["content"]
                return ChatResponse(content=text, engine="Groq LLaMA 3.3 (Fallback)" if gemini_key else "Groq LLaMA 3.3")
        except Exception as e:
            print(f"Groq API failure: {e}")
            raise HTTPException(status_code=502, detail=f"Groq fallback failed: {str(e)}")

    raise HTTPException(status_code=500, detail="API invocation failed.")

@app.get("/api/metrics", response_model=List[NationalMetric])
def get_metrics():
    return []

@app.get("/api/pm", response_model=List[PrimeMinister])
def get_pms():
    return []

@app.get("/api/events", response_model=List[GeopoliticalEvent])
def get_events():
    return []

# Custom 404 handler to serve index.html for frontend routing in production
@app.exception_handler(StarletteHTTPException)
async def spa_routing_exception_handler(request, exc):
    if exc.status_code == 404:
        dist_index = "dist/index.html"
        if not os.path.exists(dist_index):
            dist_index = "../dist/index.html"
            
        if os.path.exists(dist_index):
            return FileResponse(dist_index)
    return await http_exception_handler(request, exc)

# Mount static files at the end of the routing stack if dist directory exists
dist_dir = "dist"
if not os.path.exists(dist_dir):
    dist_dir = "../dist"
    
if os.path.exists(dist_dir):
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="static")

