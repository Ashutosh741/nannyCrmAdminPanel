import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../assets/css/profile.css";

function CustomerAssign() {
  const [tech, setTech] = useState([]);
  const [list, setList] = useState([]);
  const [ayaList, setAyaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ayaSelect, setAyaSelect] = useState(false);

  const [assignName, setAssignName] = useState("");
  const [assignedAyaCode, setAssignedAyaCode] = useState("");
  const [assignedAyaName, setAssignedAyaName] = useState("");
  const [assignedAyaFromDate, setAssignedAyaFromDate] = useState("");
  const [assignedAyaToDate, setAssignedAyaToDate] = useState("");
  const [assignedAyaReason, setAssignedAyaReason] = useState("");
  const [assignedAyaRate, setAssignedAyaRate] = useState("");
  const [assignedAyaShift, setAssignedAyaShift] = useState("");
  const [assignedAyaPurpose, setAssignedAyaPurpose] = useState("");
  const [assignedAyaDetails,setAssignedAyaDetails] = useState([]);
  const [assignedAyaId,setAssignedAyaId] = useState('');


  const { id } = useParams();

  const navigate = useNavigate();

  // const apiTechid = () => {
  //   axios.get(`${URL}/Ayareg/${id}`).then((res) => setTech(res.data.data));
  //   console.log(tech);
  // };

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${id}`);
      const techData = response.data.data;
      setTech(techData);
      console.log("it's customer techDAata",techData)

      setAssignedAyaDetails(techData.assignedAyaDetails)
      // setAssignedAyaCode(techData.assignedAyaCode);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssignedAyaData = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${assignedAyaCode}`);
      const techData = response.data.data;
      console.log("what's techDAata",techData)
      setAssignedAyaId(techData._id);
      console.log("dekho kya hota hai",techData._id)
      setAssignedAyaName(techData.name);
      console.log("it's her",techData.name);

      // console.log("assign data", assignData);
    } catch (error) {
      console.log(error);
    }
  };

  const apiAya = () => {
    axios.get(`${URL}/ayareg/`).then((res) => setAyaList(res.data.data));
    console.log("aya list",ayaList);
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
    fetchCustomerData();
    apiAya();
    fetchAssignedAyaData();
  }, [id,ayaSelect,assignedAyaPurpose]);

  console.log("id", id);

  const handleFormSubmitAya = async (e) => {
    e.preventDefault();
    console.log("yeah bro running",assignedAyaId);
    try {
      const response = await axios.put(`${URL}/ayareg/${assignedAyaId}`, {
        assignedCustomerCode: tech.customerCode,
        assignedCustomerName: tech.name,
        assignedCustomerFromDate: assignedAyaFromDate,
        assignedCustomerToDate: assignedAyaToDate,
        assignedCustomerReason: assignedAyaReason,
        assignedCustomerRate: assignedAyaRate,
        assignedCustomerShift: assignedAyaShift,
        assignedCustomerPurpose: assignedAyaPurpose,
      });
      const data = response.data;
      console.log("it's show time ", data);
      // await fetchassignData();
    } catch (err) {
      console.log(err);
    }
  };




  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/customerreg/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          assignedAyaCode : assignedAyaCode,
          assignedAyaName : assignedAyaName,
          assignedAyaFromDate : assignedAyaFromDate,
          assignedAyaToDate : assignedAyaToDate,
          assignedAyaReason : assignedAyaReason,
          assignedAyaRate : assignedAyaRate,
          assignedAyaShift : assignedAyaShift,
          assignedAyaPurpose : assignedAyaPurpose,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchCustomerData();

      const data = await response.json();
      console.log(data);
      const newAssignedAyaDetails = {
        assignedAyaCode : assignedAyaCode,
        assignedAyaName : assignedAyaName,
        assignedAyaFromDate : assignedAyaFromDate,
        assignedAyaToDate : assignedAyaToDate,
        assignedAyaReason : assignedAyaReason,
        assignedAyaRate : assignedAyaRate,
        assignedAyaShift : assignedAyaShift,
        assignedAyaPurpose : assignedAyaPurpose,
      }
      setAssignedAyaDetails(previousassignedAyaDetails => [...previousassignedAyaDetails,newAssignedAyaDetails])
      setAssignedAyaFromDate("");
      setAssignedAyaToDate("");
      setAssignedAyaReason("select");
      setAssignedAyaRate("");
      setAssignedAyaShift("select");
      setAssignedAyaPurpose("select");
      setAssignedAyaCode("");
      handleFormSubmitAya(e);

      alert("data Submitted Succesfully");
    } catch (err) {
      console.log(err);
    }
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setTech((prevTech) => ({
  //     ...prevTech,
  //     [name]: value,
  //   }));
  // };

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
    fetchCustomerData();
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
                  <Col md="4">
                      <label className="mb-1">Assign:</label>
                      <select
                        className="form-control form-select"
                        value={assignedAyaCode}
                        name="assign"
                        onChange={(e) => setAssignedAyaCode(e.target.value)}
                        onClick={() => setAyaSelect(true)}
                      >
                        {!ayaList ? (
                          <option value="">Loading...</option>
                        ) : (
                          <>
                            <option value="">Select</option>
                            {ayaList.map((item) => (
                              <option key={item._id} value={item.ayaCode}>
                                {item.ayaCode} {item.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>

                    </Col>

                    <Col md = "2">
                      <label className="mb-1">From Date</label>
                      <input type = "date" className="form-control" onChange={(e)=>setAssignedAyaFromDate(e.target.value)} value = {assignedAyaFromDate} required></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1" >To Date</label>
                      <input type = "date" className="form-control"  onChange={(e)=>setAssignedAyaToDate(e.target.value)} value={assignedAyaToDate}></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">Reason</label>
                      <select className="form-select" onChange={(e)=>setAssignedAyaReason(e.target.value)} value={assignedAyaReason} required>
                        <option value = "select">Select</option>
                        <option value = "hold">Hold</option>
                        <option value = "replace">Replace</option>
                      </select>
                      {/* <input type = "date" className="form-control"></input> */}
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">Rate</label>
                      <input type = "number" className="form-control" onChange={(e)=>setAssignedAyaRate(e.target.value)} value={assignedAyaRate} required></input>
                    </Col>
                    <Col md = "2 mt-3">
                      <label className="mb-1">Shift</label>
                      <select className="form-select" onChange={(e)=>setAssignedAyaShift(e.target.value)} value={assignedAyaShift} required>
                        <option value = "select">Select</option>
                        <option value = "day">Day</option>
                        <option value = "night">Night</option>
                        <option value = "dayNight">Day and Night</option>
                      </select>
                      {/* <input type = "date" className="form-control"></input> */}
                    </Col>
                    <Col md = "2 mt-3">
                      <label className="mb-1">Purpose</label>
                      <select className="form-select" onChange={(e)=>setAssignedAyaPurpose(e.target.value)} value={assignedAyaPurpose} required>
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
                          onClick={fetchCustomerData}
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
                      <th>Customer Name</th>
                      <th>Aya Code</th>
                      <th>Aya Name</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Reason</th>
                      <th>Rate</th>
                      <th className="">Shift</th>
                      <th className="">Purpose</th>
                    </tr>
                  </thead>

                  {loading ? (
                    <div className="text-center d-flex justify-content-center p-3">
                      Loading...
                    </div>
                  ) : (
                    <tbody>
                        {assignedAyaDetails.map((item, index) => {
                        if (item) {
                          return (
                            <tr key={tech.id} onClick={() => handleRowClick()}>
                              <td>{tech.customerCode}</td>
                              <td>{tech.name}</td>
                              <td>{item.assignedAyaCode}</td>
                              <td>{item.assignedAyaName}</td>
                              <td>{item.assignedAyaFromDate}</td>
                              <td>{item.assignedAyaToDate}</td>
                              <td>{item.assignedAyaReason}</td>
                              <td>{item.assignedAyaRate}</td>
                              <td>{item.assignedAyaShift}</td>
                              <td>{item.assignedAyaPurpose}</td>
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

export default adminLayout(CustomerAssign);
