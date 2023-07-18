


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
  const [assign, setAssign] = useState([])
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


  const assignAya = () => {
    axios.get(`${URL}/ayareg/`).then((res) => {
      const filteredAya = res.data.data.filter((item) => item.assign === "Not Assign");
      setAssign(filteredAya.length);
      console.log(assign)
    });
  };


  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${URL}/customerreg/`);
        const customerData = response.data.data;
        // Calculate total customer bill
        let totalBill = 0;
        let totalRecieved = 0;
        customerData.forEach((customer) => {
          customer.customerpayment.forEach((payment) => {
            totalBill += parseInt(payment.customerbill);
          });
        });
        customerData.forEach((customer) => {
          customer.customerpayment.forEach((payment) => {
            totalRecieved += parseInt(payment.amount_received);
          });
        });

        console.log("totalBill:", totalBill);
        setCustomerBill(totalBill);
        setAmountRec(totalRecieved)
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

        // Calculate total customer bill
        let totalBill = 0;
        let AdminProfit = 0;
        customerData.forEach((customer) => {
          customer.ayapayment.forEach((payment) => {
            totalBill += parseInt(payment.ayapaid);
          });
        });

        customerData.forEach((customer) => {
          customer.ayapayment.forEach((payment) => {
            AdminProfit += parseInt(payment.profit);
          });
        });


        console.log("totalAaauauuapayment:", totalBill);
        setAayaPayment(totalBill);
        setProfit(AdminProfit)
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


  const securemoneyAmount = () => {
    axios.get(`${URL}/customerreg/`).then((res) => {
      const customerData = res.data.data;

      // Calculate total customer bill
      const secureAmt = customerData.reduce((sum, item) => sum + parseInt(item.securityAmount), 0);



      console.log("seekek", secureAmt)
      setSecureMoney(secureAmt)
    });
  };

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

  const handleSecurity = () => {
    navigate('/securityAmount')
  }




  useEffect(() => {
    AyaApi();
    CustomerApi();
    assignAya();
    pendingPayment()

    totalcustomerbill()
    totalAmountRec()

    totalayaEarn()
    checkpaymentList()
    securemoneyAmount()

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
                <h4>Number of Aya</h4>
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
        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomer} style={{ cursor: "pointer" }}>
          <div className="card text-white bg-warning o-hidden h-100">
            <div className="card-body">

              <div className="mr-5 cardbox mt-3">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-users"></i> */}
                  <img src={rating} alt="" className="img-fluid boximg" style={{ width: "70px" }} />
                </div>

                <h4>Total Number of Customer</h4>

                <h5 className="fw-bold "> {customer.count}</h5>
              </div>
            </div>

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
                  Total Available Aya for work
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
        {/* <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomerPayment}>
          <div className="card text-white  bg-danger o-hidden h-100">
            <div className="card-body mt-3">

              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <h4> Pending Payment list</h4>
                <h5 className="fw-bold">{pending}</h5>
              </div>

            </div>

          </div>
        </div> */}
        {/* <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomerPayment}>
          <div className="card text-white  o-hidden h-100" style={{ background: " #7B68EE" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                 
                  <img src={paid} alt="" className="img-fluid boximg" />
                </div>
                <h4> Total Amount  Paid</h4>
                <h5 className="fw-bold">{totalCustomerbill}</h5>
              </div>
            </div>

          </div>
        </div> */}

        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomerPayment} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#008080" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  <img src={payment} className="img-fluid boximg" style={{ width: "90px" }} />
                </div>
                <h4> Total Customer Bill</h4>
                <h5 className="fw-bold"> {CustomerBill}</h5>
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

        <div className="col-xl-3 col-sm-6 mb-3" onClick={handleCustomerPayment} style={{ cursor: "pointer" }}>
          <div className="card text-white  o-hidden h-100" style={{ background: "#2F4F4F" }}>
            <div className="card-body mt-3">
              <div className="mr-5 cardbox">
                <div className="card-body-icon">
                  {/* <i class="fa-solid fa-hand-holding-dollar"></i> */}
                  <img src={pendingicon} alt="" className="img-fluid boximg" />
                </div>
                <h4> Total Amount Recieved from Customer</h4>
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
                <h5 className="fw-bold">{profit}</h5>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default adminLayout(DashboardPage);


















