import React from "react";
import AyaComp from "../components/AyaComp";

function TotalAvailbleWork() {
  return (
    <>
      <AyaComp item={(item) => item.assign == "Not Assign"} />
    </>
  );
}

export default TotalAvailbleWork;
