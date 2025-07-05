import React, { useState } from "react";
import ResumeForm from "./ResumeForm";


export default function App() {
  const [showForm, setShowForm] = useState(false);

  const handleGetStartedClick = () => {
    setShowForm(true);
    setTimeout(() => {
      const formSection = document.getElementById("resume-form-section");
      if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="app-container">
      {/* Landing Page Section */}
      <div className={`landing-page ${showForm ? "fade-out" : ""}`}>
        <div className="landing-background"></div>
        <div className="landing-content">
          <h1>Welcome to Resume Adapter</h1>
          <p>Generate your tailored resume in seconds</p>
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </div>

      {/* Resume Form Section */}
      <div
        id="resume-form-section"
        className={`resume-form-container ${showForm ? "visible" : ""}`}
      >
        <ResumeForm />
      </div>
    </div>
  );
}
