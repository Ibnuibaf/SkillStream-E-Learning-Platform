// import React from 'react'
import BasicHeader from "../components/Headers/BasicHeader";
import Footer from "../components/Footer/Footer";
import Landing from "../components/Common/Landing";

function LandingPage() {
  return (
    <div >
      <div className="">
        <BasicHeader />
      </div>
      <Landing />
      <Footer/>
    </div>
  );
}

export default LandingPage;
