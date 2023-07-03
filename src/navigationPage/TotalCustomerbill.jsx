import React from "react";
import CustomerComp from "../components/CustomerComp";

function TotalCustomerbill() {
  return (
    <>
      <CustomerComp item={(item) => item.totalCustomerBill !== "0"} />;
    </>
  );
}

export default TotalCustomerbill;
