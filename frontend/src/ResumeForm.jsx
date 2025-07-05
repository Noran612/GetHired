import React, { useState } from "react";
import TextAreaField from "../src/Components/TextAreaField";
import SubmitButton from "../src/Components/SubmitButton";
import ResumePreview from "../src/Components/ResumePreview";
import InputField from "../src/Components/InputField"; // Assuming you have an InputField component
import "../src/style.css"; // Assuming you have a CSS file for styles

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    linkedin: "",
    github: "",
    job_description: "",
    degrees: "",
    experience: "",
    skills: ""
  });

 

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   data.append("name", formData.name); // You can replace this with user input
  //   data.append("age", formData.age);     // Same here
  
  //   data.append("job_description", formData.job_description);
  //   data.append("degrees", formData.degrees);
  //   data.append("experience", formData.experience);
  //   data.append("skills", formData.skills);
  
  //   try {
  //     const response = await fetch("http://localhost:8000/match-resume/", {
  //       method: "POST",
  //       body: data,
  //     });
  
  //     const result = await response.json();
  //     alert("Relevant Resume Data:\n\n" + result.result);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Something went wrong.");
  //   }
  // };
  
  const [resumeData, setResumeData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);
  
    try {
      const response = await fetch("http://localhost:8000/match-resume/", {
        method: "POST",
        body: data,
      });
  
      const json = await response.json();
      const parsed = JSON.parse(json.result);  // <--- Important: Parse the JSON string
      setResumeData(parsed);
    } catch (err) {
      console.error(err);
      alert("Failed to generate resume.");
    }
  };
  
  return (
    <div className="form-container">
      <h1 className="form-title">Resume Adapter</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Enter your name"
          name="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Enter your age (Years)"
          name="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <InputField
          label="Enter your email address"
          name="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Enter the link to your linkedIn profile"
          name="Linkedin"
          value={formData.linkedin}
          onChange={handleChange}
        />
        <InputField
          label="Enter the link to your gitHub profile"
          name="Github"
          value={formData.github}
          onChange={handleChange}
        />
        <TextAreaField
          label="Copy and paste the job description"
          name="Job Description"
          value={formData.job_description}
          onChange={handleChange}
        />
        <TextAreaField
          label="Explain your degrees(e.g., B.Tech in Computer Science from XYZ University, 2018-2022) and key achievements"
          name="Degrees"
          value={formData.degrees}
          onChange={handleChange}
        />
        <TextAreaField
          label="Explain your work experience (e.g., Software Engineer at ABC Corp, 2022-Present, Key Achievements: Developed X feature, Improved Y process)"
          name="Experience"
          value={formData.experience}
          onChange={handleChange}
        />
        <TextAreaField
          label="Enter your skills (e.g., Python, React, Machine Learning)"
          name="Skills"
          value={formData.skills}
          onChange={handleChange}
        />
        <SubmitButton text="Generate PDF" />
        
      </form>
      {resumeData && (
  <div className="resume-preview-container">
    <ResumePreview resumeData={resumeData} />
  </div>
)}

      
    </div>
  );
}
