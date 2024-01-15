// import React from 'react'
import BasicHeader from "../components/BasicHeader";
import Footer from "../components/Footer";
import LoginSection from "../components/LoginSection";

function LoginPage() {
  return (
    <div className=" ">
      <div className=" h-screen">
        <BasicHeader />
        <LoginSection />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
