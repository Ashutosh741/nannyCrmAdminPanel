import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";

import * as XLSX from "xlsx";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../assets/css/profile.css";

function AyaAssign() {
  const [tech, setTech] = useState([]);
  const [list, setList] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  const [border, setBorder] = useState(false);
  const [assign, setAssign] = useState("");
  const [assignCustomer, setAssginCustomer] = useState([]);
  const [assignData, setAssignData] = useState([]);
  const [assingname, setAssignName] = useState("");
  const [assignid, setAssignid] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const fetchaayaData = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${id}`);
      const techData = response.data.data;
      setTech(techData);
      setAssignid(tech.assign);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchassignData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${assignid}`);
      const techData = response.data.data;
      setAssignData(techData);
      setAssignName(techData.name);
      console.log(assingname);

      console.log("assign data", assignData);
    } catch (error) {
      console.log(error);
    }
  };

  const apiCustomerid = () => {
    axios.get(`${URL}/customerreg/`).then((res) => setCustomer(res.data.data));
    console.log("customer", customer);
  };

  const assignChecked = () => {
    axios
      .get(`${URL}/customerreg/${assign}`)
      .then((res) => setAssginCustomer(res.data.data));

    console.log(assignCustomer);
  };

  useEffect(() => {
    fetchaayaData();
    apiCustomerid();
    assignChecked();
    fetchassignData();
  }, [id]);

  console.log("id", id);

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //     .put(`${URL}/ayareg/${id}`, tech)
  //     .then((res) => {
  //       alert("Data updated successfully");
  //       navigate("/ayalist");
  //       // You can perform any additional actions after the update is successful
  //     })
  //     .catch((error) => {
  //       console.log("Error updating data:", error);
  //       // Handle any errors that occurred during the update
  //     });
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/ayareg/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          assign: assign,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchaayaData();
      const data = await response.json();
      console.log(data);
      alert("data Submitted Succesfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTech((prevTech) => ({
      ...prevTech,
      [name]: value,
    }));
  };

  const handleRowClick = () => {
    // console.log(`/customerreg/${item._id}`);

    navigate(`/customerreg/${id}`);
  };

  const apiCategory = () => {
    setLoading(true);
    axios
      .get(`${URL}/customerreg`)
      .then((res) => {
        setList(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   apiCategory();
  //   apiTechid();
  // }, []);

  // const apiTechid = () => {
  //   const name = tech.assign;
  //   setAssginName(name);
  //   axios
  //     .get(`${URL}/customerreg/${assignName}`)
  //     .then((res) => setAssignData(res.data.data));
  //   console.log("assignData", assignData);

  //   console.log("assingdata name", assignData.name);
  // };
  // name comes undefinded

  useEffect(() => {
    apiCategory();
  }, []);

  return (
    <>
      <section className="regList mt-5">
        <Container>
          <Row className="align-items-center">
            <Col md="12" className="mt-4">
              <div className="">
                <Form onSubmit={handleFormSubmit}>
                  <Row>
                    <Col md="3">
                      <label className="mb-1">Assign:</label>
                      <select
                        className="form-control form-select"
                        value={assign || ""}
                        name="assign"
                        onChange={(e) => setAssign(e.target.value)}
                      >
                        {/* {customer.map((item) => {
                          return (
                            <>
                              <option value={item.name}>
                                {item.customerCode} {item.name}{" "}
                              </option>
                            </>
                          );
                        })} */}

                        {customer.map((item) => {
                          return (
                            <>
                              {/* <option value={item._id}> */}
                              <option value={item.customerCode}>
                                {item.customerCode} {item.name}{" "}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">From Date</label>
                      <input type = "date" className="form-control"></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">To Date</label>
                      <input type = "date" className="form-control"></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">Reason</label>
                      <select className="form-select">
                        <option value = "1">Hold</option>
                        <option value = "2">Replace</option>
                      </select>
                      {/* <input type = "date" className="form-control"></input> */}
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">Shift</label>
                      <select className="form-select">
                        <option value = "1">Day</option>
                        <option value = "2">Night</option>
                        <option value = "3">Day and Night</option>
                      </select>
                      {/* <input type = "date" className="form-control"></input> */}
                    </Col>
                    <Col md="1">
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="btn bg-primary text-white"
                        >
                          Save
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            <Col md="12" className="mt-4">
              <div className="my-3 text-end"></div>
              <div className="table-responsive rounded-3">
                <table className="table table-responsive table-sm table-stripped table-bordered p-0">
                  <thead className="bg-blue text-white">
                    <tr className="text-uppercase">
                      <th>Aya Code</th>
                      <th>Name</th>
                      <th className="">Date Of Joinin</th>
                      <th className="">Closing Date</th>
                      <th className="">Assign</th>
                    </tr>
                  </thead>

                  {loading ? (
                    <div className="text-center d-flex justify-content-center p-3">
                      Loading...
                    </div>
                  ) : (
                    <tbody>
                      <tr key={tech.id} onClick={() => handleRowClick()}>
                        <td>{tech.ayaCode}</td>
                        <td>{tech.name}</td>

                        <td className="">
                          {tech.joining ? tech.joining.substring(0, 10) : ""}
                        </td>
                        <td className="">
                          {tech.closingDate
                            ? tech.closingDate.substring(0, 10)
                            : ""}
                        </td>
                        <td className="">
                          {tech.assign}
                          {/* {" "}
                          {assignid ? (
                            <p>{assignData.name}</p>
                          ) : (
                            <p className="">{tech.assign}</p>
                          )}{" "} */}
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default adminLayout(AyaAssign);




// import React, { useEffect, useRef, useState } from "react";
// import { Col, Container, Form, FormGroup, NavLink, Row } from "react-bootstrap";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import { useReactToPrint } from "react-to-print";

// import { DatePicker, IconButton } from "rsuite";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { BaseURL } from "../Common/URL";
// import { token } from "../utils/Token";
// import { srRS } from "@mui/material/locale";

// function Staff() {
//   const [staff, setStaff] = useState([]);

//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   const fetchStaffApi = async () => {
//     try {
//       const response = await axios.get(`${BaseURL}/user`, {
//         headers,
//       });
//       setStaff(response.data.data);
//       console.log(staff);
//     } catch (error) {
//       console.error("Error fetching category data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStaffApi();
//   }, []);

//   const getRowId = (staff) => staff._id;

//   const handleEditClick = (id) => {
//     alert(`Edit button clicked for row with ID: ${id}`);
//   };

//   const columns = [
//     {
//       field: "id",
//       headerName: "Sr. No.",
//       width: 90,
//       renderCell: (params) => {
//         return parseInt(params.rowIndex + 1);
//       },
//     },

//     {
//       field: "name",
//       headerName: "Name",
//       width: 200,
//     },

//     {
//       field: "employee_code",
//       headerName: "employee_code",
//       width: 200,
//     },
//     {
//       field: "mobile_no",
//       headerName: "Mobile Number",
//       width: 150,
//     },
//     {
//       field: "appointmentdate",
//       headerName: "Appointment Date",
//       width: 150,
//     },
//     {
//       field: "email_address",
//       headerName: "Email ID",
//       width: 150,
//     },
//     {
//       field: "edit",
//       headerName: "Edit",
//       width: 100,
//       renderCell: (params) => {
//         const id = params.row.employee_code;
//         return (
//           <Link to={`/user/${id}`}>
//             <button
//               color="primary"
//               aria-label="edit"
//               className="btn"
//               onClick={() => handleEditClick(id)}
//             >
//               <i class="fa-regular fa-pen-to-square"></i>
//             </button>
//           </Link>
//         );
//       },
//     },
//     {
//       field: "view",
//       headerName: "View",
//       width: 100,
//       renderCell: (params) => {
//         const id = params.row.employee_code;
//         return (
//           <Link to={`/user/${id}`}>
//             <button
//               color="primary"
//               aria-label="edit"
//               className="btn"
//               onClick={() => handleEditClick(id)}
//             >
//               <i class="fa-regular fa-eye"></i>
//             </button>
//           </Link>
//         );
//       },
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       width: 100,
//       renderCell: (params) => {
//         const id = params.row.employee_code;
//         return (
//           <Link to={`/user/${id}`}>
//             <button
//               color="primary"
//               aria-label="edit"
//               className="btn"
//               onClick={() => handleEditClick(id)}
//             >
//               <i class="fa-solid fa-trash"></i>
//             </button>
//           </Link>
//         );
//       },
//     },
//   ];

//   // this is showing NaN

//   const tableRef = useRef();

//   const handlePrint = useReactToPrint({
//     content: () => tableRef.current,
//   });

//   return (
//     <>
//       <section className="space">
//         <Container fluid>
//           <Row className="">
//             <Col md="12">
//               <div className="bg-white content_box">
//                 <div className="d-flex align-items-center justify-content-between appointmentheader align-items-center flex-wrap">
//                   <h5 className="border-0 pb-0 m-0">Staff Details</h5>
//                   <div className="d-flex align-items-center gap-3 flex-wrap">
//                     <button className="print_btn btn" onClick={handlePrint}>
//                       Print
//                     </button>
//                     <Link to={"/stafform"} className="print_btn btn">
//                       Add Staff
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="content_boxForm">
//                   <Box sx={{ height: 500, width: "100%" }}>
//                     <DataGrid
//                       ref={tableRef}
//                       rows={staff}
//                       columns={columns}
//                       getRowId={getRowId}
//                       initialState={{
//                         pagination: {
//                           paginationModel: {
//                             pageSize: 10,
//                           },
//                         },
//                       }}
//                       pageSizeOptions={[10]}
//                       disableRowSelectionOnClick
//                     />
//                   </Box>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// }

// export default Staff;
