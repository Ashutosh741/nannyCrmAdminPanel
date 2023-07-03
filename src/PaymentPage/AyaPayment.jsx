import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../Url";
import assignCustomer from "../assets/images/assignCustomer.png";
import { Pagination } from "react-bootstrap";

function AyaPayment() {
  const [tech, setTech] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [aayapayment, setaayaPayment] = useState([]);
  const [border, setBorder] = useState(false);

  const [showbox, setShowbox] = useState(false);
  const [customerbill, setCustomerbill] = useState("");
  const [aayaPaid, setAayaPaid] = useState("");
  const [profit, setProfit] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [assigncheck, setAssignCheck] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const [totalCustomerBill, setTotalCustomerBill] = useState("");
  const [totalAyaReceived, setAyaTotalReceived] = useState("");
  const [assigndata, setAssignData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [firstCustomerbill, setFirstCustomerBill] = useState("");
  const [lastCustomerBill, setLastCustomerBill] = useState("");
  const [totalProfit, setTotalProfit] = useState("");

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
      setaayaPayment(techData.ayapayment);
      const assignCustomer = techData.assign;
      // const assignCustomer = techData.assign;
      setAssignCheck(assignCustomer);
      console.log("assign check to the customer  ", assignCustomer);
      if (assignCustomer !== "Not Assign") {
        setShowbox(true);
      } else {
        setShowbox(false);
      }
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
    setMonth("");
    setDate("");
    setProfit("");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/ayareg/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          customerbill: customerbill,
          ayapaid: aayaPaid,
          month: month,
          currentdate: date,
          profit: profit,
          totalAyapaid: totalAyaReceived,
          totalCustomerbill: totalCustomerBill,
          totalProfit: totalProfit,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchCustomerData();
      const data = await response.json();
      console.log(data);
      alert("data Submitted Succesfully");
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowRemove = () => {
    setBorder(true);
  };

  useEffect(() => {
    fetchCustomerData();
    apiCustomerid();
    fetchTotalBill();
    assigndataget();
  }, [id, assigncheck]);

  console.log("id", id);

  const calculate = () => {
    const AdminProfit = customerbill - aayaPaid;
    console.log(AdminProfit);
    setProfit(AdminProfit);
    setBorder(true);

    setTotalCustomerBill(totalCustomerBill);
    setAyaTotalReceived(totalAyaReceived);
    setTotalProfit(totalProfit);

    setTotalCustomerBill(parseInt(totalCustomerBill) + parseInt(customerbill));
    setAyaTotalReceived(parseInt(totalAyaReceived) + parseInt(aayaPaid));
    setTotalProfit(parseInt(totalProfit) + parseInt(profit));
  };

  // const handlebox = (e) => {
  //   e.preventDefault();
  //   setShowbox(true);
  // };

  console.log("totalProfit", totalProfit);

  const pageNumbers = Array.from(
    { length: Math.ceil(aayapayment.length / itemsPerPage) },
    (_, index) => index + 1
  );

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

        setTotalCustomerBill(totalCustomerBill);
        setAyaTotalReceived(totalReceivedAmount);
        setTotalProfit(totalProfitAmount);

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

  // console.log("check assign to know", assigncheck);

  // const assigndataget = () => {
  //   axios
  //     .get(`${URL}/customerreg/${assigncheck}`)
  //     .then((res) => setAssignData(res.data.data));
  //   const firstBill = assigndata.customerpayment[0].customerbill;
  //   setFirstCustomerBill(firstBill);
  //   console.log("firstCusomer", firstCustomerbill);
  //   setCustomerbill(firstBill);
  // };

  // const assigndataget = () => {
  //   axios
  //     .get(`${URL}/customerreg/${assigncheck}`)
  //     .then((res) => {
  //       setAssignData(res.data.data);

  //       if (
  //         res.data.data.customerpayment &&
  //         res.data.data.customerpayment.length > 0
  //       ) {
  //         const firstBill = res.data.data.customerpayment[].customerbill;
  //         setFirstCustomerBill(firstBill);
  //         console.log("firstCustomer", firstCustomerbill);
  //         setCustomerbill(firstBill);
  //       } else {
  //         console.log("No customer payment data found.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
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
          setLastCustomerBill(lastCustomerBill);
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

  // pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = aayapayment.slice(indexOfFirstItem, indexOfLastItem);

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
                  <div className="my-3 p-3 bg-body rounded shadow-sm detailPage">
                    <h6 className="border-bottom pb-2 mb-0 mb-3 ">
                      Personal Info
                    </h6>

                    <Form onSubmit={handleFormSubmit}>
                      <Row>
                        {/* <Col md="6">
                      <FormGroup>
                        <label>Name:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          // className="form-control border-0 "

                          name="name"
                          value={tech.name || ""}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col> */}
                        <Col md="6">
                          <label>Customer Paid:</label>
                          <input
                            type="text"
                            name="customerbill"
                            value={customerbill}
                            // className="form-control"
                            className={`form-control `}
                            onChange={(e) => setCustomerbill(e.target.value)}
                          />
                        </Col>

                        <Col md="6">
                          <label>Aaya Payment:</label>
                          <input
                            type="text"
                            name="ayapaid"
                            value={aayaPaid}
                            // className="form-control"
                            required
                            className={`form-control `}
                            onChange={(e) => setAayaPaid(e.target.value)}
                          />
                        </Col>
                        <Col md="6">
                          <label>Current Date:</label>
                          <input
                            type="date"
                            name="currentdate"
                            value={date}
                            // className="form-control"
                            className={`form-control `}
                            required
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </Col>

                        <Col md="6">
                          <label htmlFor="">Month</label>
                          <select
                            className={`form-control  form-select`}
                            aria-label="Default select example"
                            name="month"
                            value={month}
                            required
                            onChange={(e) => setMonth(e.target.value)}
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
                          <label>Profit:</label>
                          <input
                            type="text"
                            name="profit"
                            value={profit}
                            // className="form-control"
                            className={`form-control `}
                            onChange={(e) => setProfit(e.target.value)}
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
                          <th className="">Aaya Payment</th>
                          <th className="">Month</th>
                          <th className="">Profit</th>
                          {/* <th className="">Status</th> */}
                          <th className="">Payment Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          // aayapayment
                          currentItems
                            .filter(
                              (item) =>
                                item.month
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              // &&
                              // (item.customerbill != 0 || item.ayapaid != 0)
                            )
                            .map((item) => {
                              return (
                                <tr key={item.id}>
                                  <td>{item.customerbill}</td>
                                  <td>{item.ayapaid}</td>
                                  <td>{item.month}</td>
                                  <td>{item.profit}</td>
                                  {/* <td>{item.paymentstatus}</td> */}
                                  <td className="">
                                    {item.currentdate
                                      ? item.currentdate.substring(0, 10)
                                      : ""}
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

export default adminLayout(AyaPayment);
