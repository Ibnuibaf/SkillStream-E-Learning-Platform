// import React from 'react'
import BasicHeader from "../components/Headers/BasicHeader";
import Footer from "../components/Footer/Footer";
import LoginSection from "../components/Auth/LoginSection";

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
