import React from "react";
import WithdrawTab from "../components/WithdrawTab";
import Footer from "../components/Footer";
import BasicHeader from "../components/BasicHeader";

function WithdrawalPage() {
  return (
    <div>
      <div className="h-screen px-10 py-4">
        <BasicHeader />
        <WithdrawTab />
      </div>
      <Footer />
    </div>
  );
}

export default WithdrawalPage;
