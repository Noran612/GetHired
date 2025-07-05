import React, { useEffect, useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import "../style.css"; // ensure this file includes your global styles

export default function ResumePreview({ resumeData }) {
  const previewRef = useRef(null);

  useEffect(() => {
    if (resumeData && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [resumeData]);

  if (!resumeData) return null;

  return (
    <div className="preview-container" ref={previewRef}>
      <h2 className="preview-title">Resume Preview</h2>
      <p><strong>Name:</strong> {resumeData.name}</p>
      <p><strong>Age:</strong> {resumeData.age}</p>
      <p><strong>Email:</strong> {resumeData.email}</p>
      <p><strong>LinkedIn:</strong> {resumeData.linkedin}</p>
      <p><strong>GitHub:</strong> {resumeData.github}</p>
      <p><strong>About Me:</strong> {resumeData.about_me}</p>

      <div>
        <strong>Degrees:</strong>
        {Array.isArray(resumeData.degrees) ? (
          resumeData.degrees.map((deg, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <p><strong>{deg.degree}</strong> at <strong>{deg.institution}</strong> ({deg.years})</p>
              {deg.description && <p>{deg.description}</p>}
            </div>
          ))
        ) : (
          <p>{resumeData.degrees}</p>
        )}
      </div>

      <div>
        <strong>Experience:</strong>
        {Array.isArray(resumeData.experience) ? (
          resumeData.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <p><strong>{exp.position}</strong> at <strong>{exp.company}</strong> ({exp.years})</p>
              <ul>
                {exp.achievements.map((ach, j) => (
                  <li key={j}>{ach}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>{resumeData.experience}</p>
        )}
      </div>

      <div>
        <strong>Skills:</strong>
        {Array.isArray(resumeData.skills) ? (
          <ul>
            {resumeData.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>{resumeData.skills}</p>
        )}
      </div>

      <PDFDownloadLink
        document={<ResumePDF data={resumeData} />}
        fileName={`${resumeData.name}_resume.pdf`}
      >
        {({ loading }) =>
          loading ? (
            <button className="button-submit">Preparing PDF...</button>
          ) : (
            <button className="button-submit">Download PDF</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
