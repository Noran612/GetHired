import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

// Optional: Load custom font (commented out if unavailable locally)
// Font.register({
//   family: "Helvetica-Bold",
//   src: "https://fonts.gstatic.com/s/helvetica/Helvetica-Bold.ttf"
// });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#333"
  },
  header: {
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: "bold"
  },
  title: {
    fontSize: 14,
    color: "#007ACC",
    marginBottom: 5
  },
  contact: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginBottom: 10,
    borderTop: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
    paddingVertical: 4
  },
  contactItem: {
    width: "33%",
    textAlign: "center"
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    borderBottom: "1px solid #007ACC",
    marginBottom: 8
  },
  textBlock: {
    marginBottom: 6,
    lineHeight: 0.8
  },
  jobHeader: {
    fontWeight: "bold",
    marginBottom: 2
  },
  bulletList: {
    marginLeft: 10,
    marginBottom: 10
  },
  bulletItem: {
    marginBottom: 2
  }
});

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>Software Developer</Text>
        <View style={styles.contact}>
          <Text style={styles.contactItem}>{data.email}</Text>
          <Text style={styles.contactItem}>{data.linkedin}</Text>
          <Text style={styles.contactItem}>{data.github}</Text>
        </View>
      </View>

      {/* About Me */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUMMARY</Text>
        <Text style={styles.textBlock}>{data.about_me}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {Array.isArray(data.experience) ? (
          data.experience.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.jobHeader}>
                {item.position} | {item.company} ({item.years})
              </Text>
              <View style={styles.bulletList}>
                {item.achievements?.map((ach, idx) => (
                  <Text key={idx} style={styles.bulletItem}>• {ach}</Text>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.textBlock}>No experience data available.</Text>
        )}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {Array.isArray(data.degrees) ? (
            data.degrees.map((deg, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
                <Text style={styles.jobHeader}>
                {deg.degree} | {deg.institution} ({deg.years})
                </Text>
                {deg.description && <Text style={styles.textBlock}>{deg.description}</Text>}
            </View>
            ))
        ) : (
            <Text style={styles.textBlock}>{data.degrees}</Text>
        )}
        </View>


      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <Text style={styles.textBlock}>{data.skills}</Text>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
