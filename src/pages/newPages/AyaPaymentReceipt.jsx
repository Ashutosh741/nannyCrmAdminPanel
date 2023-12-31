import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useReactToPrint } from "react-to-print";
import '../../assets/css/customerPayment.css';
import logo from "../../assets/images/logo.png";
import adminLayout from '../../hoc/adminLayout';
import axios from "axios";
import { Form, Navigate, useParams } from "react-router-dom";
import { URL } from "../../Url";
import { Button, Col, Container, FormGroup, Row , Modal} from "react-bootstrap";



const AyaPaymentReceipt = () => {

    const [name, setName] = useState('')
    const [presentAddress,setPresentAddress] = useState('')
    const [contactNumber,setContactNumber] = useState('')
    const [srNo,setSrNo] = useState('1')
    const [ayaCode, setAyaCode] = useState('')
    const [ayaData, setAyaData] = useState(null)
    const [fromDate,setFromDate] = useState('')
    const [toDate,setToDate] = useState('')
    const [rate,setRate] = useState(0)
    const [ayaId,setAyaId] = useState('');
    const [generatedBill, setgeneratedBill] = useState(0);
    const [assignedCustomerDetails,setAssignedCustomerDetails] = useState([]);
    const [assignedCustomerInBetween,setAssignedCustomerInBetween] = useState([]);
    const [generatedInvoice, setGeneratedInvoice] = useState([]);
    const [showGeneratedButton,setShowGeneratedButton] = useState(true);
    const [leaveTaken,setLeaveTaken] = useState(0);
    const [billFor,setBillFor] = useState('');
    const [assignedCustomerName,setAssignedCustomerName] = useState('');
    const [assignedCustomerPurpose,setAssignedCustomerPurpose] = useState('');
    const [generatedWorkingDays,setGeneratedWorkingDays] = useState('');
    const [paymentMode,setPaymentMode] = useState('Cash');
    const [upi,setUpi] = useState('');
    const[transactionId, setTransactionId] = useState('');
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    // console.log("aya ka cde",ayaCode)
    const [transactionDate,setTransactionDate] = useState(date)
    const[showUpdateButton,setShowUpdateButton] = useState(false);
    const[editIndex,setEditIndex] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null); // State to store the index of the item to delete


    // const [showCuCode,setShowCustomerCode] = useState(false);
    const [showAyaCode,setShowAyaCode] = useState(false);
    // const [ayaCode, setAyaCode] = useState('')

    const {id} = useParams();

    function ReverseString(str) {
      return str.split('-').reverse().join('-');
    }

    
    const handleDeleteBill = (index) => {
      // When the delete button is clicked, set the item index to delete and open the modal
      setItemToDeleteIndex(index);
      setShowModal(true);
    };
  

    const confirmDelete = async () => {
      try {
        const response = await axios.delete(`${URL}/deleteAyaBill/${ayaId}/${itemToDeleteIndex}`);
        const data = response.data; // Use response.data instead of response.json()
        await fetchAyaData()
        // console.log("updated data", data);
        // alert("Bill deleted successfully");
      } catch (error) {
        console.error('Error deleting bill', error);
        alert("Error deleting bill");
      }
      setShowModal(false);
    };


    const cancelDelete = () => {
      // Cancel deletion and close the modal
      setShowModal(false);
      setItemToDeleteIndex(null);
    };

    const fetchEditDetails = async(index)=>{
      setShowUpdateButton(true);
      try{
        const response = await axios.get(`${URL}/ayareg/${ayaCode ? ayaCode : id}`)
        // console.log("what data is",response.data.data.ayaGeneratedInvoice[index]);
        const data = response.data.data.ayaGeneratedInvoice[index];

        // const data = response.data.data;
        setRate(data.generatedRate);
        setFromDate(data.generatedFromDate);
        setToDate(data.generatedToDate);
        // setgeneratedBill(data.generatedBill);
        // setGeneratedWorkingDays(data.generatedWorkingDays);
        // setAssignedAyaPurpose(data.generatedAyaAssigned);
        setAssignedCustomerName(data.generatedCustomerAssigned);
        setLeaveTaken(data.generatedLeaveTaken)
        setGeneratedWorkingDays(data.generatedWorkingDays)
        setAssignedCustomerPurpose(data.generatedCustomerPurpose)
        setPaymentMode(data.generatedPaymentMode);
        setTransactionId(data.generatedTransactionId);
        setTransactionDate(data.generatedTransactionDate);
        setUpi(data.generatedUpi);
        setShowUpdateButton(true);
        setEditIndex(index);
        // if(fromDate){
        //   setFromDate(ReverseString(fromDate))
        // }
        // if(toDate){
        //   setToDate(ReverseString(toDate))
        // }

        // handleGenerateBill();
    }catch(err){
        console.log("error in fetching editing details",err);
    }
    setShowGeneratedButton(false)
    }

    const fetchPrintDetails = async(index)=>{
      // alert(index)

      try{
          const response = await axios.get(`${URL}/ayareg/${ayaCode ? ayaCode : id}`)
          // console.log("what data is",response.data.data.generatedInvoice[index]);
          const data = response.data.data.ayaGeneratedInvoice[index];

          // const data = response.data.data;
          setRate(data.generatedRate);
          setFromDate(data.generatedFromDate);
          setToDate(data.generatedToDate);
          // setgeneratedBill(data.generatedBill);
          // setGeneratedWorkingDays(data.generatedWorkingDays);
          setAssignedCustomerPurpose(data.generatedCustomerAssigned);
          setAssignedCustomerName(data.generatedCustomerAssigned);
          setLeaveTaken(data.generatedLeaveTaken)
          setGeneratedWorkingDays(data.generatedWorkingDays)
          setAssignedCustomerPurpose(data.generatedCustomerPurpose)
          setPaymentMode(data.generatedPaymentMode);
          setTransactionId(data.generatedTransactionId);
          setTransactionDate(data.generatedTransactionDate);
          setUpi(data.generatedUpi);
          

          // handleGenerateBill();
      }catch(err){
          console.log("error in fetching printing details",err);
      }
      setShowGeneratedButton(false)
      setShowUpdateButton(false)
      handlePrint()
    }



    // console.log(props.CustomerCode)
    const fetchAyaData = async()=>{
        try{
            const response = await axios.get(`${URL}/ayareg/${ayaCode ? ayaCode : id}`);
            console.log("Initial data",response.data);
            // console.log(response.data.data._id);
            setAyaId(response.data.data._id)
            setAyaData(response.data.data);
            setAyaCode(response.data.data.ayaCode)
            const data = response.data.data;
            
            // console.log("generated Invoice",data.generatedInvoice)
            // setGeneratedInvoice(data.generatedInvoice);
            setGeneratedInvoice(data.ayaGeneratedInvoice || []); 
            // setCustomerPayment(data.customerpayment);
            setPresentAddress(data.presentAddress); 
            // setCustomerCode(data.customerCode)
            setContactNumber(data.contactNumber);
            setName(data.name);
            if(data.assignedCustomerDetails){
              const reverseData = data.assignedCustomerDetails;
              let len = reverseData.length
              console.log("reversed data",reverseData)
              setAssignedCustomerDetails(reverseData)
              setAssignedCustomerName(reverseData[len-1].assignedCustomerName)
              setAssignedCustomerPurpose(reverseData[len-1].assignedCustomerPurpose)
              setRate(reverseData[len-1].assignedCustomerRate);


              console.log("Here I'm",reverseData[len-1].assignedCustomerName);
            }
            setTransactionDate(date);

            // console.log(presentAddress)
            // console.log(assignedAyaDetails)
        }
        catch(e){
            console.log("error in fetching customer data:",e)
        }
    }



    const get_diff_days = () => {
      if (toDate && fromDate) {
        const toDateParts = toDate.split('-');
        const fromDateParts = fromDate.split('-');
        const toDateObj = new Date(`${toDateParts[1]}-${toDateParts[0]}-${toDateParts[2]}`);
        const fromDateObj = new Date(`${fromDateParts[1]}-${fromDateParts[0]}-${fromDateParts[2]}`);
        // const leaveTakenDays = parseFloat(leaveTaken);
    
        if (!isNaN(toDateObj) && !isNaN(fromDateObj) && !isNaN(leaveTaken)) {
          const diff = Math.floor((toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 86400)) + 1;
          return diff;
        } else {
          console.log('Invalid date or leaveTaken value.');
          return 0; // Or any other appropriate value to indicate an error.
        }
      } else {
        console.log('Missing toDate, fromDate, or leaveTaken value.');
        return 0; // Or any other appropriate value to indicate an error.
      }
    };

    
    useEffect(()=>{
      fetchAyaData();
    },[ayaCode])
  
      

      useEffect(()=>{
        let calculatedgeneratedBill = (get_diff_days()-leaveTaken) * rate;
        if(calculatedgeneratedBill < 0)calculatedgeneratedBill = 0;
        setgeneratedBill(calculatedgeneratedBill);
        setGeneratedWorkingDays(get_diff_days()-leaveTaken);
        // fetchAyaData()
      },[fromDate, toDate,rate,leaveTaken,ayaCode])


      // useEffect(()=>{
      //   checkBillFor();
      //   setCustomerCode('');
      //   setAyaCode('');
      //   setSelectedDate('');
      //   resetBillEntry();
  
      // },[billFor])

      const tableRef = useRef();

      const handlePrint = useReactToPrint({
          content: () => tableRef.current,
          onAfterPrint: ()=>setShowGeneratedButton(true),
      });
  

      const resetBillEntry = ()=>{
        setFromDate("");
        setToDate("");
        setRate(0);
        setAssignedCustomerName("");
        setAssignedCustomerPurpose("");
        setPaymentMode('Cash');
        // setTransactionDate('');
        setSelectedDate('');
        setLeaveTaken('0')
        setSelectedDate('');
      }


      
    const handleUpdateBill = async (e) => {
      // e.preventDefault();
      console.log('paymnet mode, ko kya hoa gya',paymentMode)
      try {

        const updatedInvoice = {
          // id:customerId,
          generatedAyaId: ayaId,
          generatedTime: new Date().toLocaleTimeString(),
          generatedBill: generatedBill,
          generatedToDate: toDate,
          generatedFromDate: fromDate,
          generatedRate: rate,
          generatedCustomerAssigned: assignedCustomerName,
          generatedCustomerPurpose: assignedCustomerPurpose,
          generatedWorkingDays: generatedWorkingDays,
          generatedLeaveTaken: leaveTaken,
          generatedDate: date,
          generatedPaymentMode: paymentMode,
          generatedTransactionId: transactionId,
          generatedUpi: upi,
          generatedTransactionDate: transactionDate,
        };
        const response = await fetch(`${URL}/updateAyaBill?index=${editIndex}`, {
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
        resetBillEntry();
        setShowUpdateButton(false); 
        setButtonDisabled(false);
        // set
        // setShowGeneratedButton(true)

      } catch (err) {
        console.log("error in this customerCode",ayaId);

        console.log("error in submitting Updated Bill",err);
      }
    // setShowGeneratedButton(true)
    };
  

    
    const handleGenerateBill = async (e) => {
      // e.preventDefault();
      try {
        const response = await fetch(`${URL}/ayareg/${ayaId}`, {
          method: "PUT",
          body: JSON.stringify({

            generatedAyaId : ayaId,
            generatedTime : new Date().toLocaleTimeString(),  
            generatedBill: generatedBill,
            generatedToDate : toDate,
            generatedFromDate : fromDate,
            generatedRate : rate,
            generatedCustomerAssigned : assignedCustomerName,
            generatedLeaveTaken : leaveTaken,
            generatedWorkingDays : generatedWorkingDays,
            generatedCustomerPurpose : assignedCustomerPurpose,
            generatedDate : date,
            generatedPaymentMode : paymentMode,
            generatedTransactionId : transactionId,
            generatedUpi : upi,
            generatedTransactionDate : transactionDate
            // generatedWorkingDays : 
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
              generatedAyaId: ayaId,
              generatedTime: new Date().toLocaleTimeString(),  
              generatedBill: generatedBill,
              generatedToDate: toDate,
              generatedFromDate: fromDate,
              generatedRate: rate,
              generatedCustomerAssigned:  assignedCustomerName,
              generatedCustomerPurpose : assignedCustomerPurpose,
              generatedWorkingDays : generatedWorkingDays,
              generatedLeaveTaken : leaveTaken,
              generatedDate : date,
              generatedPaymentMode : paymentMode,
              generatedTransactionId : transactionId,
              generatedUpi : upi,
              generatedTransactionDate : transactionDate
          };
          
          setGeneratedInvoice (prevInvoices => [...prevInvoices, newInvoice]);
        resetBillEntry();
        setButtonDisabled(false); // Disable the button when clicked

      } catch (err) {
        console.log("error in this customerCode",ayaId);

        console.log("error in submitting generatedBill",err);
      }
    // setShowGeneratedButton(true)
    };

    function convertNumberToWords(number) {
      const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
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



    const handleInputChange = (event) => {
      const { value } = event.target;
      setSelectedDate(value);
      console.log('my value is ', value);
    };
    
    const getLastDayOfMonth = () => {
      const [year, month] = selectedDate.split('-');
      const lastDay = new Date(year, month, 0).getDate();
      return lastDay;
    };
    


    useEffect(() => {
      if (selectedDate) {
        const reversedDate = ReverseString(selectedDate);
        setFromDate(`01-${reversedDate}`);
        setToDate(`${getLastDayOfMonth()}-${reversedDate}`);
        console.log('my fromdate', fromDate);
        console.log('my todate', toDate);
      }
    }, [selectedDate]);

    useEffect(()=>{
      setTransactionDate(date);
    },[paymentMode])
    

  return (
    <>
            <div className=" ms-4 d-flex gap-4">
          <div className="col-4">
            <label
                style={{
                display: "inline-block",
                fontSize: "16px",
                marginRight: "20px",
                }}
                className="fw-bold mb-1"
            >
                Aya Code :{" "}
            </label>
            <input
                type="text"
                className="form-control"
                value={ayaCode}
                onChange={(e) => setAyaCode(e.target.value)}
            />

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
              </div>
            </div>
          </div>
          </Col>
          </div>
          <div className='container'  ref={tableRef}>
        <div className="row">

          <form onSubmit={showGeneratedButton ? handleGenerateBill : handleUpdateBill}>
            <div className="col-12">

            <div className="row receipt">
                    <div className="col-4 text-start mb-4">
                        <img src = {logo} className='companyLogo img-fluid'/>
                    </div>
                    <div className="col-4">
                      <div className="receipt_back">
                      <h6 className="mt-2">PAYMENT RECEIPT</h6>
                      </div>
                    </div>
                    <div className="col-4 contactNumber">
                        <span className="nobreak">MOBILE NO : 97349-15314<br></br></span>
                        <span>70010-85855</span>
                    </div>
                    <div className="col-12 companyName mt-2">
                        <span>Joy Guru Janakalyan Trust <span style = {{color : "black",fontWeight:"bolder"}}>&</span> Service</span>
                    </div>
                    <div className="col-12 companyAddress mb-2">
                        <span>SARBAMANGALA PALLY, M.K ROAD, ENGLISH BAZAR, MALDA - 732101</span>
                    </div>
                    <div className="col-12  text-center mb-2">
                            <span className="prop"> MR. ABHIJIT PODDAR</span>
                    </div>
                    <div className="col-12 row-1 mb-2">
                        
                        <div className="serial col-6">
                        
                            <span>SL NO.<strong> {ayaCode}</strong></span>
                        </div>

                        <div className="date col-6">
                            <span>PAYMENT DATE: </span><strong>{date}</strong>
                        </div>
                    </div>
                    <div className="col-12 row-2 d-flex mb-2">
                      <div className="col-6">
                        <div className="partyName">
                            <span>AYA NAME: <strong>{name}</strong></span>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="paymentMode fw-bold d-flex">
                            <span>PAYMENT MODE : </span>
                        <select className="form-select options" aria-label="Default select example"   onChange={(e) => setPaymentMode(e.target.value)} value = {paymentMode} required>
                            {/* <option value = "select">select</option> */}
                            <option value="cash">CASH</option>
                            <option value="online">ONLINE</option>
                        </select>
                        </div>

                    </div>
                    </div>

                    {
                      paymentMode === 'online' ? 
                      (
                        <>
                        <div className="col-12 row-3 d-flex mb-2">
                        <div className="address col-6">
                            <span>ADDRESS: <strong>{presentAddress}</strong></span>
                        </div>
                        <div className="col-6">
                      <div className="paymentMode d-flex">
                          <span>UPI:</span>
                          <select className="form-select options fw-bold" aria-label="Default select example" onChange={(e) => setUpi(e.target.value)} value = {upi} required>
                          <option selected>select</option>
                          <option value="paytm">PAYTM</option>
                          <option value="gpay">GPAY</option>
                          <option value="phonePay">PHONE PAY</option>
                          <option value="creditCard">CREDIT CARD</option>
                          <option value="bankDeposit">BANK DEPOSIT</option>
                          <option value="other">OTHER</option>
                      </select>
                      </div>

                  </div>
                    </div>

                  </>
                  ) : ""

                    }
                    

                    {
                      paymentMode === 'online' ? 
                      (
                        <>
                      <div className="d-flex">
                      <div className="col-12 row-3 mb-2">
                      <div className="transactionId">
                          <span>TRANSACTION NO:</span>
                          <input type="text" className="fw-bold" value ={transactionId} onChange={(e)=>setTransactionId(e.target.value)}/>

                      </div>
                      </div>
                      {/* <div className="col-6 row-3 mb-2">
                      <div className="transactionDate">
                          <span>TRANSACTION DATE:</span>
                          <input type="text" value = {transactionDate} onChange={(e)=>setTransactionDate(e.target.value)}/>

                      </div>
                      </div> */}
                      </div>
                      </>
                      ) : 
                      (
                    <div className="col-12 row-3 mb-2">
                        <div className="address">
                            <span>ADDRESS:<strong>{presentAddress}</strong></span>
                        </div>
                    </div> 
                      )
                    }
                    <div className="col-12 row-4  d-flex mb-2">
                      <div className="div col-6 d-flex">
                        <div className="purpose">
                            <span>PARTY NAME: <strong>{assignedCustomerName}</strong></span>
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
                            <span>PURPOSE OF : <strong>{assignedCustomerPurpose}</strong></span>
                        </div>
                        </div>
                    </div>
                    <div className="col-12 row-5 mb-2">
                        <div className="mobile col-6">
                            <span>MOBILE NO:<strong>{contactNumber}</strong></span>
                        </div>
                        <div className="rate col-6">
                                <span>RATE: <span className="fw-bold me-2">Rs</span></span>
                                <input type="number" min="0" value={rate}/>
                        </div>
                        {/* <div className="securityMoney col-4 d-flex">
                        <span>SECURITY MONEY:</span>{securityAmount}
                        </div> */}
                    </div>
                    <div className="col-12 row-6 mb-2">
                        {/* <div className="duration col-6">
                            <label required>FROM DATE:
                            <input type="text" value = {fromDate} onChange={(e)=>setFromDate(e.target.value)}/>
                            </label>
                        </div> */}
                        <div className="duration col-6">
                            <label required>FROM DATE:
                            <input type="text" className="fw-bold" value = {fromDate} onChange={(e)=>setToDate(e.target.value)}/>
                            </label>
                        </div>
                        <div className="to col-6">
                            <label required>TO DATE:
                            <input type="text" className="fw-bold" value = {toDate} onChange={(e)=>setToDate(e.target.value)}/>
                            </label>
                        </div>

                    </div>

                    <div className="col-12 row-6 mb-2">
                    <div className="leave col-6">
                          <label>LEAVE :  
                            <input value = {leaveTaken} className="fw-bold" min = "0" type = "number" onChange={(e) => setLeaveTaken(e.target.value)} ></input>
                          </label>
                        </div>
                        <div className="total col-6">
                            <span>WORKING DAYS: </span><strong>{get_diff_days()-leaveTaken}</strong>
                        </div>
                    </div>

                    <div className="col-12 row-7 mb-2">
                        <div className="amountInWord">
                            <span>TOTAL AMOUNT (IN WORDS):<strong> {convertNumberToWords(generatedBill)}</strong></span>
                        </div>
                    </div>
                    <div className="col-12 row text-center mt-3 mb-5">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <div className="display text-start">
                                <span className='currency'>RS-</span>
                               
                                <span className='amount'> <strong>{generatedBill}</strong>/-</span>
                                
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                    <div className="col-6 text-center mb-2">
                        <div className="line">
                            <hr></hr>
                        </div>
                        <h6>CUSTOMER SIGNATURE</h6>
                    </div>
                    <div className="col-6 text-center mb-2">
                        <div className="line">
                            <hr></hr>
                        </div>
                        <h6>FOR: JOY GURU JANAKALYAN TRUST & SERVICE</h6>
                    </div>
                </div>

            </div>
            {
              (showGeneratedButton && !showUpdateButton) ? (
                <div className="print-btn text-center billButton">
                  <button
                    className='btn bg-primary text-white'
                    onClick={() => {
                      handleGenerateBill();
                      setButtonDisabled(true); // Disable the button when clicked
                    }}
                    disabled={buttonDisabled} // Set the disabled attribute
                  >
                    {buttonDisabled ? 'Generating...' : 'Generate Bill'}
                  </button>
                </div>
              ) : (
                (showUpdateButton) ? (
                  <div className="print-btn text-center billButton">
                    <button
                      className='btn bg-primary text-white'
                      onClick={(e) => {
                        handleUpdateBill(e);
                        setButtonDisabled(true); // Disable the button when clicked
                      }}
                      disabled={buttonDisabled} // Set the disabled attribute
                    >
                      {buttonDisabled ? 'Updating...' : 'Update Bill'}
                    </button>
                  </div>
                ) : null
              )
            }

            </form>
        </div>
          </div>
      {generatedInvoice && (
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
                          <th className="">Aya Code</th>
                          <th className="">Generated Bill</th>
                          <th className="">Payment Mode</th>
                          <th className="">From Date</th>

                          <th className="">To Data</th>
                          <th className="">Rate</th>
                          <th className="">Aya Assigned</th>
                          <th className="">Download Bill</th>
                          <th className="">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                      {generatedInvoice.map((item, index) => {
                        if (item) {
                          return (
                            <tr key={item.generatedAyaId}>
                              <td>{index + 1}</td>
                              <td>{item.generatedDate}</td>
                              <td>{ayaCode}</td>
                              <td>{item.generatedBill}</td>
                              <td>{item.generatedPaymentMode}</td>
                              <td>{item.generatedFromDate}</td>

                              <td>{item.generatedToDate}</td>
                              <td>{item.generatedRate}</td>
                              <td>{item.generatedCustomerAssigned}</td>
                              <td>
                                <button className="btn bg-primary text-white" onClick={() => fetchPrintDetails(index)}>Print</button>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                <button className="btn bg-secondary text-white" onClick={() => fetchEditDetails(index)}>
                                <i class="fa-solid fa-pen-to-square"></i>

                                </button>
                                <button className="btn bg-danger text-white" onClick={() => handleDeleteBill(index)}>
                                <i class="fa-solid fa-trash"></i>

                                </button>

                                </div>
                              </td>
                            </tr>
                          );
                        }
                      }).reverse()}
                      </tbody>
                      <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={cancelDelete}>
                          Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    </table>
                  </div>
                </Col>
              </Row>
            </Container>

      </section>
      )}
    </>
  )
}

export default adminLayout(AyaPaymentReceipt)
