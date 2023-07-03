import React from "react";
import AyaComp from "../components/AyaComp";

function TotalAyaPayment() {
  return (
    <>
      <AyaComp item={(item) => item.totalAyapaid !== "0"} />
    </>
  );
}

export default TotalAyaPayment;
