from openai import OpenAI
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # FIXED

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/match-resume/")
async def match_resume(
    name: str = Form(...),
    age: str = Form(...),
    email: str = Form(...),
    linkedin: str = Form(...),
    github: str = Form(...),  # Added github field
    job_description: str = Form(...),
    degrees: str = Form(...),
    experience: str = Form(...),
    skills: str = Form(...)
):
#     prompt = f"""
# You are a resume optimization assistant.

# Given the following candidate data:
# Name: {name}
# Age: {age}
# linkedin:{linkedin}
# github: {github} 
# email:{email} 
# Degrees: {degrees}
# Experience: {experience}
# skills: {skills}

# And this job description:
# {job_description}

# Return a JSON object containing only the degrees and experience and skills that are relevant to the job description. The structure should be:

# {{
#   "name": "{name}",
#     "age": "{age}",
#     "email": "{email}",
#     "linkedin": "{linkedin}",
#     github: "{github}",
#   "degrees": "...",
#   "experience": "..."
#   "skills": "..."
# }}

#     """
    
#     prompt = f"""
# You are a resume optimization assistant.

# Given the following candidate data:
# Name: {name}
# Age: {age}
# Email: {email}
# LinkedIn: {linkedin}
# GitHub: {github}
# Degrees: {degrees}
# Experience: {experience}
# Skills: {skills}

# And this job description:
# {job_description}

# Your task is:
# 1. Extract only the degrees, experience, and skills that are **relevant to the job description**.
# 2. Write a short and professional **About Me** paragraph that highlights the candidate’s background and motivation based on the job description.

# Return a JSON object in the following structure:

# {{
#   "name": "{name}",
#   "age": "{age}",
#   "email": "{email}",
#   "linkedin": "{linkedin}",
#   "github": "{github}",
#   "about_me": "...",
#   "degrees": "...",
#   "experience": "...",
#   "skills": "..."
# }}
# """

#     prompt = f"""
# You are a resume optimization assistant.

# Given the following candidate data:
# Name: {name}
# Age: {age}
# Email: {email}
# LinkedIn: {linkedin}
# GitHub: {github}
# Degrees: {degrees}
# Experience: {experience}
# Skills: {skills}

# And this job description:
# {job_description}

# Your tasks:
# 1. Extract only the **degrees, experience, and skills** that are **relevant to the job description**.
# 2. Improve the grammar and phrasing of any poorly written or vague entries.
# 3. Write a short and professional **"About Me"** paragraph that highlights the candidate’s background and motivation based on the job description.
# 4. Format the **Experience** section in this structure:

# [
#   {{
#     "position": "...",
#     "company": "...",
#     "years": "...",
#     "achievements": [
#       "...",
#       "...",
#       ...
#     ]
#   }},
#   ...
# ]

# Return a single JSON object like this:

# {{
#   "name": "{name}",
#   "age": "{age}",
#   "email": "{email}",
#   "linkedin": "{linkedin}",
#   "github": "{github}",
#   "about_me": "...",
#   "degrees": "...",
#   "experience": [...],  # structured as above
#   "skills": "..."
# }}
# """
    prompt = f"""
You are a resume optimization assistant.

Given the following candidate data:
Name: {name}
Age: {age}
Email: {email}
LinkedIn: {linkedin}
GitHub: {github}
Degrees: {degrees}
Experience: {experience}
Skills: {skills}

And this job description:
{job_description}

Your tasks:
1. Extract only the **degrees, experience, and skills** that are **relevant to the job description**.
2. Improve the grammar and phrasing of any poorly written or vague entries.
3. Write a short and professional **"About Me"** paragraph that highlights the candidate’s background and motivation based on the job description.
4. Format the **Experience** section as a list of structured entries:

[
  {{
    "position": "...",
    "company": "...",
    "years": "...",
    "achievements": [
      "...",
      "...",
      ...
    ]
  }},
  ...
]

5. Format the **Degrees** section as a list of structured entries:

[
  {{
    "degree": "...",
    "institution": "...",
    "years": "...",
    "description": "..."  # optional
  }},
  ...
]

Return a single JSON object with the following structure:

{{
  "name": "{name}",
  "age": "{age}",
  "email": "{email}",
  "linkedin": "{linkedin}",
  "github": "{github}",
  "about_me": "...",
  "degrees": [...],      # structured list as above
  "experience": [...],   # structured list as above
  "skills": "..."
}}
"""



    response = client.chat.completions.create(  # FIXED
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You filter resume data to match a job description."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return {"result": response.choices[0].message.content}
