import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import "../assets/css/profile.css";
import aayawork from "../assets/images/aayawork.png";

import { URL } from "../Url";
import CustomerPaymentReceipt from "./newPages/CustomerPaymentReceipt";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function PaymentEdit() {

  // const tableRef = useRef();

  // const handlePrint = useReactToPrint({
  //   display : "block",
  //   content: () => tableRef.current,
  // });


  // const {id} = useParams();


  const [tech, setTech] = useState([]);

  const [aya, setAya] = useState([]);
  const [ayaCost, setAyaCost] = useState("");
  const [amountRec, setAmountRec] = useState("");
  const [currentbal, setCurrentBal] = useState(0);
  const [paymentstatus, setPaymentStatus] = useState("");
  const [securityAdjustment, setSecurityAdjustment] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [customerpayment, setCustomerPayment] = useState([]);
  const [showbox, setShowbox] = useState(true);
  const [totalCustomerBill, setTotalCustomerBill] = useState("");
  const [generatedBill,setGeneratedBill] = useState('');
  const [checkassign, setChcekAssign] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGeneratedButton,setShowGeneratedButton] = useState(true)
  const [customerCode, setCustomerCode] = useState('');
  const [generatedInvoice, setGeneratedInvoice] = useState([]);
  const [customerbill, setCustomerbill] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState('')
  const [rate,setRate] = useState(0);
  const [assignedAyaName, setAssignedAyaName] = useState("");
  const [assignedAyaPurpose, setAssignedAyaPurpose] = useState("");
  const [leaveTaken,setLeaveTaken] = useState(0);
  const [generatedWorkingDays,setGeneratedWorkingDays] = useState('');
  const [customerPaymentDetails,setCustomerPaymentDetails] = useState([]);
  const [securityAmount, setSecurityAmount] = useState("");
  const [status, setStatus] = useState("");
  const[pendingAmount,setPendingAmount] = useState('');
  const[totalPendingAmount,setTotalPendingAmount] = useState('');
  const[totalBill,setTotalBill] = useState('');
  const [paymentDone, setPaymentDone] = useState(0);

  // const [mountReceived,setGeneratedAmountReceived] = useState('');
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${id}`);
      const techData = response.data.data;
      setTech(techData);
      console.log("techdata" , techData)
      setSecurityAmount(techData.securityAmount);

      const reverseBillData = techData.customerGeneratedInvoice.reverse();
      // const reversalData = reverseBillData.reverse();
      console.log("reversal data",reverseBillData[0])
      setGeneratedInvoice(reverseBillData);
      // console.log("payment recivesdnjvsdi" , response.data.data.customerPaymentDetails[0].paymentAmountReceived)
      // console.log("are yha to dekha hi nhi", techData.totalPendingAmount)
      setCustomerbill(reverseBillData[0].generatedBill)
      // console.log("mic chcek check check",generatedInvoice)

      setFromDate(reverseBillData[0].generatedFromDate);
      // console.log("mic chcek check check",reverseBillData[0].generatedFromDate);

      setToDate(reverseBillData[0].generatedToDate);
      setRate(reverseBillData[0].generatedRate);
      setAssignedAyaName(reverseBillData[0].generatedAyaAssigned);
      setAssignedAyaPurpose(reverseBillData[0].generatedAyaPurpose);
      setLeaveTaken(reverseBillData[0].generatedLeaveTaken);
      setGeneratedWorkingDays(reverseBillData[0].generatedWorkingDays);
      // console.log("generated bill" , reverseBillData[0].generatedBill)
      
      setGeneratedBill(reverseBillData[0].generatedBill); 
      setShowGeneratedButton(false);

      // setGeneratedInvoice(reverseData[0]);
      // isse customer ka bill latest generated bill se update ho rha 
      // const generateInvoiceLength = techData.generatedInvoice.length-(techData.generatedInvoice.length>0 ? 1 : 0)
      
      const reversePaymentData = techData.customerPaymentDetails.reverse();
      setCustomerPaymentDetails(reversePaymentData);
      console.log("ismein payment ka kya hai",reversePaymentData)
      // get_payment_pending();

      if(reversePaymentData){
        // const done = reversePaymentData[0].paymentAmountReceived
        console.log("kitna pyament ho gya",reversePaymentData )
        // setPaymentDone(done);
      }else{
        console.log("nhi chala bhai")
        setPaymentDone(0);
      }
      setTotalPendingAmount(techData.totalPendingAmount);
      const value = techData.totalPendingAmount + reverseBillData[0].generatedBill
      setTotalBill(value)

      // setPendingAmount(pendingBill());
      // setTotalPendingAmount(prevTotalPendingAmount => prevTotalPendingAmount + pendingAmount);



      if(techData.generateInvoice == null){


          // console.log(techData.generatedInvoice.generatedBill)
      }
      console.log("hello")
      // console.log("length",techData.generatedInvoice[generateInvoiceLength])
      // if((techData.generatedInvoice[generateInvoiceLength] !== undefined)){
      // }
      setCustomerPayment(techData.customerpayment);
      const assigncheck = techData.assign;
      // console.log(techData.generatedInvoice.generatedBill)
      setChcekAssign(assigncheck);
      setCustomerCode(techData.customerCode);
      // console.log("checking assing check", assigncheck);

      // if (assigncheck !== "Not Assign") {
      //   setShowbox(true);
      // } else {
      //   setShowbox(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInvoice = ()=>{
    // console.log(id)
    navigate(`/generateBill/`)
  }

  const handleRowRemove = () => {
    // setBorder(true);
  };

  console.log("id", id);
  const resetForm = () => {
    setGeneratedBill("");
    setFromDate("");
    setToDate("");
    setRate("");
    setLeaveTaken("");
    setGeneratedWorkingDays("");
    setAmountReceived('');
  };


//   const handlePayment = async(e) =>{
//     e.preventDefault();
//     try{
//       const response = await fetch(`${URL}/customerreg/${id}`, {
//         method: "PUT",
//         body: JSON.stringify({
//           generatedBill: 0,
//           generatedToDate: "",
//           generatedFromDate: "",
//           generatedRate: 0,
//           generatedAyaAssigned : assignedAyaName,
//           generatedAyaPurpose : assignedAyaPurpose,
//           generatedWorkingDays : "",
//           generatedLeaveTaken : "",
//         }),
        
//         headers: {
//           "Content-Type": "application/json",
//         },
//       )
//     }
//   }catch(error){
//     console.log("err",e)
//   }
// }


const handlePayment = async (e) => {
  // e.preventDefault();
  try {
    const response = await fetch(`${URL}/customerreg/${id}`, {
      method: "PUT",
      body: JSON.stringify({

        generatedCustomerId : id,
          generatedBill: 0,
          generatedToDate: "",
          generatedTime : new Date().toLocaleTimeString(),  
          generatedFromDate: "",
          generatedRate: 0,
          generatedAyaAssigned : assignedAyaName,
          generatedAyaPurpose : assignedAyaPurpose,
          generatedWorkingDays : "",
          generatedLeaveTaken : "",


      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  //   await customerData();

    // const data = await response.json();
    // console.log("updated data",data);
    // alert("data Submitted Succesfully");

  } catch (err) {
    console.log("error in this customerCode",id);

    console.log("error in submitting generatedBill",err);
  }
// setShowGeneratedButton(true)
};


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // pendingBill();
    // let value = totalPendingAmount + pendingAmount;
    // setTotalPendingAmount(value);
    // console.log("total pending amount", totalPendingAmount + pendingAmount);
    // setTotalBill(totalPendingAmount + generatedBill);
    // console.log("total customer bill", totalPendingAmount + generatedBill);
    // setPendingAmount(pendingBill());
    // console.log("let' see, kitna ban gya",pendingAmount)

      // value = totalPendingAmount - amountReceived;
      // setTotalPendingAmount(value);
      // console.log("what's value",value)
    
    try {
      const response = await fetch(`${URL}/customerreg/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          paymentBill: generatedBill,
          paymentAmountReceived: amountReceived,
          paymentPendingAmount : pendingAmount,
          paymentFromDate: fromDate,
          paymentToDate: toDate,
          paymentRate: rate,
          paymentAyaAssigned: assignedAyaName,
          paymentAyaPurpose: assignedAyaPurpose,
          paymentWorkingDays : generatedWorkingDays,
          paymentLeaveTaken : leaveTaken,
          // paymentstatus : amountReceived,
          // paymentalance : amountReceived,
          // totalRecievedmoney: totalRecieved,
          totalPendingAmount : totalPendingAmount,

        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // await fetchCustomerData();

      const data = await response.json();
      // console.log(data);
      const newPaymentDetails = {
        paymentBill: generatedBill,
        paymentAmountReceived: amountReceived,  
        paymentPendingAmount : pendingAmount,
        paymentFromDate: fromDate,
        paymentToDate: toDate,
        paymentRate: rate,
        paymentAyaAssigned: assignedAyaName,
        paymentAyaPurpose : assignedAyaPurpose,
        paymentWorkingDays : generatedWorkingDays,
        paymentLeaveTaken : leaveTaken,
    };
    // setGeneratedBill(pendingAmount);
    // fetchCustomerData();
    setCustomerPaymentDetails (prevPaymentDetails => [ newPaymentDetails,...prevPaymentDetails,]);
      // console.log("Total customer bill:", totalCustomerBill);
      // console.log("Total received amount:", totalRecieved);
      handlePayment();

      alert("data Submitted Succesfully");
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(ayaCost);
  console.log(amountRec);
// const [pamount, setPAmount] = useState(0)
// const get_payment_pending = () => {
//   let sum = 0;
//   customerPaymentDetails.forEach((item, index) => {
//     if(item.paymentPendingAmount > 0 && item.paymentPendingAmount != ""){
//       sum = sum + item.paymentPendingAmount;
//     }
   
//     console.log(item.paymentPendingAmount + ' - '+index +'is nan');
//   });
//   setPAmount(sum);
// }

useEffect(() => {
  fetchCustomerData();
    
  
  

}, [id, showGeneratedButton]);

  

  
  useEffect(() => {
    // let value = totalPendingAmount + pendingAmount
    let value = totalPendingAmount - amountReceived;
    setTotalPendingAmount(value);
    // setTotalPendingAmount(tech.totalPendingAmount);
    value = value + generatedBill
    setTotalBill(value);
    // let isum = false;
    // if(isum == false){
    //   get_payment_pending();
    //   isum = true;
    // }
    
    // if(generatedBill === ''){
    //   value = totalPendingAmount - amountReceived;
    //   setTotalPendingAmount(value);
    // }
  }, [amountReceived]);

  const handleAssign = () => {
    // console.log("Payement Assign");
    navigate(`/customerassign/${id}`);
  };

  const pendingBill = () => {
    const calc = parseFloat(generatedBill) - parseFloat(amountReceived);
    console.log("Calculated pending amount:", calc);
    return isNaN(calc) ? 0 : calc;
  };
  
  

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col md="3">
              <div class="profile-sidebar">
                <div class="my-3 p-3 bg-body rounded shadow-sm">
                  <div class="profile-userpic">
                    <img
                      src={`${URL}/${tech.file}`}
                      class="img-responsive profile-img-center"
                      alt=""
                    />
                  </div>
                  <div class="profile-usertitle">
                    <div class="profile-usertitle-name">{tech.name}</div>
                    <div class="profile-usertitle-job">
                      Customer Code :{" "}
                      <span style={{ textTransform: "lowercase" }}>
                        {tech.customerCode}
                      </span>
                    </div>
                  </div>
                  {/* <div class="profile-userbuttons">
                    <button
                      type="button"
                      class="btn btn-success btn-sm mb-3"
                      onClick={handleRowRemove}
                    >
                      Edit
                    </button>
                  </div> */}

                  <hr />
                </div>
              </div>
            </Col>

            {showbox ? (
              <>
                <Col md="9">
                  {
                    showGeneratedButton && (
                      <div className="invoice-button text-end">
                      <button className="btn bg-primary text-white" onClick={handleInvoice}>Go To Generate Bill</button>
                      </div>
                    )
                  }

                  <div className="my-3 p-3 bg-body rounded shadow-sm detailPage">
                      <h6 className="border-bottom pb-2 mb-0 mb-3 ">
                        Personal Info
                      </h6>
                    <Form onSubmit={handleFormSubmit}>
                      <Row>
                        <Col md="3">
                          <label>Customer bill:</label>
                          <input
                            type="text"
                            name="customerbill"
                            value={generatedBill}
                            readOnly
                            className={`form-control `}
                            // onChange={(e) => setCustomerbill(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Total Pending Amount:</label>
                          <input
                            type="text"
                            name="totalpendingbill"
                            value={totalPendingAmount}
                            readOnly
                            className={`form-control `}
                            // onChange={(e) => setCustomerbill(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Total Customer bill:</label>
                          <input
                            type="text"
                            name="customerbill"
                            value={totalBill}
                            readOnly
                            className={`form-control `}
                            // onChange={(e) => setCustomerbill(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Amount Recieved:</label>
                          <input
                            type="text"
                            name="amount_received"
                            value={amountReceived}
                            className={`form-control `}
                            onChange={(e) => setAmountReceived(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>From Data:</label>
                          <input
                            type="text"
                            name="fromDate"
                            value={fromDate}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>To Date</label>
                          <input
                            type="text"
                            name="toDate"
                            value={toDate}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Assigned Aya</label>
                          <input
                            type="text"
                            value={assignedAyaName}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Rate</label>
                          <input
                            type="text"
                            value={rate}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Security Amount</label>
                          <input
                            type="text"
                            value={securityAmount}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Purpose</label>
                          <input
                            type="text"
                            value={assignedAyaPurpose}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Leave</label>
                          <input
                            type="text"
                            value={leaveTaken}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Working Days</label>
                          <input
                            type="text"
                            value={generatedWorkingDays}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>
                        <Col md="3">
                          <label>Adjust With Security Money</label>
                          <select className="form-control form-select">
                            <option value = "No">NO</option>
                            <option value = "Yes">YES</option>
                          </select>
                        </Col>

                        <Col md="12">
                          <div className="mt-3">
                            <button
                              type="submit"
                              className="btn bg-primary text-white"
                              onClick= {()=>setPendingAmount(pendingBill())}
                            >
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col md="9">
                  <div className="my-3 p-3  bg-body rounded shadow-sm detailPage">
                    <div className="h-100 text-center">
                      <img
                        src={aayawork}
                        className="img-fluid"
                        alt=""
                        style={{ height: "100px" }}
                      />
                      <h3>Please assign Aaya</h3>

                      <button
                        className="btn btn-success btn-sm mb-3"
                        onClick={handleAssign}
                      >
                        Assign Aya
                      </button>
                    </div>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </section>
      {showbox ? (
          <section>
            <Container>
              <Row>
                <Col md="12" className="mt-2">
                  <div className="my-3 text-end"></div>
                  <div className="table-responsive rounded-3">
                    <table className="table table-responsive table-sm table-stripped table-bordered p-0">
                      <thead className="bg-blue text-white">
                        <tr className="text-uppercase">
                          <th className="">Customer Bill</th>
                          <th className="">Amount Recieved</th>
                          <th className="">Status</th>
                          <th className="">Pending Amount</th>

                          <th className="">From Data</th>
                          <th className="">To Date</th>
                          <th className="">Assigned Aya</th>
                          <th className="">Rate</th>
                          <th className="">Purpose</th>
                          <th className="">Leave</th>
                          <th className="">Working Days</th>

                          {/* <th className="">Invoice</th> */}
                        </tr>
                      </thead>
                      <tbody>
                      {(customerPaymentDetails[0] !== undefined) && customerPaymentDetails.map((item, index) => {
                        if (item) {
                                // Calculate the status based on customer bill and amount received
                                let status = "";
                                if (item.paymentBill === item.paymentAmountReceived) {
                                  status = "Complete";
                                } else if (item.paymentBill < item.paymentAmountReceived) {
                                  status = "Advanced";
                                } else {
                                  status = "Pending";
                                }

                                // Update the status value in the item
                                item.status = status;
                          return (
                            <tr key={item.generatedCustomerId}>
                              <td>{item.paymentBill}</td>
                              <td>{item.paymentAmountReceived}</td>
                              {/* <td>{item.status}</td> */}
                              <td>
                                {status === "Complete" && (
                                  <button className="btn btn-primary text-white">
                                    Complete
                                  </button>
                                )}
                                {status === "Pending" && (
                                  <button className="btn btn-danger text-white" >
                                    Pending
                                  </button>
                                )}
                                {status === "Advanced" && (
                                  <button className="btn btn-success text-white" >
                                    Advanced
                                  </button>
                                )}
                              </td>
                              <td>{item.paymentPendingAmount}</td>
                              <td>{item.paymentFromDate}</td>
                              <td>{item.paymentToDate}</td>
                              <td>{item.paymentAyaAssigned}</td>
                              <td>{item.paymentRate}</td>
                              <td>{item.paymentAyaPurpose}</td>
                              <td>{item.paymentLeaveTaken}</td>
                              <td>{item.paymentWorkingDays}</td>
                            </tr>
                          );
                        }
                      })}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
      ) : null}
    </>
  );
}

export default adminLayout(PaymentEdit);

// give pagination