// src/components/ResumeDocument.jsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottom: "1 solid #ccc",
  },
  paragraph: {
    marginBottom: 4,
    lineHeight: 1.5,
  },
});

export default function ResumeDocument({ formData }) {
  const { job_description, degrees, experience, skills } = formData;

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Resume</Text>

        <View style={styles.section}>
          <Text style={styles.subheader}>Job Description</Text>
          <Text style={styles.paragraph}>{job_description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Degrees</Text>
          <Text style={styles.paragraph}>{degrees}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Experience</Text>
          <Text style={styles.paragraph}>{experience}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Skills</Text>
          <Text style={styles.paragraph}>{skills}</Text>
        </View>
      </Page>
    </Document>
  );
}
