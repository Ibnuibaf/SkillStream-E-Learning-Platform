// import React from 'react'
import BasicHeader from "../components/BasicHeader";
import Footer from "../components/Footer";
import Landing from "../components/Landing";

function LandingPage() {
  return (
    <div >
      <div className="px-10 py-4">
        <BasicHeader />
      </div>
      <Landing />
      <Footer/>
    </div>
  );
}

export default LandingPage;
