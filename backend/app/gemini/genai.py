from dotenv import load_dotenv
load_dotenv()

import google.generativeai as genai
import os
import json

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-3.1-pro-preview")

def build_prompt(prediction, contributions):
    formatted = "\n".join(
        [f"{k}: {round(v, 2)}" for k, v in contributions.items()]
    )

    return f"""
You are an academic performance advisor AI.

A student has a predicted exam score of {round(prediction, 2)}/100.

Feature contributions (positive = good, negative = needs improvement):

{formatted}

Tasks:
1. Identify top 3 weaknesses
2. Identify top 2 strengths
3. Provide actionable recommendations

Return STRICT JSON in this format:
{{
  "weaknesses": [
    {{"feature": "", "impact": "", "advice": ""}}
  ],
  "strengths": [
    {{"feature": "", "reason": ""}}
  ],
  "suggestions": [
    {{
      "title": "",
      "priority": "High | Medium | Low",
      "expected_impact": "",
      "action_steps": []
    }}
  ]
}}

Rules:
- No extra text
- No markdown
- Only valid JSON
"""

def get_ai_suggestions(prediction, contributions):
    prompt = build_prompt(prediction, contributions)

    try:
        response = model.generate_content(prompt)
        text = response.text

        # Clean response (important)
        text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini error:", e)
        return None