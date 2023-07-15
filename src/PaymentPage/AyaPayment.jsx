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

      const reversePaymentData = techData.ayaPaymentDetails.reverse();
      setAyaPaymentDetails(reversePaymentData);

      console.log("her payment details",techData)

      const reverseBillData = techData.ayaGeneratedInvoice.reverse();
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
            <Col md="3">
              <div className="profile-sidebar">
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                  <div className="profile-userpic">
                    <img
                      src={`${URL}/${tech.file}`}
                      className="img-responsive profile-img-center"
                      alt=""
                    />
                  </div>
                  <div className="profile-usertitle">
                    <div className="profile-usertitle-name">{tech.name}</div>
                    <div className="profile-usertitle-job">
                      Aya Code :{" "}
                      <span style={{ textTransform: "lowercase" }}>
                        {tech.ayaCode}
                      </span>
                    </div>
                  </div>
                  <div className="profile-userbuttons">
                    <button
                      type="button"
                      className="btn btn-success btn-sm mb-3"
                      onClick={handleRowRemove}
                    >
                      Edit
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
            </Col>

            {showbox ? (
              <>
                <Col md="9">
                  {/* {
                    showGeneratedButton && (
                      <div className="invoice-button text-end">
                      <button className="btn bg-primary text-white" onClick={handleInvoice}>Go To Generate Bill</button>
                      </div>
                    )
                  } */}

                  <div className="my-3 p-3 bg-body rounded shadow-sm detailPage">
                      <h6 className="border-bottom pb-2 mb-0 mb-3 ">
                        Personal Info
                      </h6>
                    <Form onSubmit={handleFormSubmit}>
                      <Row>
                        <Col md="3">
                          <label>Aya bill:</label>
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
                          <label>Amount Recieved:</label>
                          <input
                            type="text"
                            name="amount_received"
                            value={amountPaid}
                            className={`form-control `}
                            onChange={(e) => setAmountPaid(e.target.value)}
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
                          <label>Assigned Customer</label>
                          <input
                            type="text"
                            value={assignedCustomerName}
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
                        {/* <Col md="3">
                          <label>Security Amount</label>
                          <input
                            type="text"
                            // value={amountRec}
                            className={`form-control `}
                            // onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col> */}
                        <Col md="3">
                          <label>Purpose</label>
                          <input
                            type="text"
                            value={assignedCustomerPurpose}
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

                        <Col md="12">
                          <div className="mt-3">
                            <button
                              type="submit"
                              className="btn bg-primary text-white"
                              // onClick={calculate}
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
                <>
                  <Col md="9">
                    <div className="my-3 p-3  bg-body rounded shadow-sm detailPage">
                      <div className="h-100 text-center">
                        <img
                          src={assignCustomer}
                          className="img-fluid"
                          alt=""
                          style={{ height: "100px" }}
                        />
                        <h3>Please assign Customer</h3>
                        <button
                          className="btn btn-success btn-sm mb-3"
                          onClick={handleCustomer}
                        >
                          Assign Customer
                        </button>
                      </div>
                    </div>
                  </Col>
                </>
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
                          <th className="">Aya Bill</th>
                          <th className="">Aya Paid</th>
                          <th className="">From Data</th>
                          <th className="">To Date</th>
                          <th className="">Assigned Customer</th>
                          <th className="">Rate</th>
                          <th className="">Purpose</th>
                          <th className="">Leave</th>
                          <th className="">Working Days</th>

                          {/* <th className="">Invoice</th> */}
                        </tr>
                      </thead>
                      <tbody>
                      {(ayaPaymentDetails[0]) && ayaPaymentDetails.map((item, index) => {
                        if (item) {
                          return (
                            <tr key={item.generatedAyaId}>
                              <td>{item.paymentBill}</td>
                              <td>{item.paymentAmountReceived}</td>
                              <td>{item.paymentFromDate}</td>
                              <td>{item.paymentToDate}</td>
                              <td>{item.paymentCustomerAssigned}</td>
                              <td>{item.paymentRate}</td>
                              <td>{item.paymentCustomerPurpose}</td>
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

export default adminLayout(AyaPayment);
