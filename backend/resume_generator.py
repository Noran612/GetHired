import pdfkit

def generate_resume_pdf(job_description, degrees, experience, skills):
    html = f"""
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                padding: 40px;
                line-height: 1.6;
            }}
            h1 {{
                text-align: center;
                margin-bottom: 20px;
                color: #333;
            }}
            h2 {{
                color: #444;
                margin-top: 30px;
                border-bottom: 1px solid #ccc;
            }}
        </style>
    </head>
    <body>
        <h1>Resume</h1>
        <h2>Job Description</h2>
        <p>{job_description}</p>
        <h2>Degrees</h2>
        <p>{degrees}</p>
        <h2>Experience</h2>
        <p>{experience}</p>
        <h2>Skills</h2>
        <p>{skills}</p>
    </body>
    </html>
    """

    # Use False to return PDF as bytes
    return pdfkit.from_string(html, False)
