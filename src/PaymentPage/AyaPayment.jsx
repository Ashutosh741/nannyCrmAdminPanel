import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../Url";
import assignCustomer from "../assets/images/assignCustomer.png";

function AyaPayment() {
  const [tech, setTech] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [showbox, setShowbox] = useState(true);
  const [customerbill, setCustomerbill] = useState("");
  const [aayaPaid, setAayaPaid] = useState("");
  const [profit, setProfit] = useState("");
  const [date, setDate] = useState("");
  const [assigncheck, setAssignCheck] = useState("");
  const [assigndata, setAssignData] = useState([]);
  const [generatedBill,setGeneratedBill] = useState('');
  const [amountPaid, setAmountPaid] = useState("");
  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState('')
  const [rate,setRate] = useState(0);
  const [assignedCustomerName, setAssignedCustomerName] = useState("");
  const [assignedCustomerPurpose, setAssignedCustomerPurpose] = useState("");
  const [leaveTaken,setLeaveTaken] = useState(0);
  const [generatedWorkingDays,setGeneratedWorkingDays] = useState('');
  const [ayaPaymentDetails,setAyaPaymentDetails] = useState([]);
  const [generatedInvoice, setGeneratedInvoice] = useState([]);
  const [ayaCode,setAyaCode] = useState('');
  
  // const [customerPaymentDetails,setCustomerPaymentDetails] = useState([]);


  const { id } = useParams();

  const navigate = useNavigate();

  // const apiTechid = () => {
  //   axios.get(`${URL}/ayareg/${id}`).then((res) => setTech(res.data.data));
  //   console.log(tech);
  // };

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${id}`);
      const techData = response.data.data;
      setTech(techData);
      const assignCustomer = techData.assign;
      // const assignCustomer = techData.assign;
      setAssignCheck(assignCustomer);

      setAyaCode(techData.ayaCode)
      const reversePaymentData = techData.ayaPaymentDetails.reverse();
      setAyaPaymentDetails(reversePaymentData);

      console.log("her payment details",techData)

      const reverseBillData = techData.ayaGeneratedInvoice.reverse();
      setGeneratedInvoice(reverseBillData);
      setGeneratedBill(reverseBillData[0].generatedBill)
      setFromDate(reverseBillData[0].generatedFromDate);
      setToDate(reverseBillData[0].generatedToDate);
      setRate(reverseBillData[0].generatedRate);
      setAssignedCustomerName(reverseBillData[0].generatedCustomerAssigned);
      setAssignedCustomerPurpose(reverseBillData[0].generatedCustomerPurpose);
      setLeaveTaken(reverseBillData[0].generatedLeaveTaken);
      setGeneratedWorkingDays(reverseBillData[0].generatedWorkingDays);

      


      console.log("reveresal data",reverseBillData[0])



      console.log("assign check to the customer  ", assignCustomer);
      // if (assignCustomer !== "Not Assign") {
      //   setShowbox(true);
      // } else {
      //   setShowbox(false);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const apiCustomerid = () => {
    axios.get(`${URL}/customerreg/`).then((res) => setCustomer(res.data.data));
    console.log("customer", customer);
  };

  const resetForm = () => {
    setCustomerbill("");
    setAayaPaid("");
    // setMonth("");
    setDate("");
    setProfit("");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/ayareg/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          paymentBill: generatedBill,
          paymentAmountReceived: amountPaid,
          paymentFromDate: fromDate,
          paymentToDate: toDate,
          paymentRate: rate,
          paymentCustomerAssigned: assignedCustomerName,
          paymentCustomerPurpose: assignedCustomerPurpose,
          paymentWorkingDays : generatedWorkingDays,
          paymentLeaveTaken : leaveTaken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchCustomerData();
      const data = await response.json();
      console.log("check out the updatd data",data);
      alert("data Submitted Succesfully");
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowRemove = () => {
    // setBorder(true);
  };

  useEffect(() => {
    fetchCustomerData();
    apiCustomerid();
    fetchTotalBill();
    assigndataget();
  }, [id, assigncheck,amountPaid]);

  useEffect(() => {
    fetchCustomerData();
    // console.log("yeah running 2nd useeffect")
    // fetchTotalBill();
  }, []);


  console.log("id", id);

  // const handlebox = (e) => {
  //   e.preventDefault();
  //   setShowbox(true);
  // };

  // console.log("totalProfit", totalProfit);


  const handleCustomer = () => {
    console.log("assign Customer screen");
    navigate(`/ayaassign/${id}`);
  };

  const fetchTotalBill = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${id}`);
      const customerData = response.data.data;

      let totalCustomerBill = 0;
      let totalReceivedAmount = 0;
      let totalProfitAmount = 0;

      if (Array.isArray(customerData.ayapayment)) {
        customerData.ayapayment.forEach((payment) => {
          totalCustomerBill += parseInt(payment.customerbill + customerbill);
          totalReceivedAmount += parseInt(payment.ayapaid + aayaPaid);
          totalProfitAmount += parseInt(payment.profit + profit);
        });

        // setTotalCustomerBill(totalCustomerBill);
        // setAyaTotalReceived(totalReceivedAmount);
        // setTotalProfit(totalProfitAmount);

        // console.log("Total customer bill:", totalCustomerBill);
        // console.log("Total received amount:", totalReceivedAmount);
      } else {
        console.error(
          "Invalid customer payment data format:",
          customerData.customerpayment
        );
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const assigndataget = () => {
    axios
      .get(`${URL}/customerreg/${assigncheck}`)
      .then((res) => {
        setAssignData(res.data.data);

        if (
          res.data.data.customerpayment &&
          res.data.data.customerpayment.length > 0
        ) {
          const lastPayment =
            res.data.data.customerpayment[
              res.data.data.customerpayment.length - 1
            ];
          const lastCustomerBill = lastPayment.amount_received;
          // setLastCustomerBill(lastCustomerBill);
          console.log("Last Customer Bill:", lastCustomerBill);
          setCustomerbill(lastCustomerBill);
        } else {
          console.log("No customer payment data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>    
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
      
    </>
  );
}

export default adminLayout(AyaPayment);
