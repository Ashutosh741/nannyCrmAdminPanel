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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      {/* {showbox ? ( */}
          <section>
            <Container>
              <Row>
                <Col md="12" className="mt-2">
                  <div className="my-3 text-end"></div>
                  <div className="table-responsive rounded-3">
                    <table className="table table-responsive table-sm table-stripped table-bordered p-0">
                    <thead className="bg-blue text-white">
                        <tr className="text-uppercase">
                          <th>Sr. No</th>
                          <th className="">Customer Code</th>
                          <th className="">Customer Name</th>

                          <th className="">Date</th>
                          <th className="">Generated Bill</th>
                          <th className="">Payment Mode</th>
                          <th className="">To Data</th>
                          <th className="">From Date</th>
                          <th className="">Rate</th>
                          <th className="">Aya Assigned</th>
                          <th className="">Actions</th>
                          
                          {/* <th className="">Invoice</th> */}
                        </tr>

                      </thead>
                      <tbody>
                      {generatedInvoice.map((item, index) => {
                        if (item) {
                          return (
                            <tr key={item.generatedCustomerId}>
                              <td>{index + 1}</td>
                              <td>{customerCode}</td>
                              <td>{tech.name}</td>

                              <td>{item.generatedDate}</td>
                              <td>{item.generatedBill}</td>
                              <td>{item.generatedPaymentMode}</td>
                              <td>{item.generatedToDate}</td>
                              <td>{item.generatedFromDate}</td>
                              <td>{item.generatedRate}</td>
                              <td>{item.generatedAyaAssigned}</td>
                              <td>
                              <div className="d-flex gap-3">
                              <i class="fa-solid fa-eye"></i>
                              <i class="fa-solid fa-trash"></i>
                              <i class="fa-solid fa-pen-to-square"></i>
                              </div>
                              </td>
                              
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
      {/* ) : null} */}
    </>
  );
}

export default adminLayout(PaymentEdit);

// give pagination