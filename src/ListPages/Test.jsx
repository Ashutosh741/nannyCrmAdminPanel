// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { URL } from "../Url";

// const Test = () => {
//   const [totalCustomerBill, setTotalCustomerBill] = useState(0);

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const response = await axios.get(`${URL}/customerreg/`);
//         const customerData = response.data.data;

//         // Calculate total customer bill
//         let totalBill = 0;
//         customerData.forEach((customer) => {
//           customer.customerpayment.forEach((payment) => {
//             totalBill += parseInt(payment.customerbill);
//           });
//         });

//         console.log("totalBill:", totalBill);
//         setTotalCustomerBill(totalBill);
//       } catch (error) {
//         console.error("Error fetching customer data:", error);
//       }
//     };

//     fetchCustomerData();
//   }, []); // Empty dependency array to run the effect only once

//   return (
//     <div>
//       <h2>Total Customer Bill: {totalCustomerBill}</h2>
//       {/* Additional JSX code */}
//     </div>
//   );
// };

// export default Test;

//
