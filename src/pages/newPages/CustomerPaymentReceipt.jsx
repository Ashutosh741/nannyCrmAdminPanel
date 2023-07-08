import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useReactToPrint } from "react-to-print";
import '../../assets/css/customerPayment.css';
import logo from "../../assets/images/logo.png";
import adminLayout from '../../hoc/adminLayout';
import axios from "axios";
import { Form, Navigate, useParams } from "react-router-dom";
import { URL } from "../../Url";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as XLSX from "xlsx";
import { Pagination } from "react-bootstrap";

// --------SMALL CHANGES ---------

// leave days input 
// aya assigned


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
    const [currentPage, setCurrentPage] = useState(1);
    const [leaveTaken,setLeaveTaken] = useState(0);
    const itemsPerPage = 10;
    const pageNumbers = Math.ceil(generatedInvoice.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = generatedInvoice.slice(indexOfFirstItem, indexOfLastItem);


  // const handlePageChange = (selectedPage) => {
  //   setCurrentPage(selectedPage.selected);
  // };


    const {id} = useParams();

    const fetchPrintDetails = async(index)=>{
        // alert(index)

        try{
            const response = await axios.get(`${URL}/customerreg/${customerCode}`)
            // console.log("what data is",response.data.data.generatedInvoice[index]);
            const data = response.data.data.generatedInvoice[index];

            // const data = response.data.data;
            setRate(data.generatedRate);
            setFromDate(data.generatedFromDate);
            setToDate(data.generatedToDate);
            setgeneratedBill(data.generatedBill);
            
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
            // console.log("generated Invoice",data.generatedInvoice)
            // setGeneratedInvoice(data.generatedInvoice);
            setGeneratedInvoice(data.generatedInvoice || []); 
            // setCustomerPayment(data.customerpayment);
            setPresentAddress(data.presentAddress); 
            // setCustomerCode(data.customerCode)
            setContactNumber(data.contactNumber);
            setName(data.name);
            setAssignedAyaDetails(data.assignedAyaDetails)
            // console.log(presentAddress)
            // console.log(assignedAyaDetails)
        }
        catch(e){
            console.log("error in fetching customer data:",e)
        }
    }


    // for(let i=0;i<assignedAyaDetails;i++){
    //     const ayaDetails = assignedAyaDetails[i];
    //     // console.log(ayaDetails)
    //     if(ayaDetails[1]<={toDate} && ayaDetails[2] >= {fromDate}){
    //         assignedAyaInBetween+=ayaDetails[0];
    //     }
    // }

    // const fetchTotalBill = async () => {
    //     try {
    //       const response = await axios.get(`${URL}/customerreg/${id}`);
    //       const customerData = response.data.data;
    
    //       let totalCustomerBill = 0;
    //       let totalReceivedAmount = 0;
    
    //       if (Array.isArray(customerData.customerpayment)) {
    //         customerData.customerpayment.forEach((payment) => {
    //           totalCustomerBill += parseInt(payment.customerbill + customerbill);
    //           totalReceivedAmount += parseInt(payment.amount_received + amountRec);
    //         });
    
    //         setTotalCustomerBill(totalCustomerBill);
    //         setTotalReceived(totalReceivedAmount);
    
    //         // console.log("Total customer bill:", totalCustomerBill);
    //         // console.log("Total received amount:", totalReceivedAmount);
    //       } else {
    //         console.error(
    //           "Invalid customer payment data format:",
    //           customerData.customerpayment
    //         );
    //       }
    //     } catch (error) {
    //       console.error("Error fetching customer data:", error);
    //     }
    //   };


    // const filteredCustomerPayments = customerpayment.filter(
    //     (item) =>
    //       item.month.toLowerCase().includes(searchQuery.toLowerCase()) &&
    //       (item.customerbill || item.amount_received)
    //   );
    
    //   const pageNumbers = Array.from(
    //     { length: Math.ceil(filteredCustomerPayments.length / itemsPerPage) },
    //     (_, index) => index + 1
    //   );
    

    // useEffect[()=>{
    //     customerData()
    // },[customerCode]]


    const get_diff_days  =  () => {
        if(toDate && fromDate){
            let diff = parseFloat(new Date(toDate).getTime() - new Date(fromDate).getTime() - leaveTaken);
            // console.log(Math.floor(diff/86400000) + 1);
            // diff -= leaveTaken
            return  Math.ceil(diff/(1000*86400));
        }else{
            // console.log('not a number')
        }
     
    }
    // const generatedBill = get_diff_days()*{rate};
    
    useEffect(()=>{
        // rate
        let calculatedgeneratedBill = (get_diff_days()-leaveTaken) * rate;
        if(calculatedgeneratedBill < 0)calculatedgeneratedBill = 0;
        setgeneratedBill(calculatedgeneratedBill);
        fetchCustomerData();

        // currentTime();
        
    },[fromDate, toDate,rate,customerCode,leaveTaken])

    const tableRef = useRef();

    // console.log(id)

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
              generatedAyaAssigned : "shakuntala"  
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
                generatedAyaAssigned: "shakuntala"
            };
            
            setGeneratedInvoice (prevInvoices => [...prevInvoices, newInvoice]);
            
            setFromDate("");
            setToDate("");
            setRate(0);

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
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <>
      <div className="col-4 ms-3">
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
        
      <div className='container'  ref={tableRef}>
        <div className="row">

            <form onSubmit={handleGenerateBill}>
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
                    <div className="row-1 mb-2">
                        
                        <div className="serial col-5 ms-0">
                        
                            <span>SL NO. {customerCode}</span>
                        </div>
                        <div className="prop col-2 me-5">
                            <span> MR. ABHIJIT PODDAR</span>
                        </div>
                        <div className="date col-4 me-5">
                            <span>PAYMENT DATE: </span>{date}
                        </div>
                    </div>
                    <div className="col-12 row-2 mb-2">
                        <div className="partyName">
                            <span>PARTY NAME: {name}</span>
                        </div>
                    </div>
                    <div className="col-12 row-3 mb-2">
                        <div className="address">
                            <span>ADDRESS: {presentAddress}</span>
                        </div>
                    </div>
                    <div className="col-8 row-4  d-flex gap-3">
                        <div className="purpose">
                            <span>PURPOSE OF :</span>
                        </div>
                        {/* <div className="options"> */}
                        <select className="form-select options" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </select>
                            {/* </div> */}
                    </div>
                    <div className="col-12 row-5 mb-2">
                        <div className="mobile col-6">
                            <span>MOBILE NO. {contactNumber}</span>
                        </div>
                        <div className="rate col-6">
                                <label>PER DAY RATE : 
                                    <input type="text" value={rate} onChange={(e)=>setRate(e.target.value)}/>
                                </label>
                            {/* <span></span> */}
                        </div>
                    </div>
                    <div className="col-12 row-6 mb-2">
                        <div className="duration col-5">
                            <label>DURATION DATE FROM:
                            <input type="date" value = {fromDate} onChange={(e)=>setFromDate(e.target.value)}/>
                            </label>
                        </div>
                        <div className="to col-4">
                            <label>TO DATE:
                            <input type="date" value = {toDate} onChange={(e)=>setToDate(e.target.value)}/>
                            </label>
                        </div>
                        <div className="total col-2">
                            <span>TOTAL DAYS: </span>{get_diff_days()}
                        </div>
                        <div className="leave col-5">
                          <label>LEAVE: 
                            <input value = {leaveTaken} min = "0" type = "number" onChange={(e) => setLeaveTaken(e.target.value)} ></input>
                          </label>
                        </div>
                    </div>

                

                    <div className="col-12 row-7 mb-2">
                        <div className="amountInWord">
                            <span>TOTAL AMOUNT (IN WORDS): {convertNumberToWords(generatedBill)}</span>
                        </div>
                    </div>
                    <div className="row text-center mt-3 mb-5">
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
              showGeneratedButton &&(
                <div className="print-btn text-center billButton">
                <button className='btn bg-primary text-white' onClick = {()=>fetchCustomerData()} >Generate Bill</button>
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
                {/* <Col md="4">
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Search by month"
                      value={searchQuery}
                      className="form-control"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </Col> */}
                <Col md="12" className="mt-2">
                  <div className="my-3 text-end"></div>
                  <div className="table-responsive rounded-3">
                    <table className="table table-responsive table-sm table-stripped table-bordered p-0">
                      <thead className="bg-blue text-white">
                        <tr className="text-uppercase">
                          <th>Sr. No</th>
                          <th className="">Customer Code</th>
                          <th className="">Time</th>
                          <th className="">Generated Bill</th>
                          <th className="">To Data</th>
                          <th className="">From Date</th>
                          <th className="">Rate</th>
                          <th className="">Aya Assigned</th>
                          <th className="">Download Bill</th>
                          
                          {/* <th className="">Invoice</th> */}

                        </tr>
                      </thead>
                      <tbody>
                      {currentItems.map((item, index) => {
                        if (item) {
                          return (
                            <tr key={item.generatedCustomerId}>
                              <td>{index + 1}</td>
                              <td>{customerCode}</td>
                              <td>{item.generatedTime}</td>
                              <td>{item.generatedBill}</td>
                              <td>{item.generatedToDate}</td>
                              <td>{item.generatedFromDate}</td>
                              <td>{item.generatedRate}</td>
                              <td>{item.generatedAyaAssigned}</td>
                              <td>
                                <button className="btn bg-primary text-white" onClick={() => fetchPrintDetails(index)}>Print</button>
                              </td>
                            </tr>
                          );
                        }
                      }).reverse()}
                      

                      </tbody>

                    </table>
                  </div>
                  <Pagination>
                    {Array.from({ length: pageNumbers }).map((_, index) => {
                      const number = index + 1;
                      return (
                        <Pagination.Item
                          key={number}
                          active={number === currentPage}
                          onClick={() => setCurrentPage(number)}
                        >
                          {number}
                        </Pagination.Item>
                      );
                    })}
                  </Pagination>


                </Col>
              </Row>
            </Container>

      </section>
      )}
    </>
  )
}


export default adminLayout(CustomerPaymentReceipt)