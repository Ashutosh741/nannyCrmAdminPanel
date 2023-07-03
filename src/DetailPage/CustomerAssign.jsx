import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";

import * as XLSX from "xlsx";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../assets/css/profile.css";

function CustomerAssign() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tech, setTech] = useState([]);
  const [aya, setAya] = useState([]);
  const [assign, setAssign] = useState("");

  const [border, setBorder] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  // const apiTechid = () => {
  //   axios.get(`${URL}/customerreg/${id}`).then((res) => setTech(res.data.data));
  //   console.log(tech);
  // };
  const CustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${id}`);
      const techData = response.data.data;
      setTech(techData);

      setAssign(techData.assign);
    } catch (error) {
      console.log(error);
    }
  };

  const apiAya = () => {
    axios.get(`${URL}/ayareg/`).then((res) => setAya(res.data.data));
    console.log(aya);
  };
  //   const apiAya = () => {
  //     axios.get(`${URL}/ayareg/`).then((res) => {
  //       // Filter out already assigned aaya
  //       //   const filteredAya = res.data.data.filter(
  //       //     (item) => item.isAssigned !== true
  //       //   );
  //       const filteredAya = res.data.data.filter(
  //         (item) => item.assign == "Not Assign"
  //       );
  //       setAya(filteredAya);
  //     });
  //     console.log(aya);
  //   };

  useEffect(() => {
    CustomerData();
    apiAya();
  }, [id]);

  console.log("id", id);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/customerreg/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          assign: assign,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await CustomerData();

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

  useEffect(() => {
    apiCategory();
  }, []);

  return (
    <>
      <section className="regList mt-5">
        <Container>
          <Row className="align-items-center">
            <Col md="9" className="mt-4">
              <div className="">
                <Form onSubmit={handleFormSubmit}>
                  <Row>
                    <Col md="6">
                      <label className="mb-1">Assign:</label>
                      <select
                        className="form-control form-select"
                        value={tech.assign || ""}
                        name="assign"
                        onChange={(e) => setAssign(e.target.value)}
                      >
                        {aya.map((item) => {
                          return (
                            <>
                              <option value={item.name}>{item.name}</option>
                            </>
                          );
                        })}
                      </select>
                    </Col>
                    <Col md="6">
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
                      <th>Customer Code</th>
                      <th>Name</th>

                      <th className="">Date Of Booking</th>
                      <th className="">Date Of Requirement</th>
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
                        <td>{tech.customerCode}</td>
                        <td>{tech.name}</td>

                        <td className="">
                          {tech.booking ? tech.booking.substring(0, 10) : ""}
                        </td>
                        <td className="">
                          {tech.dateRequirement
                            ? tech.dateRequirement.substring(0, 10)
                            : ""}
                        </td>

                        <td className="">
                          {tech.closingDate
                            ? tech.closingDate.substring(0, 10)
                            : ""}
                        </td>

                        <td className="">{tech.assign}</td>
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

export default adminLayout(CustomerAssign);

// import React, { useEffect, useState } from "react";
// import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
// import adminLayout from "../hoc/adminLayout";
// import { URL } from "../Url";
// import axios from "axios";

// import * as XLSX from "xlsx";
// import { useNavigate, useParams, Link } from "react-router-dom";

// import "../assets/css/profile.css";

// function CustomerAssign() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [tech, setTech] = useState([]);
//   const [aya, setAya] = useState([]);

//   const [border, setBorder] = useState(false);

//   const { id } = useParams();

//   const navigate = useNavigate();

//   const apiTechid = () => {
//     axios.get(`${URL}/customerreg/${id}`).then((res) => setTech(res.data.data));
//     console.log(tech);
//   };

//   const apiAya = () => {
//     axios.get(`${URL}/ayareg/`).then((res) => {
//       // Filter out already assigned aaya
//       const filteredAya = res.data.data.filter(
//         (item) => item.assign == "Not Assign"
//       );
//       setAya(filteredAya);
//     });
//     console.log(aya);
//   };

//   useEffect(() => {
//     apiTechid();
//     apiAya();
//   }, [id]);

//   console.log("id", id);

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .put(`${URL}/customerreg/${id}`, tech)
//       .then((res) => {
//         alert("Data updated successfully");
//         navigate("/customerlist");
//         // You can perform any additional actions after the update is successful
//       })
//       .catch((error) => {
//         console.log("Error updating data:", error);
//         // Handle any errors that occurred during the update
//       });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setTech((prevTech) => ({
//       ...prevTech,
//       [name]: value,
//     }));
//   };

//   const handleRowClick = (item) => {
//     console.log(`/customerreg/${item._id}`);

//     navigate(`/customerreg/${item._id}`, { state: { item } });
//   };

//   const apiCategory = () => {
//     setLoading(true);
//     axios
//       .get(`${URL}/customerreg`)
//       .then((res) => {
//         setList(res.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     apiCategory();
//   }, []);

//   return (
//     <>
//       <section className="regList mt-5">
//         <Container>
//           <Row className="align-items-center">
//             <Col md="9" className="mt-4">
//               <div className="">
//                 <Form onSubmit={handleFormSubmit}>
//                   <Row>
//                     <Col md="6">
//                       <label className="mb-1">Assign:</label>
//                       <select
//                         className="form-control form-select"
//                         value={tech.assign || ""}
//                         name="assign"
//                         onChange={handleInputChange}
//                       >
//                         {aya.map((item) => {
//                           return (
//                             <>
//                               <option value={item.name}>{item.name}</option>
//                             </>
//                           );
//                         })}
//                       </select>
//                     </Col>
//                     <Col md="6">
//                       <div className="mt-4">
//                         <button
//                           type="submit"
//                           className="btn bg-primary text-white"
//                         >
//                           Save
//                         </button>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Form>
//               </div>
//             </Col>
//             <Col md="12" className="mt-4">
//               <div className="my-3 text-end"></div>
//               <div className="table-responsive rounded-3">
//                 <table className="table table-responsive table-sm table-stripped table-bordered p-0">
//                   <thead className="bg-blue text-white">
//                     <tr className="text-uppercase">
//                       <th>Customer Code</th>
//                       <th>Name</th>

//                       <th className="">Date Of Booking</th>
//                       <th className="">Date Of Requirement</th>
//                       <th className="">Closing Date</th>
//                       <th className="">Assign</th>
//                     </tr>
//                   </thead>

//                   {loading ? (
//                     <div className="text-center d-flex justify-content-center p-3">
//                       Loading...
//                     </div>
//                   ) : (
//                     <tbody>
//                       <tr key={tech.id}>
//                         <td>{tech.customerCode}</td>
//                         <td>{tech.name}</td>

//                         <td className="">
//                           {tech.booking ? tech.booking.substring(0, 10) : ""}
//                         </td>
//                         <td className="">
//                           {tech.dateRequirement
//                             ? tech.dateRequirement.substring(0, 10)
//                             : ""}
//                         </td>

//                         <td className="">
//                           {tech.closingDate
//                             ? tech.closingDate.substring(0, 10)
//                             : ""}
//                         </td>

//                         <td className="">{tech.assign}</td>
//                       </tr>
//                     </tbody>
//                   )}
//                 </table>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// }

// export default adminLayout(CustomerAssign);
