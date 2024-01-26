// import React from 'react'
import BasicHeader from "../components/Headers/BasicHeader";
import Footer from "../components/Footer/Footer";
import SignupSection from "../components/Auth/SignupSection";

function SignupPage() {
  return (
    <div>
      <div className="h-screen ">
        <BasicHeader />

        <SignupSection />
      </div>
      <Footer />
    </div>
  );
}

export default SignupPage;
