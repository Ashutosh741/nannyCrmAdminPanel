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

  const handleInvoice = ()=>{
    // console.log(id)
    navigate(`/generateBill/${id}`)
  }
  // const {id} = useParams();


  const [tech, setTech] = useState([]);

  const [aya, setAya] = useState([]);
  const [ayaCost, setAyaCost] = useState("");
  const [amountRec, setAmountRec] = useState("");
  const [currentbal, setCurrentBal] = useState(0);
  const [paymentstatus, setPaymentStatus] = useState("");
  const [customerbill, setCustomerbill] = useState("");
  const [securityAdjustment, setSecurityAdjustment] = useState("");
  const [month, setMonth] = useState("");
  const [securityAmount, setSecurityAmount] = useState("");
  const [date, setDate] = useState("");
  const [customerpayment, setCustomerPayment] = useState([]);
  const [showbox, setShowbox] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const [border, setBorder] = useState(false);
  const [totalCustomerBill, setTotalCustomerBill] = useState("");
  const [totalRecieved, setTotalReceived] = useState("");
  const [generatedBill,setGeneratedBill] = useState('');

  const [checkassign, setChcekAssign] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${id}`);
      const techData = response.data.data;
      setTech(techData);
      console.log("techdata" , techData)
      setGeneratedBill(techData.generatedInvoice[0].generatedBill);
      console.log("generated bill" , techData.generatedInvoice[0].generatedBill)
      setCustomerPayment(techData.customerpayment);
      const assigncheck = techData.assign;
      // console.log(techData.generatedInvoice.generatedBill)
      setChcekAssign(assigncheck);
      // console.log("checking assing check", assigncheck);

      if (assigncheck !== "Not Assign") {
        setShowbox(true);
      } else {
        setShowbox(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowRemove = () => {
    setBorder(true);
  };

  console.log("id", id);
  const resetForm = () => {
    setCustomerbill("");
    setPaymentStatus("");
    setAmountRec("");
    setMonth("");
    setDate("");
    setCurrentBal("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/customerreg/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          customerbill: generatedBill,
          paymentstatus: paymentstatus,
          amount_received: amountRec,
          month: month,
          currentdate: date,
          balance: currentbal,
          totalCustomerBill: totalCustomerBill,
          totalRecievedmoney: totalRecieved,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchCustomerData();

      const data = await response.json();
      // console.log(data);

      // console.log("Total customer bill:", totalCustomerBill);
      // console.log("Total received amount:", totalRecieved);

      alert("data Submitted Succesfully");
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(ayaCost);
  console.log(amountRec);

  const calculate = () => {
    // console.log(customerbill);
    // console.log(securityAmount);
    // console.log(securityAdjustment);
    // console.log(amountRec);

    // console.log(month);
    const total = amountRec - customerbill;
    // console.log(total);
    // console.log(securityAdjustment);
    setTotalCustomerBill(totalCustomerBill);
    setTotalReceived(totalRecieved);
    setTotalCustomerBill(parseInt(totalCustomerBill) + parseInt(customerbill));
    setTotalReceived(parseInt(totalRecieved) + parseInt(amountRec));
    if (total > 0) {
      // alert("zero se upr h");
      setPaymentStatus("Advance");
      setCurrentBal(total);
    } else if (total == 0) {
      setPaymentStatus("Amount Clear");
      setCurrentBal(total);
    } else {
      // alert("zeroo se niche hai");
      setPaymentStatus("Pending");
      setCurrentBal(total);
    }
    // console.log(paymentstatus);
    setBorder(true);
  };

  useEffect(() => {
    fetchCustomerData();
    fetchTotalBill();
  }, [id]);

  // const pageNumbers = Math.ceil(customerpayment.length / itemsPerPage);
  // const pageNumbers = Array.from(
  //   { length: Math.ceil(customerpayment.length / itemsPerPage) },
  //   (_, index) => index + 1
  // );

  const filteredCustomerPayments = customerpayment.filter(
    (item) =>
      item.month.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (item.customerbill || item.amount_received)
  );

  const pageNumbers = Array.from(
    { length: Math.ceil(filteredCustomerPayments.length / itemsPerPage) },
    (_, index) => index + 1
  );

  const handleAssign = () => {
    // console.log("Payement Assign");
    navigate(`/customerassign/${id}`);
  };

  const fetchTotalBill = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${id}`);
      const customerData = response.data.data;

      let totalCustomerBill = 0;
      let totalReceivedAmount = 0;

      if (Array.isArray(customerData.customerpayment)) {
        customerData.customerpayment.forEach((payment) => {
          totalCustomerBill += parseInt(payment.customerbill + customerbill);
          totalReceivedAmount += parseInt(payment.amount_received + amountRec);
        });

        setTotalCustomerBill(totalCustomerBill);
        setTotalReceived(totalReceivedAmount);

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

  // pagination



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customerpayment.slice(indexOfFirstItem, indexOfLastItem);

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
                  <div class="profile-userbuttons">
                    <button
                      type="button"
                      class="btn btn-success btn-sm mb-3"
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
                  <div className="invoice-button text-end">
                      <button className="btn bg-primary text-white" onClick={handleInvoice}>Download Invoice</button>
                  </div>
                  <div className="my-3 p-3 bg-body rounded shadow-sm detailPage">
                      <h6 className="border-bottom pb-2 mb-0 mb-3 ">
                        Personal Info
                      </h6>
                    <Form onSubmit={handleFormSubmit}>
                      <Row>
                        <Col md="6">
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
                        {/* <Col md="6">
                      <label>Security Deposit Amount:</label>
                      <input
                        type="text"
                        name="securityAmount"
                        value={tech.securityAmount || ""}
                        className={`form-control `}
                        onChange={(e) => setSecurityAmount(e.target.value)}
                      />
                    </Col> */}

                        {/* <Col md="6">
                      <FormGroup>
                        <label>Security Deposit Adjustment:</label>
                        <select
                          className={`form-control  form-select `}
                          name="securityAdjustment"
                          value={securityAdjustment || ""}
                          onChange={(e) =>
                            setSecurityAdjustment(e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Adjustment">Adjustment</option>
                          <option value="payment">Payment</option>
                        </select>
                      </FormGroup>
                    </Col> */}

                        <Col md="6">
                          <label>Amount Recieved:</label>
                          <input
                            type="text"
                            name="amount_received"
                            value={amountRec}
                            className={`form-control `}
                            onChange={(e) => setAmountRec(e.target.value)}
                          />
                        </Col>

                        <Col md="6">
                          <label>Current Date</label>
                          <input
                            type="date"
                            name="currentdate"
                            required
                            value={date || ""}
                            className={`form-control `}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </Col>

                        <Col md="6">
                          <label htmlFor="">Month</label>
                          <select
                            className={`form-control   form-select`}
                            aria-label="Default select example"
                            name="month"
                            value={month || ""}
                            onChange={(e) => setMonth(e.target.value)}
                            required
                          >
                            <option selected>Open this select menu</option>
                            <option value="Jan">Jan</option>
                            <option value="Feb">Feb</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="Aug">Aug</option>
                            <option value="Sep">Sep</option>
                            <option value="Oct">Oct</option>
                            <option value="Nov">Nov</option>
                            <option value="Dec">Dec</option>
                          </select>
                        </Col>

                        {/* {border ? (
                      <>
                        <Col md="6">
                          <label>Status:</label>
                          <input
                            type="text"
                            name="status"
                            value={paymentstatus || ""}
                            className={`form-control `}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                          />
                        </Col>
                        <Col md="6">
                          <label>Current balance:</label>
                          <input
                            type="text"
                            name="balance"
                            value={currentbal || ""}
                            className={`form-control `}
                            onChange={(e) => setCurrentBal(e.target.value)}
                          />
                        </Col>
                      </>
                    ) : null} */}

                        <Col md="12">
                          <div className="mt-3">
                            <button
                              type="submit"
                              className="btn bg-primary text-white"
                              onClick={calculate}
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
        <>
          <section>
            <Container>
              <Row>
                <Col md="4">
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Search by month"
                      value={searchQuery}
                      className="form-control"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md="12" className="mt-2">
                  <div className="my-3 text-end"></div>
                  <div className="table-responsive rounded-3">
                    <table className="table table-responsive table-sm table-stripped table-bordered p-0">
                      <thead className="bg-blue text-white">
                        <tr className="text-uppercase">
                          <th className="">Customer Bill</th>
                          <th className="">Amount Recieved</th>
                          <th className="">Month</th>
                          <th className="">Balance</th>
                          <th className="">Status</th>
                          <th className="">Payment Date</th>
                          {/* <th className="">Invoice</th> */}

                        </tr>
                      </thead>

                      {/* <tbody>
                    {customerpayment
                      .filter((item) =>
                        item.month
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.customerbill}</td>
                            <td>{item.amount_received}</td>
                            <td>{item.month}</td>
                            <td>{item.balance}</td>
                            <td>{item.paymentstatus}</td>
                            <td className="">
                              {item.currentdate
                                ? item.currentdate.substring(0, 10)
                                : ""}
                            </td>
                          </tr>
                        );
                      })
                      .reverse()}
                  </tbody> */}
                      <tbody>
                        {
                          // customerpayment
                          currentItems
                            .filter((item) =>
                              item.month
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            )
                            .map((item) => {
                              return (
                                <tr key={item.id}>
                                  <td>{item.customerbill}</td>
                                  <td>{item.amount_received}</td>
                                  <td>{item.month}</td>
                                  <td>{item.balance}</td>
                                  <td>{item.paymentstatus}</td>
                                  <td className="">
                                    {item.currentdate
                                      ? item.currentdate.substring(0, 10)
                                      : ""}
                                  </td>
                                  <td>
                                    {/* <button className="bg-primary btn text-white" onClick={handlePrint}>PRINT</button> */}
                                    {/* <CustomerPaymentReceipt className="container d-none" customerPrint={tableRef}/> */}
                                  </td>
                                </tr>
                              );
                            })
                            .reverse()
                        }
                      </tbody>
                    </table>
                  </div>
                  <Pagination>
                    {pageNumbers.map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      ) : null}
    </>
  );
}

export default adminLayout(PaymentEdit);

// give pagination
