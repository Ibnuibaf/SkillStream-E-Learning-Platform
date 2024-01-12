// import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "rgb(59 7 100)",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 10,
    // fontStyle:"Italic"
  },
  image: {
    width: "60%",
    height: "40%",
    marginBottom: 20,
    alignSelf: "center",
  },
});
function Certificate(props: { course: string; user: string ;image:string}) {
  return (
    <Document>
      <Page size={{ width: 842, height: 595 }} style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>SkillStream Certificate</Text>

          <Image
            src={props.image}
            style={styles.image}
          />
          <Text style={styles.content}>Name of candidate: {props.user.toUpperCase()}</Text>
          <Text style={styles.header}>Certificate of Achievement</Text>
          <Text style={styles.content}>
            This is to certify that
            <Text style={{ fontWeight: "bold" }}> {props.user.toUpperCase()} </Text>
            has successfully completed the course in
            <Text style={{ fontStyle: "italic", fontWeight: "bold" }}>
              {" "}
              {props.course}.{" "}
            </Text>
          </Text>
          <Text style={styles.content}>
            We appreciate your future with us!.
          </Text>
          <Text style={styles.footer}>
            Issued by: SkillStream <Text style={{ fontSize: 8 }}>TM</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default Certificate;
