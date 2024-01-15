// import React from 'react'
import BasicHeader from "../components/BasicHeader";
import Footer from "../components/Footer";
import SignupSection from "../components/SignupSection";

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
