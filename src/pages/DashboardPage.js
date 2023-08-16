


import React, { useEffect, useState } from "react";
import adminLayout from "../hoc/adminLayout";
import axios from "axios";
import { URL } from "../Url";
import { useNavigate } from "react-router-dom";
import payment from '../assets/images/payment.png'
import babysitter from '../assets/images/babysitter.png'
import rating from '../assets/images/rating.png'
import ayawork from '../assets/images/aayawork.png'
import paid from '../assets/images/paid.png'
import advanceicon from '../assets/images/advance.png'
import pendingicon from '../assets/images/pending.png'
import salary from '../assets/images/salary.png'
import profitimg from '../assets/images/profit.png'



const DashboardPage = () => {

  const [aya, setAya] = useState([])

  const [customer, setCustomer] = useState([])
  const [assign, setAssign] = useState(0)
  const [pending, setPending] = useState([])
  const [advance, setAdvance] = useState([])
  const [notpending, setNotPending] = useState([])
  // const [not, setNot] = useState([])
  const [totalCustomerbill, setTotalCustomerBill] = useState([])
  const [totalRec, setTotalRec] = useState([])
  const [pendingAmount, setPenidngAmount] = useState([])
  const [ayaEarning, setAyaEarning] = useState([])
  const [securemoney, setSecureMoney] = useState([])
  const [CustomerBill, setCustomerBill] = useState(0);
  const [ayaPayment, setAayaPayment] = useState(0)
  const [profit, setProfit] = useState(0)
  const [amountRec, setAmountRec] = useState(0)
  const [ayaGeneratedBill,setAyaGeneratedBill] = useState('0')
  const [customerNotAssigned,setCustomerNotAssigned] = useState(0);
  const [securityPaid,setSecurityPaid] = useState(0);
  const [ayaPaid,setAyaPaid] = useState(0);
  const [billGenerated,setBillGenerated] = useState(0);

  const navigate = useNavigate();


  const AyaApi = () => {

    axios
      .get(`${URL}/ayareg`)
      .then((res) => {
        setAya(res.data);
        console.log(aya)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

      });
  };
  const CustomerApi = () => {

    axios
      .get(`${URL}/customerreg`)
      .then((res) => {
        setCustomer(res.data);
        console.log(customer)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

      });
  };

  // const assignAya = () => {
  //   axios.get(`${URL}/ayareg/`).then((res) => {

  //     const filteredAya = res.data.data.filter(
  //       (item) => item.assign == "Not Assign"
  //     );
  //     setAssign(filteredAya);

  //   });
  //   console.log(assign);
  // };


  // const assignAya = () => {
  //   axios.get(`${URL}/ayareg/`).then((res) => {
  //     const filteredAya = res.data.data.filter((item) => item.assign === "Not Assign");
  //     setAssign(filteredAya.length);
  //     // console.log(assign)
  //   });
  // };

  const compareDate = (billDate) => {
    const todayDate = new Date();
    // console.log('today date format',todayDate)
    const replaceDateParts = billDate.split('-');
    const compareDate = new Date(replaceDateParts[0], replaceDateParts[1] - 1, replaceDateParts[2],0,0,0);
    // console.log('billDate format',compareDate)

    return todayDate <= compareDate;
}

const compareFromDate = (billDate) => {
  const todayDate = new Date();
  // console.log('today date format',todayDate)
  const replaceDateParts = billDate.split('-');
  const compareDate = new Date(replaceDateParts[0], replaceDateParts[1] - 1, replaceDateParts[2],0,0,0);
  // console.log('billDate format',compareDate)

  return todayDate <= compareDate;
}


// const get_diff_days = (assignedCustomerFromDate) => {
  
//     const toDateParts = new Date();
//     const fromDateParts = assignedCustomerFromDate.split('-');
//     const toDateObj = new Date(`${toDateParts[1]}-${toDateParts[0]}-${toDateParts[2]}`);
//     const fromDateObj = new Date(`${fromDateParts[1]}-${fromDateParts[0]}-${fromDateParts[2]}`);
//     // const leaveTakenDays = parseFloat(leaveTaken);
//     console.log('todate ka format',toDateObj);
//     console.log('fromdate ka format',fromDateObj);


//     if (!isNaN(toDateObj) && !isNaN(fromDateObj)) {
//       const diff = Math.floor((toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 86400));
//       // console.log("difference of date",diff)
//       return diff;
//     } else {
//       console.log('Invalid date or leaveTaken value.');
//       return 0; // Or any other appropriate value to indicate an error.
//     }
// }

const get_diff_days = (billDate) => {
  // Get the current date
  const todayDate = new Date();
  console.log('billdate initial format',billDate);
  // Split the billDate into day, month, and year parts
  const replaceDateParts = billDate.split('-');
  const billDay = parseInt(replaceDateParts[0]);
  const billMonth = parseInt(replaceDateParts[1]) - 1; // JavaScript months are 0-indexed
  const billYear = parseInt(replaceDateParts[2]);

  // Create a Date object for the billDate
  const currentDate = new Date(billYear, billMonth, billDay);

  // Calculate the difference in days
  const timeDifference = todayDate - currentDate; // Difference in milliseconds
  const diffDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  console.log('aaj ka date',todayDate);
  console.log('billdate ka date',currentDate);

  console.log('differnce of days',diffDays)
  return diffDays;
};

// const get_diff_days_between = (billDate,assignedDate) => {
//   // Get the current date
//   // const todayDate = new Date();
//   console.log('billdate initial format',billDate);
//   // Split the billDate into day, month, and year parts
//   const replaceDateParts = billDate.split('-');
//   const billDay = parseInt(replaceDateParts[0]);
//   const billMonth = parseInt(replaceDateParts[1]) - 1; // JavaScript months are 0-indexed
//   const billYear = parseInt(replaceDateParts[2]);

//   const assignDateParts = assignedDate.split('-');
//   const assignDay = parseInt(assignDateParts[0]);
//   const assignMonth = parseInt(assignDateParts[1]) - 1; // JavaScript months are 0-indexed
//   const assignYear = parseInt(assignDateParts[2]);

  

//   // Create a Date object for the billDate
//   const currentDate = new Date(billYear, billMonth, billDay);

//   const todayDate = new Date(assignYear,assignMonth,assignDay);

//   // Calculate the difference in days
//   const timeDifference = todayDate - currentDate; // Difference in milliseconds
//   const diffDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   console.log('aaj ka date',todayDate);
//   console.log('billdate ka date',currentDate);

//   console.log('differnce of days',diffDays)
//   return diffDays;
// };




  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${URL}/customerreg/`);
        const customerData = response.data.data;
        // Calculate total customer bill
        let totalBill = 0;
        let totalRecieved = 0;

        customerData.forEach((customer) => {
          customer.assignedAyaDetails.forEach((payment) => {
            let calc = 0,diffDays = 0;
            if(payment.assignedAyaRate){
              if(payment.assignedAyaToDate){
                const date1 = new Date(payment.assignedAyaFromDate);
                const date2 = new Date(payment.assignedAyaToDate);
                const diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                // console.log("differnece of date of from and to",diffDays);
              }else{
                const date1 = new Date(payment.assignedAyaFromDate);
                const date2 = new Date();
                const diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                // console.log('differnece of today and from date',diffDays);
              }
            }
            calc = diffDays*(payment.assignedAyaRate);
            // console.log('yeh calculated money',calc)
            totalBill += parseInt(calc);
          });
        });
        customerData.forEach((customer) => {
          customer.customerGeneratedInvoice.forEach((payment) => {
            totalRecieved += parseInt(payment.generatedBill);
          });
        });

        // console.log("totalBill:", totalBill);
        setCustomerBill(totalBill);
        setAmountRec(totalRecieved)


        let cnt = 0;
        customerData.forEach((customer) => {
          if (customer.assignedAyaDetails.length <= 0) {
            cnt++;
          } else {
            const reverseData = customer.assignedAyaDetails;
            let len = reverseData.length
        
            if (reverseData.length > 0 && reverseData[len-1].assignedAyaFromDate) {
              if (compareDate(reverseData[len-1].assignedAyaFromDate)) {
                if (reverseData[len-1].assignedAyaToDate && !compareDate(reverseData[len-1].assignedAyaToDate)){
                  cnt++;
                console.log('to date kam hai')

                }else if(reverseData[len-1].assignedAyaToDate){
                  cnt++;
                console.log('to date khaali hi hai')

                }
                // console.log('to date  khaali hi hai')
              }
            }
          }
        });
        // console.log('chala yan hi')
        
        setCustomerNotAssigned(cnt);

        let billGenerated = 0;

      //   customerData.forEach((customer)=>{
      //     let assignedLen = customer.assignedAyaDetails.length;
      //     let assignedData =  customer.assignedAyaDetails;
      //     let invoiceLen = customer.customerGeneratedInvoice.length
      //     let generatedData = customer.customerGeneratedInvoice;
      //     if(len > 0){
      //       let toDate = assignedData.assignedAyaToDate;
      //       console.log('todate value',toDate);
      //       if(!toDate){
      //         if(invoiceLen <= 0){
      //           if(get_diff_days(assignedData.assignedAyaFromDate) > 30){
      //             billGenerated++;
      //           }else if(get_diff_days(generatedData.generatedToDate) > 30){
      //             billGenerated++;
      //           }
      //         }
      //       }else{
      //         if(invoiceLen <= 0 && get_diff_days(generatedData.assignedAyaFromDate) > 30){
      //           billGenerated++;
      //         }else if(get_diff_days_between(generatedData[invoiceLen-1].generatedToDate,assignedData.assignedAyaToDate) > 30){
      //           billGenerated++;
      //         }
      //       }
      //     }
      // })


        customerData.forEach((customer) => {
          // console.log('single customer',customer)
          if(customer.customerGeneratedInvoice.length <= 0){
            let length = customer.assignedAyaDetails.length;
            if(length > 0 && get_diff_days(customer.assignedAyaDetails[length-1].assignedAyaToDate) > 30){
              billGenerated++;
            }
          }else{
            const reverseData = customer.customerGeneratedInvoice;
            let len = reverseData.length

            if(reverseData.length > 0 && reverseData[len-1].generatedToDate){
              // console.log('dekhe to kaise bna hai',get_diff_days(reverseData[0].generatedToDate));
              if(get_diff_days(reverseData[len-1].generatedToDate) > 30){

                billGenerated++;
              }else{
                // console.log('inner customer is assigned')
              }
            }else{
              billGenerated++;

              // console.log('outer customer is assigned')
            }
          }
        });

        setBillGenerated(billGenerated);


        const secureAmt = customerData.reduce((sum, item) => sum + parseInt(item.securityAmount), 0);
        console.log("seekek", secureAmt)
        setSecureMoney(secureAmt)
  
        let securityPaid = 0;
        customerData.forEach((customer)=>{
          if(customer.securityAmount < 2000)securityPaid++;
        })
  
        setSecurityPaid(securityPaid);


      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, []);









  useEffect(() => {
    const fetchaayaPayment = async () => {
      try {
        const response = await axios.get(`${URL}/ayareg/`);
        const customerData = response.data.data;

        // Calculate generated aya bill
        let totalBill = 0;
        let AdminProfit = 0,ayaGeneratedBill=0;

        customerData.forEach((customer) => {
          customer.assignedCustomerDetails.forEach((payment) => {
            let calc = 0,diffDays = 0;
            if(payment.assignedCustomerRate){
              if(payment.assignedCustomerToDate){
                const date1 = new Date(payment.assignedCustomerFromDate);
                const date2 = new Date(payment.assignedCustomerToDate);
                const diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                // console.log("differnece of date of from and to",diffDays);
              }else{
                const date1 = new Date(payment.assignedCustomerFromDate);
                const date2 = new Date();
                const diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                // console.log('differnece of today and from date',diffDays);
              }
            }
            calc = diffDays*(payment.assignedCustomerRate);
            // console.log('yeh calculated money',calc)
            totalBill += parseInt(calc);
          });
        }); 
        setAyaGeneratedBill(totalBill);


        customerData.forEach((customer) => {
          customer.ayaGeneratedInvoice.forEach((payment) => {
            // console.log('aya ka geneerated bill',payment.generatedBill)
            ayaGeneratedBill += parseInt(payment.generatedBill);
          });
        });

        setAayaPayment(ayaGeneratedBill);

        let cnt = 0;
        customerData.forEach((customer) => {
          if (customer.assignedCustomerDetails.length <= 0) {
            cnt++;
          } else {
            const reverseData = customer.assignedCustomerDetails;
            let len = reverseData.length

        
            if (reverseData.length > 0 && reverseData[len-1].assignedCustomerFromDate) {
              if (compareFromDate(reverseData[len-1].assignedCustomerFromDate)) {
                cnt++;
              } else if (reverseData[len-1].assignedCustomerToDate && !compareDate(reverseData[len-1].assignedCustomerToDate)) {
                cnt++;
              }
            }
          }
        });
        

        setAssign(cnt);

        let ayaPaid = 0;
        customerData.forEach((customer) => {
          // console.log('single customer',customer)
          if(customer.ayaGeneratedInvoice.length <= 0 && customer.assignedCustomerDetails.length > 0){
            let length = customer.assignedCustomerDetails.length;
            if(get_diff_days(customer.assignedCustomerDetails[length-1].assignedCustomerFromDate) > 30){
              ayaPaid++;
            }
          }else{
            const reverseData = customer.ayaGeneratedInvoice;
            let len = reverseData.length
            if(reverseData.length > 0 && reverseData[len-1].generatedToDate){
              // console.log('dekhe to kaise bna hai',get_diff_days(reverseData[0].generatedToDate));
              if(get_diff_days(reverseData[len-1].generatedToDate) > 30){

                ayaPaid++;
              }else{
                // console.log('inner customer is assigned')
              }
            }else{
              ayaPaid++;
              // console.log('outer customer is assigned')
            }
          }
        });

        setAyaPaid(ayaPaid);
        // console.log("totalAaauauuapayment:", ayaGeneratedBill);
        // setProfit(AdminProfit)
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchaayaPayment();
  }, []);








  const pendingPayment = () => {
    axios.get(`${URL}/customerreg/`).then((res) => {
      const filteredCustomer = res.data.data.filter((item) => item.status === "Pending");
      setPending(filteredCustomer.length);
      console.log(pending)
    });
  };
  // modify this code and add all the customerbill



  // const checkpaymentList = () => {
  //   axios.get(`${URL}/customerreg/`).then((res) => {
  //     const filteredCustomer = res.data.data;

  //     const pendingCustomers = filteredCustomer.filter((item) => item.status === "Pending");
  //     const advanceCustomers = filteredCustomer.filter((item) => item.status === "Advance");
  //     const notPendingCustomers = filteredCustomer.filter((item) => item.status === "Not Pending");


  //     setPending(pendingCustomers.length);
  //     setAdvance(advanceCustomers.length);
  //     setNotPending(notPendingCustomers.length);

  //     console.log("Pending customers:", pendingCustomers.length);
  //     console.log("Advance customers:", advanceCustomers.length);
  //     console.log("Not pending customers:", notPendingCustomers.length);
  //     console.log("total customer",)

  //   });
  // };















  const totalcustomerbill = () => {
    axios.get(`${URL}/customerreg/`).then((res) => {
      const customerData = res.data.data;

      // Calculate total customer bill
      const totalBill = customerData.reduce((sum, item) => sum + parseInt(item.customerbill), 0);

      setTotalCustomerBill(totalBill)
    });
  };


  const totalAmountRec = () => {
    axios.get(`${URL}/customerreg/`).then((res) => {
      const customerData = res.data.data;

      // Calculate total customer bill
      const totalBill = customerData.reduce((sum, item) => sum + parseInt(item.amount_received), 0);

      console.log(totalBill)
      setTotalRec(totalBill)
    });
  };


  // const securemoneyAmount = () => {
  //   axios.get(`${URL}/customerreg/`).then((res) => {
  //     const customerData = res.data.data;

  //     // Calculate total customer bill


  //   });
  // };

  // const checkpaymentList = () => {
  //   axios.get(`${URL}/customerreg/`).then((res) => {
  //     const customerData = res.data.data;

  //     // Calculate total customer bill

  //     customerData.map((item) => {
  //       const { balance } = item
  //       return (
  //         <>
  //           {console.log({ balance })}
  //         </>
  //       )
  //     })

  //     const totalBill = customerData.reduce((sum, item) => sum + parseInt(item.balance), 0);
  //     console.log(totalBill)

  //     setAdvance(totalBill)
  //     console.log("balance", advance)
  //   });
  // };

  // const checkpaymentList = () => {
  //   const advanceamount = totalRec - totalCustomerbill
  //   const pendingamount = totalCustomerbill - totalAmountRec
  //   console.log("advance", advanceamount)
  //   if (advanceamount, pendingamount > 0) {
  //     setPenidngAmount(0)
  //     setAdvance(advanceamount)
  //     alert("zero se upr hu")
  //   } else {
  //     setAdvance(0)
  //     setPenidngAmount(pendingamount)
  //     alert("zero kdfjdf hu")
  //   }
  // };





  const totalayaEarn = () => {
    axios.get(`${URL}/ayareg/`).then((res) => {
      const customerData = res.data.data;

      // Calculate total customer bill

      const totalEarn = customerData.reduce((sum, item) => sum + parseInt(item.ayaearn), 0);
      console.log("ayaearn", totalEarn)
      setAyaEarning(totalEarn)
    });
  };




  const handleNumberNany = () => {
    navigate('/ayalist')
  }

  const handleCustomer = () => {
    navigate('/customerlist')
  }


  const handleCustomerPayment = () => {
    navigate('/totalAmount')
  }




  const handleayaPayment = () => {
    navigate('/ayapayment')
  }





  const checkpaymentList = () => {
    axios.get(`${URL}/customerreg/`).then((res) => {
      const customerData = res.data.data;

      // Calculate total customer bill
      const totalRec = customerData.reduce((sum, item) => sum + parseInt(item.amount_received), 0);
      const customerbill = customerData.reduce((sum, item) => sum + parseInt(item.customerbill), 0);

      const totalbill = totalRec - customerbill

      const pendingAmt = totalRec - customerbill


      // setTotalRec(totalbill)
      console.log("newTotalbill", totalbill)



      if (totalbill > 0) {

        setAdvance(totalbill)

      } else {
        setAdvance(0);
      }

      if (pendingAmt > 0) {

        setPenidngAmount(0)

      } else {
        setPenidngAmount(pendingAmt)
      }
    });
  };

  const handleProfit = () => {
    navigate('/ayapayment')
  }

  const handleNannywork = () => {
    navigate('/totalAvaibleNanny')
  }

  const handleCustomerwork = () => {
    navigate('/totalAvaibleCustomer')
  }

  const handleSecurity = () => {
    navigate('/securityAmount')
  }

  const handleCustomerBill = () => {
    navigate('/customerBill')
  }




  useEffect(() => {
    AyaApi();
    CustomerApi();
    // assignAya();
    pendingPayment()

    totalcustomerbill()
    totalAmountRec()

    totalayaEarn()
    checkpaymentList()
    // securemoneyAmount()

  }, [])
  return (
    <>
      <div className="row">


        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleNumberNany} style={{ cursor: "pointer" }}>
          <div className="card text-white  bg-primary o-hidden h-100">
            <div className="card-body mt-3">

              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-user"></i> */}
                  <img src={babysitter} alt="" className="img-fluid boximg" />
                </div>
                <h4>Aya</h4>
                <h5 className="fw-bold ">{aya.count}</h5>
              </div>
            </div>
            {/* <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a> */}
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleNannywork} style={{ cursor: "pointer" }}>
          <div className="card text-white bg-success  o-hidden h-100">
            <div className="card-body">
              <div className="mr-5 cardbox mt-3">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-briefcase"></i> */}
                  <img src={ayawork} alt="" className="img-fluid boximg" style={{ width: "70px" }} />
                </div>
                <h4>
                  Available Aya
                </h4>
                <h5 className="fw-bold">{assign}</h5>
              </div>
            </div>
            {/* <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a> */}
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3"  style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#008080" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  <img src={payment} className="img-fluid boximg" style={{ width: "90px" }} />
                </div>
                <h4>Aya Bill</h4>
                <h5 className="fw-bold"> {ayaGeneratedBill}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleayaPayment} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#191970" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-hand-holding-dollar"></i> */}
                  <img src={salary} alt="" className="img-fluid boximg" />
                </div>
                <h4>Aya Amount not Paid</h4>
                <h5 className="fw-bold">{ayaPaid}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomer} style={{ cursor: "pointer" }}>
          <div className="card text-white o-hidden h-100" style={{background: "#b86d6d"}}>
            <div className="card-body">

              <div className="mr-5 cardbox mt-3">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-users"></i> */}
                  <img src={rating} alt="" className="img-fluid boximg" style={{ width: "70px" }} />
                </div>

                <h4>Customer</h4>

                <h5 className="fw-bold "> {customer.count}</h5>
              </div>
            </div>

          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomerwork} style={{ cursor: "pointer" }}>
          <div className="card text-white bg-success  o-hidden h-100">
            <div className="card-body">
              <div className="mr-5 cardbox mt-3">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-briefcase"></i> */}
                  <img src={rating} alt="" className="img-fluid boximg" style={{ width: "70px" }} />
                </div>
                <h4>
                  Customer not assigned
                </h4>
                <h5 className="fw-bold">{customerNotAssigned}</h5>
              </div>
            </div>
            {/* <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a> */}
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomerPayment} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#008080" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  <img src={payment} className="img-fluid boximg" style={{ width: "90px" }} />
                </div>
                <h4>Customer Bill</h4>
                <h5 className="fw-bold"> {CustomerBill}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomerBill} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#2F4F4F" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-hand-holding-dollar"></i> */}
                  <img src={pendingicon} alt="" className="img-fluid boximg" />
                </div>
                <h4>Customer Bill not Generated</h4>
                <h5 className="fw-bold">{billGenerated}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleSecurity} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#6495ED" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-hand-holding-dollar"></i> */}
                  <img src={advanceicon} alt="" className="img-fluid boximg" />
                </div>
                <h4> Secuirty Money</h4>
                <h5 className="fw-bold">{securemoney}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleSecurity} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#6495ED" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-hand-holding-dollar"></i> */}
                  <img src={advanceicon} alt="" className="img-fluid boximg" />
                </div>
                <h4>Not Given base Secuirty Money</h4>
                <h5 className="fw-bold">{securityPaid}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomerPayment} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#2F4F4F" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-hand-holding-dollar"></i> */}
                  <img src={pendingicon} alt="" className="img-fluid boximg" />
                </div>
                <h4>Received from Customer</h4>
                <h5 className="fw-bold">{amountRec}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleayaPayment} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#191970" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-hand-holding-dollar"></i> */}
                  <img src={salary} alt="" className="img-fluid boximg" />
                </div>
                <h4> Total Aya Payment</h4>
                <h5 className="fw-bold">{ayaPayment}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleProfit} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: " #7B68EE" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">

                  <img src={profitimg} alt="" className="img-fluid boximg" />
                </div>
                <h4> Total Admin Profit</h4>
                <h5 className="fw-bold">{amountRec-ayaPayment}</h5>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default adminLayout(DashboardPage);


















