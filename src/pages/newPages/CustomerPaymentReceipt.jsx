import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useReactToPrint } from "react-to-print";
import '../../assets/css/customerPayment.css';
import logo from "../../assets/images/logo.png";
import adminLayout from '../../hoc/adminLayout';
import axios from "axios";
import { Form, Navigate, useParams } from "react-router-dom";
import { URL } from "../../Url";
import { Button, Col, Container, FormGroup, Row } from "react-bootstrap";
import AyaPaymentReceipt from "./AyaPaymentReceipt";

// is page ka table, change krna hai or , jo new state add kiya hai usko database se update krna hai
// or edit ka option ka bhi dena hai
// date fetch from choosing month,  and update in customer code, still reflect update bill button
// onclick of update bill button it should update the details, instead it is pushing new element

const CustomerPaymentReceipt = (props) => {

    const [name, setName] = useState('')  
    const [presentAddress,setPresentAddress] = useState('')
    const [contactNumber,setContactNumber] = useState('')
    const [srNo,setSrNo] = useState('1')
    const [customerCode, setCustomerCode] = useState('')
    const [customerData, setCustomerData] = useState(null)
    const [fromDate,setFromDate] = useState('')
    const [toDate,setToDate] = useState('')
    const [rate,setRate] = useState(0)
    const [customerId,setCustomerId] = useState('');
    const [generatedBill, setgeneratedBill] = useState(0);
    const [assignedAyaDetails,setAssignedAyaDetails] = useState([]);
    const [assignedAyaInBetween,setAssignedAyaInBetween] = useState([]);
    const [generatedInvoice, setGeneratedInvoice] = useState([]);
    const [showGeneratedButton,setShowGeneratedButton] = useState(true);
    const [leaveTaken,setLeaveTaken] = useState(0);
    const [billFor,setBillFor] = useState('');
    const [showCustomerCode,setShowCustomerCode] = useState(false);
    const [showCustomerBill,setShowCustomerBill] = useState(false);
    const[showAyaBill,setShowAyaBill] = useState(false);
    const [showAyaCode,setShowAyaCode] = useState(false);
    const [ayaCode, setAyaCode] = useState('')
    const [assignedAyaName, setAssignedAyaName] = useState("");
    const [assignedAyaPurpose, setAssignedAyaPurpose] = useState("");
    const [generatedWorkingDays,setGeneratedWorkingDays] = useState('');
    const [securityAmount, setSecurityAmount] = useState("");
    const [paymentMode,setPaymentMode] = useState('Cash');
    const [upi,setUpi] = useState('');
    const[transactionId, setTransactionId] = useState('');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    console.log("aya ka cde",ayaCode)
    const [transactionDate,setTransactionDate] = useState(date)
    const[showUpdateButton,setShowUpdateButton] = useState(false);
    const[editIndex,setEditIndex] = useState('');
    const [selectedDate, setSelectedDate] = useState("");

    const {id} = useParams();

    const fetchEditDetails = async(index)=>{
      setShowUpdateButton(true);
      try{
        const response = await axios.get(`${URL}/customerreg/${customerCode}`)
        // console.log("what data is",response.data.data.generatedInvoice[index]);
        const data = response.data.data.customerGeneratedInvoice[index];

        // const data = response.data.data;
        setRate(data.generatedRate);
        setFromDate(data.generatedFromDate);
        setToDate(data.generatedToDate);
        // setgeneratedBill(data.generatedBill);
        // setGeneratedWorkingDays(data.generatedWorkingDays);
        // setAssignedAyaPurpose(data.generatedAyaAssigned);
        setAssignedAyaName(data.generatedAyaAssigned);
        setLeaveTaken(data.generatedLeaveTaken)
        setGeneratedWorkingDays(data.generatedWorkingDays)
        setAssignedAyaPurpose(data.generatedAyaPurpose)
        setPaymentMode(data.generatedPaymentMode);
        setTransactionId(data.generatedTransactionId);
        setTransactionDate(data.generatedTransactionDate);
        setUpi(data.generatedUpi);
        setShowUpdateButton(true);
        setEditIndex(index);
        

        // handleGenerateBill();
    }catch(err){
        console.log("error in fetching printing details",err);
    }
    setShowGeneratedButton(false)
    }

    const fetchPrintDetails = async(index)=>{
        // alert(index)

        try{
            const response = await axios.get(`${URL}/customerreg/${customerCode}`)
            // console.log("what data is",response.data.data.generatedInvoice[index]);
            const data = response.data.data.customerGeneratedInvoice[index];

            // const data = response.data.data;
            setRate(data.generatedRate);
            setFromDate(data.generatedFromDate);
            setToDate(data.generatedToDate);
            // setgeneratedBill(data.generatedBill);
            // setGeneratedWorkingDays(data.generatedWorkingDays);
            setAssignedAyaPurpose(data.generatedAyaAssigned);
            setAssignedAyaName(data.generatedAyaAssigned);
            setLeaveTaken(data.generatedLeaveTaken)
            setGeneratedWorkingDays(data.generatedWorkingDays)
            setAssignedAyaPurpose(data.generatedAyaPurpose)
            setPaymentMode(data.generatedPaymentMode);
            setTransactionId(data.generatedTransactionId);
            setTransactionDate(data.generatedTransactionDate);
            setUpi(data.generatedUpi);
            

            // handleGenerateBill();
        }catch(err){
            console.log("error in fetching printing details",err);
        }
        setShowGeneratedButton(false)

        handlePrint()
    }

    const fetchCustomerData = async()=>{
        try{
            const response = await axios.get(`${URL}/customerreg/${customerCode}`);
            console.log("Initial data",response.data.data);
            // console.log(response.data.data._id);
            setCustomerId(response.data.data._id)
            setCustomerData(response.data.data);
            const data = response.data.data
            setSecurityAmount(data.securityAmount);

            // console.log("generated Invoice",data.generatedInvoice)
            // setGeneratedInvoice(data.generatedInvoice);
            setGeneratedInvoice(data.customerGeneratedInvoice || []); 
            console.log("updated generatedinvoice",data.customerGeneratedInvoice);
            // setCustomerPayment(data.customerpayment);
            setPresentAddress(data.presentAddress); 
            // setCustomerCode(data.customerCode)
            setContactNumber(data.contactNumber);
            setName(data.name);
            setAssignedAyaDetails(data.assignedAyaDetails)
            // console.log(presentAddress)
            // console.log("in which format",data.assignedAyaDetails[0])
            if(data.assignedAyaDetails){
              const reverseData = data.assignedAyaDetails.reverse();
              console.log("reversed data",reverseData)
              setAssignedAyaName(reverseData[0].assignedAyaName)
              setAssignedAyaPurpose(reverseData[0].assignedAyaPurpose)
              console.log("are you there",reverseData[0].assignedAyaName);
            }
           
        }
        catch(e){
            console.log("error in fetching customer data:",e)
        }
    }
    const get_diff_days  =  () => {
        if(toDate && fromDate){
            let diff = parseFloat(new Date(toDate).getTime() - new Date(fromDate).getTime() - leaveTaken);
            return  Math.ceil(diff/(1000*86400));
        }else{
            console.log('not a number')
        }
    }
    // const generatedBill = get_diff_days()*{rate};

    const checkBillFor = ()=>{
      if(billFor === "Customer"){
        setShowCustomerCode(true);
        setShowAyaCode(false);
        setShowCustomerBill(true);
        setShowAyaBill(false);
      }
      else if(billFor === "Aya"){
        setShowAyaCode(true);
        setShowCustomerCode(false);
        setShowCustomerBill(false);
        setShowAyaBill(true);
      }
      else{
        setShowAyaCode(false);
        setShowCustomerCode(false);
        setShowCustomerBill(false);
        setShowAyaBill(false);
      }
    }
    
    useEffect(()=>{
        // rate
        let calculatedgeneratedBill = (get_diff_days()-leaveTaken) * rate;
        if(calculatedgeneratedBill < 0)calculatedgeneratedBill = 0;
        setgeneratedBill(calculatedgeneratedBill);
        fetchCustomerData();
        setGeneratedWorkingDays(get_diff_days()-leaveTaken);
        // checkBillFor();

        // currentTime();
        
    },[rate,customerCode,leaveTaken])

    useEffect(()=>{
      checkBillFor()
    },[billFor])

    const tableRef = useRef();

    // console.log(id)


    const handleUpdateBill = async (e) => {
      e.preventDefault();
      
      try {

        const updatedInvoice = {
          generatedCustomerId: customerId,
          generatedTime: new Date().toLocaleTimeString(),
          generatedBill: generatedBill,
          generatedToDate: toDate,
          generatedFromDate: fromDate,
          generatedRate: rate,
          generatedAyaAssigned: assignedAyaName,
          generatedAyaPurpose: assignedAyaPurpose,
          generatedWorkingDays: generatedWorkingDays,
          generatedLeaveTaken: leaveTaken,
          generatedDate: date,
          generatedPaymentMode: paymentMode,
          generatedTransactionId: transactionId,
          generatedUpi: upi,
          generatedTransactionDate: transactionDate,
        };
        const response = await fetch(`${URL}/customerreg/${customerId}/customerGeneratedInvoice[${editIndex}])`, {
          method: "PUT",
          body: JSON.stringify(updatedInvoice),
          headers: {
            "Content-Type": "application/json",
          },
        });
      //   await customerData();
  
        const data = await response.json();
        console.log("updated data",data);
        alert("data Submitted Succesfully");

        const updatedInvoices = [...generatedInvoice];
        console.log("dekhe kya update kr rha,",updatedInvoices);
        updatedInvoices[editIndex] = updatedInvoice;
        
        setGeneratedInvoice (updatedInvoices);
        
        setFromDate("");
        setToDate("");
        setRate(0);
        setAssignedAyaName("");
        setAssignedAyaPurpose("");
        setPaymentMode('Cash');
        setTransactionDate('');
        setShowUpdateButton(false); 

      } catch (err) {
        console.log("error in this customerCode",customerId);

        console.log("error in submitting Updated Bill",err);
      }
    // setShowGeneratedButton(true)
    };
  



    const handleGenerateBill = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${URL}/customerreg/${customerId}`, {
            method: "PUT",
            body: JSON.stringify({

              generatedCustomerId : customerId,
              generatedTime : new Date().toLocaleTimeString(),  
              generatedBill: generatedBill,
              generatedToDate : toDate,
              generatedFromDate : fromDate,
              generatedRate : rate,
              generatedAyaAssigned : assignedAyaName,
              generatedAyaPurpose : assignedAyaPurpose,
              generatedWorkingDays : generatedWorkingDays,
              generatedLeaveTaken : leaveTaken,
              generatedDate : date,
              generatedPaymentMode : paymentMode,
              generatedTransactionId : transactionId,
              generatedUpi : upi,
              generatedTransactionDate : transactionDate

            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        //   await customerData();
    
          const data = await response.json();
          console.log("updated data",data);
          alert("data Submitted Succesfully");
          const newInvoice = {
              generatedCustomerId: customerId,
              generatedTime: new Date().toLocaleTimeString(),  
              generatedBill: generatedBill,
              generatedToDate: toDate,
              generatedFromDate: fromDate,
              generatedRate: rate,
              generatedAyaAssigned : assignedAyaName,
              generatedAyaPurpose : assignedAyaPurpose,
              generatedWorkingDays : generatedWorkingDays,
              generatedLeaveTaken : leaveTaken,
              generatedDate : date,
              generatedPaymentMode : paymentMode,
              generatedTransactionId : transactionId,
              generatedUpi : upi,
              generatedTransactionDate : toDate
          };
          
          setGeneratedInvoice (prevInvoices => [...prevInvoices, newInvoice]);
          
          setFromDate("");
          setToDate("");
          setRate(0);
          setAssignedAyaName("");
          setAssignedAyaPurpose("");
          setPaymentMode('Cash');
          setTransactionDate('');

        } catch (err) {
          console.log("error in this customerCode",customerId);

          console.log("error in submitting generatedBill",err);
        }
      // setShowGeneratedButton(true)
      };
    

    const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    onAfterPrint: ()=>setShowGeneratedButton(true),
    });

    function convertNumberToWords(number) {
        const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
      
        if (number === 0) {
          return 'zero';
        }
      
        if (number < 20) {
          return units[number];
        }
      
        if (number < 100) {
          return tens[Math.floor(number / 10)] + ' ' + units[number % 10];
        }
      
        if (number < 1000) {
          return units[Math.floor(number / 100)] + ' hundred ' + convertNumberToWords(number % 100);
        }
      
        if (number < 1000000) {
          return convertNumberToWords(Math.floor(number / 1000)) + ' thousand ' + convertNumberToWords(number % 1000);
        }
      
        if (number < 1000000000) {
          return convertNumberToWords(Math.floor(number / 1000000)) + ' million ' + convertNumberToWords(number % 1000000);
        }
      
        if (number < 1000000000000) {
          return convertNumberToWords(Math.floor(number / 1000000000)) + ' billion ' + convertNumberToWords(number % 1000000000);
        }
      
        return 'Number is too large to convert.';
      }


      function ReverseString(str) {
        return str.split('-').reverse().join('-')
    }

    
    const getLastDayOfMonth = () => {
      const [year, month] = selectedDate.split("-");
      const lastDay = new Date(year, month, 0).getDate();
      return lastDay;
    };

      const handleInputChange = (event) => {
        const { value } = event.target;
        setSelectedDate(value);
        console.log("my value is ", value)

        // setFromDate(`1-${selectedDate}`);
        // setToDate(getLastDayOfMonth()- {selectedDate})
    

        // setFromDate(1-ReverseString({selectedDate}));
        // setToDate(getLastDayOfMonth()- ReverseString({selectedDate}))
      };

    useEffect(()=>{
      setFromDate(`1-${selectedDate}`);
      setToDate(`${getLastDayOfMonth()}- ${selectedDate}`)
      console.log("my fromdate",fromDate)
      console.log("my todate",toDate)

    },[selectedDate])

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-4">
        <FormGroup>
            <label
              style={{
                display: "inline-block",
                fontSize: "16px",
                }}
                className="fw-bold mb-1"
            
            >Generate Bill For</label>

            <select
              className="form-control form-select"
              value={billFor}
              // name="gender"
              onChange={(e) => setBillFor(e.target.value)}
              required

            >
              <option value="">Select</option>
              <option value="Aya">Aya</option>
              <option value="Customer">Customer</option>
              {/* <option value="security">Security Money</option> */}
              
            </select>
        </FormGroup>
        </div>
        {
          showCustomerCode && 
          <>
          <div className="col-4 ">
          <div className="">
            <label
                style={{
                display: "inline-block",
                fontSize: "16px",
                marginRight: "20px",
                }}
                className="fw-bold mb-1"
            >
                Customer Code :{" "}
            </label>
            <input
                type="text"
                className="form-control"
                value={customerCode}
                onChange={(e) => setCustomerCode(e.target.value)}
            />
        {/* <button onClick={fetchCustomerData}>Fetch Data</button> */}
            </div>
          </div>
          <Col md="4">
          <div className="print-container">
            <div className="print-header">
              <div className="">
                <label htmlFor="" className="fw-bold mb-1">
                  Select Month
                </label>
                <input
                  type="month"
                  className="form-control "
                  value={selectedDate}
                  onChange={handleInputChange}
                />
                {/* <p>Last day of the month: {getLastDayOfMonth()} </p> */}
              </div>
            </div>
          </div>
        </Col>
            </>
        }
        {
          showAyaCode && (
            <AyaPaymentReceipt/>
          )
        }
      </div>
    </div>


      { showCustomerBill && 
      <>
      <div className='container'  ref={tableRef}>
        <div className="row">

        <form onSubmit={showGeneratedButton ? handleGenerateBill : handleUpdateBill}>
            <div className="col-12">

                <div className="row receipt">
                    <div className="col-6">
                        <img src = {logo} className='companyLogo'/>
                    </div>
                    <div className="col-6 contactNumber">
                        <span>MOBILE NO : 97349-15314<br></br></span>
                        <span>70010-85855</span>
                    </div>
                    <div className="col-12 companyName">
                        <span>Joy Guru Janakalyan Trust <span style = {{color : "black",fontWeight:"lighter",fontFamily:"system-ui"}}>&</span> Service</span>
                    </div>
                    <div className="col-12 companyAddress">
                        <span>SARBAMANGALA PALLY, M.K ROAD, ENGLISH BAZAR, MALDA - 732101</span>
                    </div>
                    <div className="col-12 row-1 mb-2">
                        
                        <div className="serial col-5 ms-0">
                        
                            <span>SL NO. {customerCode}</span>
                        </div>
                        <div className="prop col-3 me-5">
                            <span> MR. ABHIJIT PODDAR</span>
                        </div>
                        <div className="date col-4 me-5">
                            <span>PAYMENT DATE: </span>{date}
                        </div>
                    </div>
                    <div className="col-4 row-2 mb-2">
                        <div className="partyName">
                            <span>PARTY NAME: {name}</span>
                        </div>
                    </div>
                    <div className="col-4 row-2 mb-2 d-flex">
                        <div className="paymentMode">
                            <span>PAYMENT MODE : </span>
                        </div>
                        <select className="form-select options" aria-label="Default select example"   onChange={(e) => setPaymentMode(e.target.value)} value = {paymentMode} required>
                            {/* <option value = "select">select</option> */}
                            <option value="cash">CASH</option>
                            <option value="online">ONLINE</option>
                        </select>
                    </div>
                    {
                      paymentMode === 'online' ? 
                      (
                      <div className="col-4 row-2 mb-2 d-flex">
                      <div className="paymentMode">
                          <span>UPI:</span>
                      </div>
                      <select className="form-select options" aria-label="Default select example" onChange={(e) => setUpi(e.target.value)} value = {upi} required>
                          <option selected>select</option>
                          <option value="paytm">PAYTM</option>
                          <option value="gpay">GPAY</option>
                          <option value="phonePay">PHONE PAY</option>
                          <option value="creditCard">CREDIT CARD</option>
                          <option value="bankDeposit">BANK DEPOSIT</option>
                          <option value="other">OTHER</option>
                      </select>
                      {/* {
                            upi === 'other' ?
                            (
                              <input type = "text" placeholder = "Please Specify" onChange={(e) => setUpi(e.target.value)} value = {upi}></input>
                            ) : ''
                      } */}
                  </div>) : ""

                    }
                    

                    {
                      paymentMode === 'online' ? 
                      (
                        <>
                        <div className="col-4 row-3 mb-2">
                        <div className="address">
                            <span>ADDRESS: {presentAddress}</span>
                        </div>
                    </div>
                      <div className="col-4 row-3 mb-2">
                      <div className="transactionId">
                          <span>TRANSACTION NO:</span>
                          <input type="text" value = {transactionId} onChange={(e)=>setTransactionId(e.target.value)}/>

                      </div>
                      </div>
                      <div className="col-4 row-3 mb-2">
                      <div className="transactionDate">
                          <span>TRANSACTION DATE:</span>
                          <input type="text" value = {transactionDate} onChange={(e)=>setTransactionDate(e.target.value)}/>

                      </div>
                      </div>
                      </>
                      ) : 
                      (
                    <div className="col-12 row-3 mb-2">
                        <div className="address">
                            <span>ADDRESS: {presentAddress}</span>
                        </div>
                    </div> 
                      )
                    }
                    <div className="col-12 row-4  d-flex gap-3">
                      <div className="div col-6 d-flex">
                        <div className="purpose">
                            <span>ASSIGNED TO: {assignedAyaName}</span>
                        </div>
                        {/* <select className="form-select options" aria-label="Default select example" required>
                            <option selected>select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select> */}
                        </div>
                        <div className="col-6 d-flex">
                        <div className="purpose">
                            <span>PURPOSE OF : {assignedAyaPurpose}</span>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 row-5 mb-2">
                        <div className="mobile col-4">
                            <span>MOBILE NO: {contactNumber}</span>
                        </div>
                        <div className="rate col-5">
                                <span>RATE:</span>
                                    <input type="number" min="0" value={rate} onChange={(e)=>setRate(e.target.value)}/>
                            {/* <span></span> */}
                        </div>
                        <div className="securityMoney col-4 d-flex">
                        <span>SECURITY MONEY:</span>{securityAmount}
                        </div>
                    </div>
                    <div className="col-12 row-6 mb-2">
                        <div className="duration col-4">
                            <label required>FROM DATE:
                            <input type="date" value = {fromDate} onChange={(e)=>setFromDate(e.target.value)}/>
                            </label>
                        </div>
                        <div className="to col-4">
                            <label required>TO DATE:
                            <input type="date" value = {toDate} onChange={(e)=>setToDate(e.target.value)}/>
                            </label>
                        </div>
                        <div className="leave col-3">
                          <label>LEAVE :  
                            <input value = {leaveTaken} min = "0" type = "number" onChange={(e) => setLeaveTaken(e.target.value)} ></input>
                          </label>
                        </div>
                        <div className="total col-4">
                            <span>WORKING DAYS: </span>{get_diff_days()-leaveTaken}
                        </div>
                    </div>

                

                    <div className="col-12 row-7 mb-2">
                        <div className="amountInWord">
                            <span>TOTAL AMOUNT (IN WORDS): {convertNumberToWords(generatedBill)}</span>
                        </div>
                    </div>
                    <div className="col-12 row text-center mt-3 mb-5">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <div className="display text-start">
                                <span className='currency'>RS-</span>
                               
                                <span className='amount'> {generatedBill}/-</span>
                                
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                    <div className="col-6 text-center mb-2">
                        <div className="line">
                            <hr></hr>
                        </div>
                        <span>CUSTOMER SIGNATURE</span>
                    </div>
                    <div className="col-6 text-center mb-2">
                        <div className="line">
                            <hr></hr>
                        </div>
                        <span>FOR: JOY GURU JANAKALYAN TRUST & SERVICE</span>
                    </div>
                </div>

            </div>
            {
              (showGeneratedButton && !showUpdateButton) ?  (
                
                <div className="print-btn text-center billButton">
                <button className='btn bg-primary text-white' onClick = {()=>fetchCustomerData()} >Generate Bill</button>
                </div>
                
              ) : (
                // ()=>(
                  <div className="print-btn text-center billButton">
                  <button className='btn bg-primary text-white'>Update Bill</button>
                  </div>
              )
            }
            </form>
        </div>
      </div>
      {generatedInvoice.length > 0 && (
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
                          <th className="">Date</th>
                          <th className="">Customer Code</th>
                          <th className="">Generated Bill</th>
                          <th className="">Payment Mode</th>
                          <th className="">To Data</th>
                          <th className="">From Date</th>
                          <th className="">Rate</th>
                          <th className="">Aya Assigned</th>
                          <th className="">Download Bill</th>
                          <th className="">Edit</th>

                          {/* <th className="">Invoice</th> */}
                        </tr>
                      </thead>
                      <tbody>
                      {generatedInvoice.map((item, index) => {
                        if (item) {
                          return (
                            <tr key={item.generatedCustomerId}>
                              <td>{index + 1}</td>
                              <td>{item.generatedDate}</td>
                              <td>{customerCode}</td>
                              <td>{item.generatedBill}</td>
                              <td>{item.generatedPaymentMode}</td>
                              <td>{item.generatedToDate}</td>
                              <td>{item.generatedFromDate}</td>
                              <td>{item.generatedRate}</td>
                              <td>{item.generatedAyaAssigned}</td>
                              <td>
                                <button className="btn bg-primary text-white" onClick={() => fetchPrintDetails(index)}>Print</button>
                              </td>
                              <td>
                                <button className="btn bg-secondary text-white" onClick={() => fetchEditDetails(index)}>Edit</button>
                              </td>
                            </tr>
                          );
                        }
                      }).reverse()}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </Container>

      </section>
      )}
      </>
      }
    </>
  )
}
    

export default adminLayout(CustomerPaymentReceipt)