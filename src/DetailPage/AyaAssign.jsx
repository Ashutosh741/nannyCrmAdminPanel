import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../assets/css/profile.css";
import AyaListContent from "../ListPages/AyaListContent";

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
  const [assignedCustomerId,setAssignedCustomerId] = useState('');


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
      
      // console.log("what's techDAata",techData)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredCustomer = async(e)=>{
    e.preventDefault()
    try{
      const response = await axios.get(`${URL}/customerreg`);
      // if(techData.attendService == assignedCustomerShift && techData.forService == assignedCustomerPurpose){

      // }
      let filteredData = response.data.data;
      console.log("filtered Customer data",filteredData)
        
      if (assignedCustomerPurpose) {
        // Filter data based on the workinglocation
        filteredData = response.data.data.filter((item) => item.requirementpurpose === assignedCustomerPurpose);
      }

      const data = filteredData.map((item) => {
        const customerList = [...item.requirementpurpose];
        return { ...item, customerList };
      });
      console.log("required cusotmer",data);
      setCustomerList(data);
    } catch(error){
      console.log(error);
    }
  }

  const fetchassignData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${assignedCustomerCode}`);
      const techData = response.data.data;
      // console.log("where are you",techData)
      setAssignedCustomerId(techData._id);
      // console.log("yhi kr skta hai",techData._id)
      setAssignedCustomerName(techData.name);
      setAssignedCustomerId(techData._id);
      // console.log("it's me ",techData.name);

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
  }, [id, assignedCustomerPurpose, customerSelect]);
  

  const handleFormSubmitCustomer = async (e) => {
    e.preventDefault();
    // console.log("yeah bro running",assignedCustomerId);
    try {
      const response = await axios.put(`${URL}/customerreg/${assignedCustomerId}`, {
        assignedAyaCode: tech.ayaCode,
        assignedAyaName: tech.name,
        assignedAyaFromDate: assignedCustomerFromDate,
        assignedAyaToDate: assignedCustomerToDate,
        assignedAyaReason: assignedCustomerReason,
        assignedAyaRate: assignedCustomerRate,
        assignedAyaShift: assignedCustomerShift,
        assignedAyaPurpose: assignedCustomerPurpose,
      });
      const data = response.data;
      console.log("it's show time ", data);
      await fetchassignData();
    } catch (err) {
      console.log(err);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
     
        // console.log("helo hello why this is not showing+",assignedCustomerName)
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
      handleFormSubmitCustomer(e);

      
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = () => {
    // console.log(`/customerreg/${item._id}`);

    navigate(`/customerreg/${assignedCustomerCode}`);
  };


  useEffect(() => {
    fetchassignData();
  }, [assignedCustomerCode]);

  return (
    <>
      <section className="regList mt-5">
        <Container>
          <Row className="align-items-center">
            {/* <Col md = "12">
              <AyaListContent/>
            </Col> */}
            <Col md="12" className="mt-4">
              <div className="">
                <Form onSubmit={(e)=>{handleFormSubmit(e); }}>
                  <Row>

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
                    <Col md = "2">
                      <label className="mb-1">Shift</label>
                      <select className="form-select" onChange={(e)=>setAssignedCustomerShift(e.target.value)} value={assignedCustomerShift} required>
                        <option value = "select">Select</option>
                        <option value = "day">Day</option>
                        <option value = "night">Night</option>
                        <option value = "dayNight">Day and Night</option>
                      </select>
                      {/* <input type = "date" className="form-control"></input> */}
                    </Col>
                    <Col md = "2">
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
                    <Col md="12 text-center mt-3">
                      <div className="mt-4">
                        <button
                          // type="submit"
                          className="btn bg-primary text-white"
                          onClick={fetchFilteredCustomer}
                        >
                          Search Customer 
                        </button>
                      </div>
                    </Col>
                    <Col md="4 mt-3">
                      <label className="mb-1">List of Available Customer</label>
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

