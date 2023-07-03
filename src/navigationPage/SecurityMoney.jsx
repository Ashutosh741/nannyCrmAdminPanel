import React from "react";
import CustomerComp from "../components/CustomerComp";

function SecurityMoney() {
  return (
    <>
      <CustomerComp item={(item) => item.securityAmount !== "0"} />;
    </>
  );
}

export default SecurityMoney;
