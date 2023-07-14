import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../assets/css/profile.css";

function AyaAssign() {
  const [tech, setTech] = useState([]);
  const [list, setList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [customerSelect, setCustomerSelect] = useState(false);

  const [loading, setLoading] = useState(false);
  const [assignData, setAssignData] = useState([]);
  const [assignedCustomerCode, setAssignedCustomerCode] = useState("");
  const [assignedCustomerName, setAssignedCustomerName] = useState("");
  const [assignedCustomerFromDate, setAssignedCustomerFromDate] = useState("");
  const [assignedCustomerToDate, setAssignedCustomerToDate] = useState("");
  const [assignedCustomerReason, setAssignedCustomerReason] = useState("");
  const [assignedCustomerRate, setAssignedCustomerRate] = useState("");
  const [assignedCustomerShift, setAssignedCustomerShift] = useState("");
  const [assignedCustomerPurpose, setAssignedCustomerPurpose] = useState("");
  const [assignedCustomerDetails,setAssignedCustomerDetails] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const fetchaayaData = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${id}`);
      const techData = response.data.data;
      setTech(techData);
      // setAssignid(techData.assign);
      // console.log("assigne custome code",techData.assign)
      setAssignedCustomerDetails(techData.assignedCustomerDetails)
      
      console.log("what's techDAata",techData)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchassignData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${assignedCustomerCode}`);
      const techData = response.data.data;
      console.log("where are you",techData)

      setAssignData(techData);
      setAssignedCustomerName(techData.name);
      console.log("it's me ",techData.name);

      // console.log("assign data", assignData);
    } catch (error) {
      console.log(error);
    }
  };
  const apiCustomerid = () => {
      axios.get(`${URL}/customerreg/`).then((res) => {
        setCustomerList(res.data.data);
        // console.log("customerList", res.data.data);
      }).catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    fetchaayaData();
    apiCustomerid();
    fetchassignData();
  }, [id, assignedCustomerPurpose, customerSelect]);
  

  console.log("id", id);

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`${URL}/ayareg/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         assignedCustomerCode : assignedCustomerCode,
  //         assignedCustomerName : assignedCustomerName,
  //         assignedCustomerFromDate : assignedCustomerFromDate,
  //         assignedCustomerToDate : assignedCustomerToDate,
  //         assignedCustomerReason : assignedCustomerReason,
  //         assignedCustomerRate : assignedCustomerRate,
  //         assignedCustomerShift : assignedCustomerShift,
  //         assignedCustomerPurpose : assignedCustomerPurpose,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     await fetchaayaData();
  //     const data = await response.json();
  //     console.log(data);
  //     const newAssignedCustomerDetails = {
  //       assignedCustomerCode : assignedCustomerCode,
  //       assignedCustomerName : assignedCustomerName,
  //       assignedCustomerFromDate : assignedCustomerFromDate,
  //       assignedCustomerToDate : assignedCustomerToDate,
  //       assignedCustomerReason : assignedCustomerReason,
  //       assignedCustomerRate : assignedCustomerRate,
  //       assignedCustomerShift : assignedCustomerShift,
  //       assignedCustomerPurpose : assignedCustomerPurpose,
  //     }
  //     setAssignedCustomerDetails(previousassignedCustomerDetails => [...previousassignedCustomerDetails,newAssignedCustomerDetails])
  //     setAssignedCustomerFromDate("");
  //     setAssignedCustomerToDate("");
  //     setAssignedCustomerReason("select");
  //     setAssignedCustomerRate("0");
  //     setAssignedCustomerShift("select");
  //     setAssignedCustomerPurpose("select");
  //     setAssignedCustomerCode("");
  //     setCustomerSelect(false);
  //     setCustomerList([])
  //     // console.log("setAssignedCustomerDetails is this",assignedCustomerDetails)
  //     alert("data Submitted Succesfully");
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // fetchaayaData();
  // };

  // const handleFormSubmitCustomer = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`${URL}/customerreg/${assignedCustomerCode}`, {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         assignedAyaCode : tech.ayaCode,
  //         assignedAyaName : tech.name,
  //         assignedAyaFromDate : assignedCustomerFromDate,
  //         assignedAyaToDate : assignedCustomerToDate,
  //         assignedAyaReason : assignedCustomerReason,
  //         assignedAyaRate : assignedCustomerRate,
  //         assignedAyaShift : assignedCustomerShift,
  //         assignedAyaPurpose : assignedCustomerPurpose,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     console.log("it's show time ",data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   fetchassignData();
  // };


  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`${URL}/ayareg/${id}`, {
  //       assignedCustomerCode: assignedCustomerCode,
  //       assignedCustomerName: assignedCustomerName,
  //       assignedCustomerFromDate: assignedCustomerFromDate,
  //       assignedCustomerToDate: assignedCustomerToDate,
  //       assignedCustomerReason: assignedCustomerReason,
  //       assignedCustomerRate: assignedCustomerRate,
  //       assignedCustomerShift: assignedCustomerShift,
  //       assignedCustomerPurpose: assignedCustomerPurpose,
  //     });
  //     await fetchaayaData();
  //     const data = response.data;
  //     console.log(data);
  //     const newAssignedCustomerDetails = {
  //       assignedCustomerCode: assignedCustomerCode,
  //       assignedCustomerName: assignedCustomerName,
  //       assignedCustomerFromDate: assignedCustomerFromDate,
  //       assignedCustomerToDate: assignedCustomerToDate,
  //       assignedCustomerReason: assignedCustomerReason,
  //       assignedCustomerRate: assignedCustomerRate,
  //       assignedCustomerShift: assignedCustomerShift,
  //       assignedCustomerPurpose: assignedCustomerPurpose,
  //     };
  //     setAssignedCustomerDetails((previousassignedCustomerDetails) => [
  //       ...previousassignedCustomerDetails,
  //       newAssignedCustomerDetails,
  //     ]);
  //     setAssignedCustomerFromDate("");
  //     setAssignedCustomerToDate("");
  //     setAssignedCustomerReason("select");
  //     setAssignedCustomerRate("0");
  //     setAssignedCustomerShift("select");
  //     setAssignedCustomerPurpose("select");
  //     setAssignedCustomerCode("");
  //     setCustomerSelect(false);
  //     setCustomerList([]);
  //     alert("Data Submitted Successfully");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  // const handleFormSubmitCustomer = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`${URL}/customerreg/${assignedCustomerCode}`, {
  //       assignedAyaCode: tech.ayaCode,
  //       assignedAyaName: tech.name,
  //       assignedAyaFromDate: assignedCustomerFromDate,
  //       assignedAyaToDate: assignedCustomerToDate,
  //       assignedAyaReason: assignedCustomerReason,
  //       assignedAyaRate: assignedCustomerRate,
  //       assignedAyaShift: assignedCustomerShift,
  //       assignedAyaPurpose: assignedCustomerPurpose,
  //     });
  //     const data = response.data;
  //     console.log("it's show time ", data);
  //     await fetchassignData();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${URL}/ayareg/${id}`, {
        assignedCustomerCode: assignedCustomerCode,
        assignedCustomerName: assignedCustomerName,
        assignedCustomerFromDate: assignedCustomerFromDate,
        assignedCustomerToDate: assignedCustomerToDate,
        assignedCustomerReason: assignedCustomerReason,
        assignedCustomerRate: assignedCustomerRate,
        assignedCustomerShift: assignedCustomerShift,
        assignedCustomerPurpose: assignedCustomerPurpose,
      });
      const data = response.data;
      console.log(data);
  
      const newAssignedCustomerDetails = {
        assignedCustomerCode: assignedCustomerCode,
        assignedCustomerName: assignedCustomerName,
        assignedCustomerFromDate: assignedCustomerFromDate,
        assignedCustomerToDate: assignedCustomerToDate,
        assignedCustomerReason: assignedCustomerReason,
        assignedCustomerRate: assignedCustomerRate,
        assignedCustomerShift: assignedCustomerShift,
        assignedCustomerPurpose: assignedCustomerPurpose,
      };
  
      const updatedTech = {
        ...tech,
        assignedCustomerDetails: [
          ...tech.assignedCustomerDetails,
          newAssignedCustomerDetails,
        ],
      };
  
      setTech(updatedTech);
      setAssignedCustomerFromDate("");
      setAssignedCustomerToDate("");
      setAssignedCustomerReason("select");
      setAssignedCustomerRate("0");
      setAssignedCustomerShift("select");
      setAssignedCustomerPurpose("select");
      setAssignedCustomerCode("");
      setCustomerSelect(false);
      setCustomerList([]);
      alert("Data Submitted Successfully");
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
            <Col md="12" className="mt-4">
              <div className="">
                <Form onSubmit={(e)=>{handleFormSubmit(e); }}>
                  <Row>
                    <Col md="4">
                      <label className="mb-1">Assign:</label>
                      <select
                        className="form-control form-select"
                        value={assignedCustomerCode}
                        name="assign"
                        onChange={(e) => setAssignedCustomerCode(e.target.value)}
                        onClick={() => setCustomerSelect(true)}
                      >
                        {!customerList ? (
                          <option value="">Loading...</option>
                        ) : (
                          <>
                            <option value="">Select</option>
                            {customerList.map((item) => (
                              <option key={item._id} value={item.customerCode}>
                                {item.customerCode} {item.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>

                    </Col>
                    <Col md = "2">
                      <label className="mb-1">From Date</label>
                      <input type = "date" className="form-control" onChange={(e)=>setAssignedCustomerFromDate(e.target.value)} value = {assignedCustomerFromDate} required></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1" >To Date</label>
                      <input type = "date" className="form-control"  onChange={(e)=>setAssignedCustomerToDate(e.target.value)} value={assignedCustomerToDate}></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">Reason</label>
                      <select className="form-select" onChange={(e)=>setAssignedCustomerReason(e.target.value)} value={assignedCustomerReason} required>
                        <option value = "select">Select</option>
                        <option value = "hold">Hold</option>
                        <option value = "replace">Replace</option>
                      </select>
                      {/* <input type = "date" className="form-control"></input> */}
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">Rate</label>
                      <input type = "number" className="form-control" onChange={(e)=>setAssignedCustomerRate(e.target.value)} value={assignedCustomerRate} required></input>
                    </Col>
                    <Col md = "2 mt-3">
                      <label className="mb-1">Shift</label>
                      <select className="form-select" onChange={(e)=>setAssignedCustomerShift(e.target.value)} value={assignedCustomerShift} required>
                        <option value = "select">Select</option>
                        <option value = "day">Day</option>
                        <option value = "night">Night</option>
                        <option value = "dayNight">Day and Night</option>
                      </select>
                      {/* <input type = "date" className="form-control"></input> */}
                    </Col>
                    <Col md = "2 mt-3">
                      <label className="mb-1">Purpose</label>
                      <select className="form-select" onChange={(e)=>setAssignedCustomerPurpose(e.target.value)} value={assignedCustomerPurpose} required>
                        <option value = "select">Select</option>
                        <option value = "cooking">Cooking</option>
                        <option value = "cookingHouseKeeping">Cooking and HouseKeeping</option>
                        <option value = "houseKeeping">HouseKeeping</option>
                        <option value = "newBornbaby">New Born Baby</option>
                        <option value = "oldMan">Old man</option>
                        <option value = "oldWomen">Old Women</option>
                        <option value = "takeCareBaby">Take Care Baby</option>
                      </select>
                      {/* <input type = "date" className="form-control"></input> */}
                    </Col>
                    <Col md="1 mt-3">
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="btn bg-primary text-white"
                          onClick={fetchaayaData}
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
                      <th>Aya Name</th>
                      <th>Customer Code</th>
                      <th>Customer Name</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Reason</th>
                      <th>Rate</th>
                      <th className="">Shift</th>
                      <th className="">Purpose</th>
                      {/* <th className="">Assign</th> */}
                    </tr>
                  </thead>

                  {loading ? (
                    <div className="text-center d-flex justify-content-center p-3">
                      Loading...
                    </div>
                  ) : (
                    <tbody>
                        {assignedCustomerDetails.map((item, index) => {
                        if (item) {
                          return (
                            <tr key={tech.id} onClick={() => handleRowClick()}>
                              <td>{tech.ayaCode}</td>
                              <td>{tech.name}</td>
                              <td>{item.assignedCustomerCode}</td>
                              <td>{item.assignedCustomerName}</td>
                              <td>{item.assignedCustomerFromDate}</td>
                              <td>{item.assignedCustomerToDate}</td>
                              <td>{item.assignedCustomerReason}</td>
                              <td>{item.assignedCustomerRate}</td>
                              <td>{item.assignedCustomerShift}</td>
                              <td>{item.assignedCustomerPurpose}</td>
                              {/* <td>
                                <button className="btn bg-primary text-white" onClick={() => fetchPrintDetails(index)}>Print</button>
                              </td> */}
                            </tr>
                          );
                        }
                      }).reverse()}
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

