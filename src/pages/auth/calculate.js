  // const calculate = (e) => {
  //   e.preventDefault();
  // };

  // const calculate = (e) => {
  //   e.preventDefault();

  //   const { securityAdjustment } = tech;
  //   let { securityAmount, balance, customerbill, amount_received } = tech;

  //   // const customerbill = ayaCost;
  //   let amountReceived = amount_received;

  //   let currentbal;
  //   let status;

  //   if (securityAdjustment === "Adjustment") {
  //     if (balance > 0) {
  //       currentbal =
  //         parseInt(securityAmount) +
  //         parseInt(amountReceived) +
  //         parseInt(balance) -
  //         parseInt(customerbill);
  //       console.log("security amount", securityAmount);
  //       console.log("previous balance", balance);
  //       console.log("customer bill", customerbill);
  //       console.log("ampinte recer", amountReceived);
  //       securityAmount = 0;
  //     } else if (balance < 0) {
  //       currentbal =
  //         parseInt(securityAmount) +
  //         parseInt(amountReceived) -
  //         Math.abs(parseInt(balance) - parseInt(customerbill));
  //       console.log("security amount", securityAmount);
  //       console.log("previous balance", balance);
  //       console.log("customer bill", customerbill);
  //       console.log("ampinte recer", amountReceived);
  //       securityAmount = 0;
  //     }
  //   } else if (securityAdjustment === "payment") {
  //     if (balance > 0) {
  //       currentbal =
  //         (parseInt(amountReceived) +
  //           parseInt(balance) -
  //           parseInt(customerbill)) *
  //         (100 / 100);

  //       console.log("first balance", balance);
  //       console.log("first  bill", customerbill);
  //       console.log("first recer", amountReceived);
  //     } else {
  //       currentbal =
  //         (parseInt(amountReceived) -
  //           Math.abs(parseInt(balance) - parseInt(customerbill))) *
  //         (100 / 100);

  //       console.log("previous balance", balance);
  //       console.log("customer bill", customerbill);
  //       console.log("ampinte recer", amountReceived);
  //       // alert("Select Payment Method");
  //     }
  //   }

  //   if (currentbal > 0) {
  //     status = "Advance";
  //   } else if (currentbal < 0) {
  //     status = "Pending";
  //   } else if (currentbal == 0) {
  //     status = 0;
  //   } else {
  //     status = "";
  //   }

  //   setCurrentBal(currentbal);
  //   setPaymentStatus(status);
  //   setTech({
  //     ...tech,
  //     balance: currentbal,
  //     status: status,
  //     securityAmount: securityAmount,
  //   });

  //   console.log("Current Balance:", currentbal);
  //   console.log("Status:", status);
  //   if (currentbal == 0) {
  //     alert("your balance will be clear");
  //     setTech({
  //       ...tech,
  //       balance: "0",
  //       status: "Not Pending",
  //       securityAmount: securityAmount,
  //     });
  //   }
  // };