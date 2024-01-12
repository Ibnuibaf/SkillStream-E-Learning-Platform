// import React from 'react'

import Certificate from "../components/Certificate";
import { PDFViewer } from "@react-pdf/renderer";

function CertificatePage() {
  return (
    <PDFViewer className="min-h-screen min-w-full">
      <Certificate user={""} course=""/>
    </PDFViewer>
  );
}

export default CertificatePage;
