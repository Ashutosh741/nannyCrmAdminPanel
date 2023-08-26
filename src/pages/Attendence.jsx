import React, { useState, useEffect, useRef } from "react";
import adminLayout from "../hoc/adminLayout";
import axios from "axios";
import { URL } from "../Url";
import logo from "../assets/images/logo.png";
import { Last } from "react-bootstrap/esm/PageItem";
import { useReactToPrint } from "react-to-print";
import { Col, Container, Row } from "react-bootstrap";

const Attendence = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [srNo, setSrNo] = useState(1);
  const [month, setMonth] = useState("");

  const [customerData, setCustomerData] = useState(null);
  const [customerCode, setCustomerCode] = useState("");
  const [customerRate, setCustomerRate] = useState(0);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${customerCode}`);
      setCustomerData(response.data.data);
      console.log(customerCode);
      console.log(customerData);
      const data = response.data.data;
      if(data.assignedAyaDetails){
        const reverseData = data.assignedAyaDetails;
        let len = reverseData.length
        // console.log("reversed data",reverseData)
        // setAssignedAyaName(reverseData[len-1].assignedAyaName)
        // setAssignedAyaPurpose(reverseData[len-1].assignedAyaPurpose)
        setCustomerRate(reverseData[len-1].assignedAyaRate);
        // console.log("are you there",reverseData[len-1].assignedAyaName);
      }
      // console.log(response);
    } catch (error) {
      console.log("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [customerCode]);

  // const handleInputChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  // const handleInputChange = (event) => {
  //   const { value } = event.target;
  //   setSelectedDate(value);

  //   // Extract the month value from the selectedDate (format: "YYYY-MM")
  //   const selectedMonth = value.split("-")[1];
  //   console.log("Selected month:", selectedMonth);
  // };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSelectedDate(value);

    // Extract the month value from the selectedDate (format: "YYYY-MM")
    const selectedMonth = parseInt(value.split("-")[1], 10);

    // Get the month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[selectedMonth - 1];
    setMonth(monthName);
  };

  const getLastDayOfMonth = () => {
    const [year, month] = selectedDate.split("-");
    const lastDay = new Date(year, month, 0).getDate();
    return lastDay;
  };

  const generateSrNo = () => {
    setSrNo((prevSrNo) => prevSrNo + 1);
  };
  function ReverseString(str) {
    return str.split('-').reverse().join('-')
}

  const renderRows = () => {
    const rows = [];
    // selectedDate.split('').reverse().join('')
    // console.log("yeh kaam krna chahiye",ReverseString(selectedDate))

    for (let i = 1; i <= getLastDayOfMonth(); i++) {
      rows.push(
        <tr style={{ display: "contents" }}>
          <td
            style={{
              display: "inline-block",
              width: "130px",
              textAlign: i % 2 === 0 ? "center" : "start",
            }}
          >
            {srNo + i - 1}
          </td>

          <td
            style={{
              display: "inline-block",
              width: "100px",
              textAlign: i % 2 === 0 ? "center" : "start",
            }}
          >
            {i}-{ReverseString(selectedDate)}
          </td>
          <td
            style={{
              border: "1px solid black",
              height: "35px",
              display: "inline-block",
              width: "170px",
            }}
          ></td>
        </tr>
      );
    }

    return rows;
  };

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const generateTableRows = () => {
    if (!selectedMonth || !selectedYear) {
      return null;
    }

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const rows = [];

    for (let i = 1; i <= daysInMonth; i++) {
      rows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{`${i}-${selectedMonth}-${selectedYear}`}</td>
          <td style={{ border: "1px solid black", height: "50px" }}></td>
          {/* Add additional columns as needed */}
        </tr>
      );
    }

    return rows;
  };

  const handleCustomer = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevTech) => ({
      ...prevTech,
      [name]: value,
    }));
  };

  const tableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <>
      <Container className="my-5">
        <Row className="align-items-center mt-4">
          <Col md="6">
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
          </Col>
          <Col md="6">
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
        </Row>
      </Container>

      <table
        ref={tableRef}
        style={{
          width: "800px",
          margin: "0 auto",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#808080",

              textAlign: "center",

              fontWeight: "800",
              color: "black",
              borderRadius: "10px",
            }}
          >
            <td>
              <h3>Booking Card</h3>
            </td>
          </tr>
          {/* <tr>
            <td>
              <input type="month" />
            </td>
          </tr> */}

          <tr class="">
            <td colspan="">
              <img
                style={{
                  display: "inline-block",

                  marginRight: "20px",
                }}
                width="100"
                height="100"
                src={logo}
                alt=""
              />
              <h3
                style={{
                  fontSize: "30px",
                  color: "black",
                  fontWeight: "600",

                  marginTop: "10px",

                  display: "inline-block",
                }}
              >
                Joy Guru Janakalayan Trust And Service
              </h3>
            </td>
          </tr>
          <tr>
            <td>
              <h4
                style={{
                  textTransform: "uppercase",
                  textAlign: "center",
                  fontSize: "18px",
                  marginTop: "10px",
                }}
              >
                SARBAMANGLA PALLY, M.K ROAD , ENGLISH BAzar , Malda :732101
              </h4>
            </td>
          </tr>
          <tr
            style={{
              background: "#808080",

              textAlign: "center",

              fontWeight: "800",
              color: "black",
              borderRadius: "10px",
            }}
          >
            <td style={{ padding: "10px" }}>
              <h3 style={{ fontSize: "20px" }}>
                Mobile Number : 9734915314 / 7001086855
              </h3>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "2px solid black", marginBottom: "10px" }}>
            <div className="" style={{ margin: "5px 0" }}>
              <h4
                style={{
                  display: "inline-block",
                  fontSize: "16px",
                  marginRight: "20px",
                }}
              >
                Customer Name :{" "}
              </h4>
              <input
                type="text"
                style={{
                  display: "inline-block",
                  fontWeight: "800",
                  border: "0",
                  background: "#f4f5f9",
                  width: "500px",
                }}
                value={customerCode ? customerData.name || "" : ""}
                onChange={handleCustomer}
                name="name"
              />
            </div>
          </tr>
          <tr style={{ borderBottom: "2px solid black" }}>
            <td>
              <div className="" style={{ margin: "5px 0" }}>
                <h4
                  style={{
                    display: "inline-block",
                    fontSize: "16px",
                    marginRight: "20px",
                  }}
                >
                  Customer Address :{" "}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "500px",
                  }}
                  // value={customerData.permanentAddress || ""}
                  // onChange={handleCustomer}
                  // name="permanentAddress"

                  value={customerCode ? customerData.permanentAddress : ""}
                  onChange={handleCustomer}
                  name="permanentAddress"
                />
              </div>
            </td>
          </tr>
          <tr style={{ borderBottom: "2px solid black" }}>
            <td>
              {" "}
              <div
                className=""
                style={{
                  display: "inline-block",

                  marginRight: "20px",
                  borderRight: "2px solid black",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    fontSize: "14px",
                  }}
                >
                  Attend Service :{" "}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "100px",
                    marginRight: "20px",
                  }}
                  value={customerCode ? customerData.attendService : ""}
                  onChange={handleCustomer}
                  name="attendService"
                />
              </div>
              <div
                className=""
                style={{
                  display: "inline-block",

                  borderRight: "2px solid black",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    fontSize: "14px",
                  }}
                >
                  For the Month :{" "}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "110px",
                    marginRight: "20px",
                  }}
                  value={month}
                  onChange={handleInputChange}
                />
              </div>
              <div
                className=""
                style={{
                  display: "inline-block",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    marginLeft: "10px",
                    fontSize: "14px",
                  }}
                >
                  Particular :{" "}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "140px",
                  }}
                  value={customerCode ? customerData.forService : ""}
                  onChange={handleCustomer}
                  name="forService"
                />
              </div>
            </td>
          </tr>

          <tr style={{ borderBottom: "2px solid black" }}>
            <td>
              {" "}
              <div
                className=""
                style={{
                  display: "inline-block",

                  marginRight: "20px",

                  borderRight: "2px solid black",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    fontSize: "14px",
                  }}
                >
                  Rate :{customerRate}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "250px",
                    marginRight: "20px",
                  }}
                />
              </div>
              <div
                className=""
                style={{
                  display: "inline-block",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    fontSize: "14px",
                  }}
                >
                  Secuirty Deposit :{" "}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "250px",
                    marginRight: "20px",
                  }}
                  value={customerCode ? customerData.securityAmount : ""}
                  onChange={handleCustomer}
                  name="securityAmount"
                />
              </div>
            </td>
          </tr>
          <tr style={{ borderBottom: "2px solid black" }}>
            <td>
              {" "}
              <div
                className=""
                style={{
                  display: "inline-block",

                  marginRight: "20px",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    fontSize: "14px",
                  }}
                >
                  Time :{" "}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "100px",
                    marginRight: "10px",
                  }}
                />
              </div>
              <div
                className=""
                style={{
                  display: "inline-block",

                  marginRight: "20px",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    fontSize: "14px",
                  }}
                >
                  To
                </h4>
              </div>
              <div
                className=""
                style={{
                  display: "inline-block",

                  marginRight: "20px",
                  borderRight: "2px solid black",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    fontSize: "14px",
                  }}
                >
                  Time :{" "}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "100px",
                    marginRight: "20px",
                  }}
                />
              </div>
              <div
                className=""
                style={{
                  display: "inline-block",

                  marginRight: "20px",
                }}
              >
                <h4
                  style={{
                    display: "inline-block",

                    marginRight: "20px",
                    fontSize: "14px",
                  }}
                >
                  Customer Code :{" "}
                </h4>
                <input
                  type="text"
                  style={{
                    display: "inline-block",
                    fontWeight: "800",
                    border: "0",
                    background: "#f4f5f9",
                    width: "150px",
                    marginRight: "20px",
                  }}
                  value={customerCode ? customerData.customerCode : ""}
                  onChange={handleCustomer}
                  name="customerCode"
                />
              </div>
            </td>
          </tr>
          <tr
            style={{
              background: "#808080",

              textAlign: "center",

              fontWeight: "800",
              color: "black",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <td>Aya Attendence</td>
          </tr>
          <tr
            style={{
              background: "#808080",
              marginTop: "5px",

              textAlign: "center",
              display: "inline-block",
              fontWeight: "800",
              color: "black",
              width: "100%",
            }}
          >
            <td
              style={{
                display: "inline-block",
                width: "100px",
                textAlign: "start",
              }}
            >
              Sr.No
            </td>
            <td style={{ display: "inline-block", width: "170px" }}>Date</td>
            <td style={{ display: "inline-block", width: "150px" }}>
              Aya Signature
            </td>
            <td style={{ display: "inline-block", width: "120px" }}>Sr.No</td>
            <td style={{ display: "inline-block", width: "100px" }}>Date</td>
            <td style={{ display: "inline-block", width: "150px" }}>
              Aya Signature
            </td>
          </tr>

          {/* <tr style={{ display: "contents" }}>
            <td style={{ display: "inline-block", width: "170px" }}>{1} </td>
            <td style={{ display: "inline-block", width: "100px" }}>
              1-22-2021
            </td>
            <td
              style={{
                border: "1px solid black",
                height: "50px",
                display: "inline-block",
                width: "150px",
              }}
            ></td>
          </tr>
          <tr>
            <td
              style={{
                display: "inline-block",
                width: "120px",
                textAlign: "center",
              }}
            >
              {2}{" "}
            </td>
            <td style={{ display: "inline-block", width: "100px" }}>
              1-22-2021
            </td>
            <td
              style={{
                border: "1px solid black",
                height: "50px",
                display: "inline-block",
                width: "150px",
              }}
            ></td>
          </tr> */}
          {/* {generateTableRows()} */}
          {/* <tr>
            <td style={{ display: "inline-block", width: "170px" }}>
              Sr.No: {srNo}
            </td>
            <td style={{ display: "inline-block", width: "100px" }}>
              Date: {selectedDate}
            </td>
            <td
              style={{
                border: "1px solid black",
                height: "50px",
                display: "inline-block",
                width: "150px",
              }}
            ></td>
          </tr> */}
          {renderRows()}
        </tbody>
      </table>

      <div className="w-100 text-center">
        <button
          onClick={handlePrint}
          style={{ background: "rgb(7, 71, 166)", color: "white" }}
          className="btn my-5 text-center"
        >
          Print
        </button>
      </div>
    </>
  );
};

export default adminLayout(Attendence);

// import React, { useState } from "react";

// const YourComponent = () => {
//   const [selectedDate, setSelectedDate] = useState("");

//   // Rest of your component code

//   return (
//     <div className="input-group">
//       <input
//         type="month"
//         className="form-control form-control-sm"
//         value={selectedDate}
//         onChange={handleInputChange}
//       />
//       <p>Last day of the month: {getLastDayOfMonth()}</p>
//     </div>
//   );
// };

// export default YourComponent;
