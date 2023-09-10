import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerRegister() {
  const [customerCode, setCustomerCode] = useState("");
  const [booking, setBooking] = useState("");
  const [dateRequirement, setDateRequirement] = useState("");
  const [requirementpurpose, setRequirementPurpose] = useState("");
  const [securityAmount, setSecurityAmount] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [securityAdjustment, setSecurityAdjustment] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [idCardType, setIdCardType] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [vill, setVill] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [post, setPost] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [attendService, setAttendService] = useState("");

  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentVill, setPermanentVill] = useState("");
  const [permanentStreet, setPermanentStreet] = useState("");
  const [permanentLandmark, setPermanentLandmark] = useState("");
  const [permanentPost, setPermanentPost] = useState("");
  const [permanentDistrict, setPermanentDistrict] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPin, setPermanentPin] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [alternativeNumber, setAlternativeNumber] = useState("");
  const [religion, setReligion] = useState("");
  const [marriageStatus, setMarriageStatus] = useState("");
  const [idProof, setIdProof] = useState("");
  const [status, setStatus] = useState("");
  const [customerRemark, setCustomerRemark] = useState("");
  const [customerSpeak, setCustomerSpeak] = useState([]);
  const [forService, setForService] = useState("");
  const [file, setFile] = useState(null);
  const [sameAddress, setSameAddress] = useState(false);
  // const [aadharCardNumber,setAadharCardNumber] = useState('');
  // const [aadharCardImage,setAadharCardImage] = useState(null);
  const [idCardImage,setIdCardImage] = useState(null);  
  const[casteCategory,setCasteCategory] = useState('')
  const [baseRate,setBaseRate] = useState('');
  const [workinglocation, setWorkingLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showCooking, setShowCooking] = useState(false);
  const [showHousekeeping, setShowHousekeeping] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setSecurityAdjustment("");
    setClosingDate("");
    setStatus("");
    setCustomerRemark("");
    setCustomerSpeak("");
    setBooking("");
    setDateRequirement("");
    setRequirementPurpose("");
    setSecurityAmount("");
    setAttendService("");
    setForService("");

    setName("");
    setFatherName("");
    setIdCardType("");
    setIdCardNumber("");
    setPresentAddress("");
    setVill("");
    setStreet("");
    setStreet("");
    setLandmark("");
    setPost("");
    setDistrict("");
    setState("");
    setPin("");
    setPermanentAddress("");
    setPermanentVill("");
    setPermanentStreet("");
    setPermanentLandmark("");
    setPermanentPost("");
    setPermanentDistrict("");
    setPermanentState("");
    setPermanentPin("");
    setDateOfBirth("");
    setGender("");
    setAge("");
    setNationality("");
    setContactNumber("");
    setAlternativeNumber("");
    setReligion("");
    setMarriageStatus("");
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`${URL}/customerreg`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: name,
  //         guardianName: fatherName,

  //         presentAddress: presentAddress,
  //         vill: vill,
  //         street: street,
  //         landmark: landmark,
  //         attendService: attendService,
  //         forService: forService,
  //         post: post,
  //         district: district,
  //         state: state,
  //         pin: pin,
  //         securityAmount: securityAmount,
  //         permanentAddress: permanentAddress,
  //         permanentVill: permanentVill,
  //         permanentStreet: permanentStreet,
  //         permanentLandmark: permanentLandmark,
  //         permanentPost: permanentPost,
  //         permanentDistrict: permanentDistrict,
  //         permanentState: permanentState,
  //         permanentPin: permanentPin,
  //         dateOfBirth: dateOfBirth,
  //         gender: gender,
  //         age: age,
  //         nationality: nationality,
  //         contactNumber: contactNumber,
  //         alternativeNumber: alternativeNumber,
  //         religion: religion,
  //         marriageStatus: marriageStatus,
  //         idCardType: idCardType,
  //         idCardNumber: idCardNumber,

  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     alert("data Submitted Succesfully");
  //     resetForm();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("customerCode", customerCode);
    formData.append("name", name);
    formData.append("guardianName", fatherName);
    formData.append("booking", booking);
    formData.append("dateRequirement", dateRequirement);
    formData.append("requirementpurpose", requirementpurpose);
    formData.append("securityAdjustment", securityAdjustment);
    formData.append("closingDate", closingDate);
    formData.append("attendService",attendService);
    formData.append("presentAddress", presentAddress);
    formData.append("vill", vill);
    formData.append("street", street);
    formData.append("landmark", landmark);
    formData.append("post", post);
    formData.append("district", district);
    formData.append("state", state);
    formData.append("pin", pin);
    formData.append("permanentAddress", permanentAddress);
    formData.append("permanentVill", permanentVill);
    formData.append("permanentStreet", permanentStreet);
    formData.append("permanentLandmark", permanentLandmark);
    formData.append("permanentPost", permanentPost);
    formData.append("permanentDistrict", permanentDistrict);
    formData.append("permanentState", permanentState);
    formData.append("permanentPin", permanentPin);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("securityAmount", securityAmount);
    formData.append("nationality", nationality);
    formData.append("contactNumber", contactNumber);
    formData.append("alternativeNumber", alternativeNumber);
    formData.append("religion", religion);
    formData.append("marriageStatus", marriageStatus);
    // formData.append("aadharCardNumber", aadharCardNumber);
    // formData.append("aadharCardImage", aadharCardImage);
    formData.append("idCardImage", idCardImage);
    formData.append("idCardType", idCardType);
    formData.append("idCardNumber", idCardNumber);
    formData.append("statusofCustomer", status);
    formData.append("customerRemark", customerRemark);
    formData.append("customerSpeak", customerSpeak);
    formData.append("file", file);
    formData.append("baseRate",baseRate);
    formData.append("workinglocation", workinglocation);
    formData.append("forService", forService);




    axios
      .post(`${URL}/customerreg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        // Handle successful response
        console.log(response.data);
        alert("Data Submitted Successfully");
        navigate("/customerlist");
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };


  // const handleAadharFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setAadharCardImage(selectedFile);
  // };
  const handleIdCardFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setIdCardImage(selectedFile);
  };

  function getAge(dateString) 
  {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
       setAge(age);
  }
  
    useEffect(()=>{
      getAge(dateOfBirth);
    },[dateOfBirth])

  //   useEffect(()=>{
  //     if (sameAddress === true) {
  //       setPermanentAddress(presentAddress);
  //       setPermanentVill(vill);
  //       setPermanentStreet(street);
  //       setPermanentLandmark(landmark);
  //       setPermanentPost(post);
  //       setPermanentDistrict(district);
  //       setPermanentState(state);
  //       setPermanentPin(pin);
  //     } 
  //   },[presentAddress,vill,street,landmark,post,district,state,pin])

  // const handleCheckAddress = () => {
  //   setSameAddress(!sameAddress);
  //   console.log("same Address", sameAddress);
  //   if (sameAddress === true) {
  //     setPermanentAddress(presentAddress);
  //     setPermanentVill(vill);
  //     setPermanentStreet(street);
  //     setPermanentLandmark(landmark);
  //     setPermanentPost(post);
  //     setPermanentDistrict(district);
  //     setPermanentState(state);
  //     setPermanentPin(pin);
  //   } else {
  //     setPermanentAddress("");
  //     setPermanentVill("");
  //     setPermanentStreet("");
  //     setPermanentLandmark("");
  //     setPermanentPost("");
  //     setPermanentDistrict("");
  //     setPermanentState("");
  //     setPermanentPin("");
  //   }
  // };

  
    useState(()=>{
      if (isChecked) {
        setPermanentAddress(presentAddress);
        setPermanentVill(vill);
        setPermanentStreet(street);
        setPermanentLandmark(landmark);
        setPermanentPost(post);
        setPermanentDistrict(district);
        setPermanentState(state);
        setPermanentPin(pin);
      }
    },[isChecked])


  const handleChecked = () => {
    setIsChecked(!isChecked);

    // If the checkbox is checked, copy Present Address to Permanent Address

  };

  return (
    <section className="space registration">
      <Container>
        <Col md="12">
          <div className="">
            <h1 className="heading">Customer Details</h1>
          </div>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              {/* <Col md="4">
                <div className="">
                  <FormGroup>
                    <label>Customer Code:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="CustomerCode"
                      value={customerCode}
                      onChange={(e) => setCustomerCode(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </Col> */}
              <Col md="4">
                <FormGroup>
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label htmlFor="" className="fw-bold">
                    Image
                  </label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label>Father's / Husband Name:</label>
                  <input
                    type="text"
                    value={fatherName}
                    className="form-control"
                    required
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <div className="">
                  <FormGroup>
                    <label>Date Of Booking:</label>
                    <input
                      type="date"
                      name="booking"
                      className="form-control"
                      value={booking}
                      required
                      onChange={(e) => setBooking(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </Col>
              <Col md="4">
                <div className="">
                  <FormGroup>
                    <label>Date Of Requirement:</label>
                    <input
                      type="date"
                      name="dateRequirement"
                      value={dateRequirement}
                      className="form-control"
                      required
                      onChange={(e) => setDateRequirement(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </Col>
              {/* <Col md="4">
                <div className="">
                  <FormGroup>
                    <label>Requirement Purpose:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="requirementpurpose"
                      value={requirementpurpose}
                      onChange={(e) => setRequirementPurpose(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </Col> */}
              <Col md="4">
                <label>Security Deposit Amount:</label>
                <input
                  type="number"
                  name="securityAmount"
                  value={securityAmount}
                  className="form-control"
                  onChange={(e) => setSecurityAmount(e.target.value)}

                  required
                />
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Closing Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={closingDate}
                    required
                    onChange={(e) => setClosingDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                  <FormGroup>
                    <label>Monthly Rate</label>
                    <input
                      type="number"
                      name="baseRate"
                      className="form-control"
                      value={baseRate}
                      onChange={(e) => setBaseRate(e.target.value)}
                      required
                    />
                  </FormGroup>
                </Col>
              {/* <Col md="4">
                <FormGroup>
                  <label>Security Deposit Adjustment:</label>
                  <select
                    className="form-control form-select"
                    value={securityAdjustment}
                    name="securityAdjustment"
                    onChange={(e) => setSecurityAdjustment(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Adjustment">Adjustment</option>
                    <option value="Refund">Refund</option>
                    <option value="Hold">Hold</option>
                  </select>
                </FormGroup>
              </Col> */}

              <Col md="4">
                <FormGroup>
                  <label>Shift of Work:</label>
                  <select
                    className="form-control form-select"
                    value={attendService}
                    name="attendService"
                    onChange={(e) => setAttendService(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                    <option value="day-night">Day Night</option>
                  </select>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label for="ayaRemark">For Service:</label>
                  <select
                    id="forService"
                    className="form-control form-select"
                    value={forService}
                    name="forService"
                    onChange={(e) => {
                      const selectedService = e.target.value;
                      setForService(selectedService);
                      setShowCooking(selectedService === 'Cooking' || selectedService === 'Cooking-and-housekeeping');
                      setShowHousekeeping(selectedService === 'Housekeeping' || selectedService === 'Cooking-and-housekeeping');
                    }}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Cooking-and-housekeeping">
                      Cooking and housekeeping
                    </option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="New-born-baby">New born baby</option>
                    <option value="Old-man">Old man</option>
                    <option value="Old-woman">Old woman</option>
                    <option value="Take-care-baby">Take care baby</option>
                  </select>
                </FormGroup>
              </Col>
              {showCooking && (
                  <>
                                <Col md = '4'>
                <FormGroup>
                  <label className="mb-0">Cooking :</label>
                  <div className="d-flex gap-3 align-items-center">
                  <div className="option">
                  <input className="me-1" type = "checkbox"/>
                  <label>Breakfast</label>
                  </div>
                  <div className="option">
                  <input  className="me-1"  type = "checkbox"/>
                  <label>Lunch</label>
                  </div>
                  <div className="option">
                  <input  className="me-1"  type = "checkbox"/>
                  <label>Dinner</label>
                  </div>
                  </div>
                  </FormGroup>
              </Col>
              <Col md = '4'>
              <label>Total Person</label>

                <FormGroup>
                  <input className="bg-white" type= "number"/>
                </FormGroup>
              </Col>
              <Col md = '4'>
                <FormGroup>
                  <label>Timing</label>
                  <div className="d-flex gap-3 align-items-center">
                  <div className="option">
                  <label>Day</label>
                  <input className="ps-2" type = "time"/>
                  </div>
                  <div className="option">
                  <label>Night</label>
                  <input  className="ps-2"  type = "time"/>
                  </div>
                  </div>
                </FormGroup>
              </Col>
                  </>
              )}

              {showHousekeeping && (
                <>
                              <Col md = '4'>
                <FormGroup>
                  <label className="mb-0">House Keeping :</label>
                  <div className="d-flex gap-3 align-items-center">
                  <div className="option">
                  <input className="me-1" type = "checkbox"/>
                  <label>Clining</label>
                  </div>
                  <div className="option">
                  <input  className="me-1"  type = "checkbox"/>
                  <label>Dusting</label>
                  </div>
                  <div className="option">
                  <input  className="me-1"  type = "checkbox"/>
                  <label>Washing</label>
                  </div>
                  </div>
                  </FormGroup>
              </Col>
              <Col md = '4'>
              <label>Total Room</label>
                <FormGroup>
                  <input className="bg-white" type= "number"></input>
                </FormGroup>
              </Col>
              <Col md = '4'>
              <label>Total Family Member</label>

                <FormGroup>
                  <input className="bg-white" type= "number"></input>
                </FormGroup>
              </Col>
                </>
              )}

              <Col md="4">
                  <FormGroup>
                    <label for="idProof">Working Location:</label>
                    <select
                      id="workinglocation"
                      name="workinglocation"
                      className="form-control form-select"
                      value={workinglocation}
                      onChange={(e) => setWorkingLocation(e.target.value)}
                      required
                      
                    >
                      <option value="">Select</option>
                      <option value="Local">Local</option>
                      <option value="Out-Station">Out Station</option>
                    </select>
                  </FormGroup>
                </Col>

              <Col md="12">
                <h3 className="">Present Address</h3>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Present Address:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={presentAddress}
                    required
                    onChange={(e) => setPresentAddress(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Vill:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={vill}
                    onChange={(e) => setVill(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label> Street:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label> Landmark:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label> Post:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label> District:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label> State:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label> Pin:</label>
                  <input
                    className="form-control"
                    type="number"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md="12">
                <div
                  className="input-group mt-3  shadow rounded-3 p-3"
                  style={{ background: "#0747a6" }}
                  onClick={handleChecked}
                >
                  <input
                    type="checkbox"
                    id="checkaddress"
                    className="me-2"
                    checked={isChecked}
                    onChange={() => {}}
                    // style={{ cursor: "pointer" }}

                  />
                  <h6
                    htmlFor="checkaddress"
                    className="m-0 text-white"
                    // style={{ cursor: "pointer" }}
                    onClick={handleChecked}
                  >
                    If Present Address were same as Permanent Address then Click
                    the Checkbox{" "}
                  </h6>
                </div>
              </Col>
              <Col md="12">
                <h3 className="">Permanent Address</h3>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlhtmlFor="permanentAddress">
                    Permanent Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="permanentAddress"
                    value={permanentAddress}
                    required
                    onChange={(e) => setPermanentAddress(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlhtmlFor="permanentVill">Vill:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="permanentVill"
                    value={permanentVill}
                    onChange={(e) => setPermanentVill(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="permanentStreet">Street:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="permanentStreet"
                    value={permanentStreet}
                    onChange={(e) => setPermanentStreet(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="permanentLandmark">Land Mark:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="permanentLandmark"
                    value={permanentLandmark}
                    onChange={(e) => setPermanentLandmark(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="permanentPost">Post:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="permanentPost"
                    value={permanentPost}
                    onChange={(e) => setPermanentPost(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="permanentDistrict">District:</label>
                  <input
                    type="text"
                    id="permanentDistrict"
                    className="form-control"
                    value={permanentDistrict}
                    onChange={(e) => setPermanentDistrict(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label> State:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={permanentState}
                    onChange={(e) => setPermanentState(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label> Pin:</label>
                  <input
                    className="form-control"
                    type="number"
                    value={permanentPin}
                    onChange={(e) => setPermanentPin(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <h3 className="">Personal Detail</h3>
              </Col>
              {/* <Col md="4">
                  <FormGroup>
                    <label htmlFor="dateOfBirth">Aadhar Card Number</label>
                    <input type="text"
                    id="aadharCardNumber"
                    name="aadharCardNumber"
                    className="form-control"
                    value={aadharCardNumber}
                    onChange={(e) => setAadharCardNumber(e.target.value)}
                    required
                    data-type="adhaar-number"
                     maxLength="12"/>
                  </FormGroup>
                </Col> */}
                {/* <Col md="4">
                  <FormGroup>
                    <label htmlFor="" className="fw-bold">
                      Aadhar Card Image
                    </label>
                    <input
                      type="file"
                      name="aadharCardImage"
                      className="form-control"
                      onChange={handleAadharFileChange}
                    />

                  </FormGroup>
                </Col> */}
              <Col md="4">
                <FormGroup>
                  <label>ID Card Type:</label>
                  <select
                    className="form-control form-select"
                    value={idCardType}
                    onChange={(e) => setIdCardType(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="aadhar-card">Aadhar Card</option>
                    <option value="voter-idcard">Voter IdCard</option>
                    <option value="pan-card">Pan Card</option>
                    <option value="driving-license">Driving License</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>ID Card Number:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={idCardNumber}
                    onChange={(e) => setIdCardNumber(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                  <FormGroup>
                    <label htmlFor="" className="fw-bold">
                      ID Card Image
                    </label>
                    <input
                      type="file"
                      name="IdCardImage"
                      className="form-control"
                      onChange={handleIdCardFileChange}
                      required
                    />
                  </FormGroup>
                </Col>
              {/* <Col md="4">
                <FormGroup>
                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    className="form-control"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </FormGroup>
              </Col> */}
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="form-control"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="gender">Gender:</label>

                  <select
                    className="form-control form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    className="form-control"
                    value={age}
                    readOnly
                    // onChange={(e) => setAge(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="nationality">Nationality:</label>
                  <input
                    type="text"
                    id="nationality"
                    className="form-control"
                    value="Indian"
                    readOnly
                    // onChange={(e) => setNationality(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input
                    type="number"
                    id="contactNumber"
                    required
                    className="form-control"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="alternativeNumber">Alternative Number:</label>
                  <input
                    type="number"
                    id="alternativeNumber"
                    className="form-control"
                    value={alternativeNumber}
                    onChange={(e) => setAlternativeNumber(e.target.value)}
                  />
                </FormGroup>
              </Col>
              {/* <Col md="4">
                <FormGroup>
                  <label htmlFor="religion">Religion:</label>
                  <input
                    type="text"
                    id="religion"
                    className="form-control"
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                  />
                </FormGroup>
              </Col> */}
              <Col md="4">
                  <FormGroup>
                    <label htmlFor="religion">Religion:</label>
                    <select
                      id="religion"
                      name="religion"
                      className="form-control form-select"
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      required

                    >
                      <option value="">Select</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Islam">Islam</option>
                      <option value="Christanity">Christanity</option>
                      <option value="Sikhism">Sikhism</option>
                      <option value="Buddhism">Buddhism</option>
                      <option value="Jainism">Jainism</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="religion">Caste Category</label>
                    <select
                      id="casteCategory"
                      name="casteCategory"
                      className="form-control form-select"
                      value={casteCategory}
                      onChange={(e) => setCasteCategory(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="GEN/GC">General Category</option>
                      <option value="ST">Scheduled Tribe</option>
                      <option value="SC">Scheduled Caste</option>
                      <option value="OBC">Other Backward Class</option>
                    </select>
                  </FormGroup>
                </Col>
              <Col md="4">
                <FormGroup>
                  <label for="marriageStatus">Marriage Status:</label>
                  <select
                    id="marriageStatus"
                    className="form-control form-select"
                    value={marriageStatus}
                    onChange={(e) => setMarriageStatus(e.target.value)}

                  >
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widow">Widow</option>
                  </select>
                </FormGroup>
              </Col>

              {/* <Col md="4">
                <FormGroup>
                  <label for="idProof">ID Proof:</label>

                  <input type="file" className="idproof form-control" />
                </FormGroup>
              </Col> */}
              {/* <Col md="4">
                <FormGroup>
                  <label for="status">Status for Customer:</label>
                  <select
                    type="select"
                    id="status"
                    className="form-control form-select"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Running Customer">Running Customer</option>
                    <option value="Close Customer">Close Customer</option>
                    <option value="Hold Customer">Hold Customer</option>
                  </select>
                </FormGroup>
              </Col> */}
              {/* <Col md="4">
                <FormGroup>
                  <label for="customerRemark">Customer Remark:</label>
                  <select
                    id="customerRemark"
                    className="form-control form-select"
                    value={customerRemark}
                    onChange={(e) => setCustomerRemark(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Misbehave">Misbehave</option>
                    <option value="Personal Setting">Personal Setting</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Misbehave with Office Staff">
                      Misbehave with Office Staff
                    </option>
                    <option value="Misbehave with Aya">
                      Misbehave with Aya
                    </option>
                  </select>
                </FormGroup>
              </Col> */}
              <Col md="4">
                <FormGroup>
                  <label for="canspeak">Customer Can Speak:</label>
                  <select
                    id="canspeak"
                    className="form-control form-select"
                    value={customerSpeak}
                    onChange={(e) => setCustomerSpeak(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bengali">Bengali</option>
                    <option value="English">English</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md ='12'>
                <h3>Patient Status</h3>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="gender">Gender:</label>

                  <select
                    className="form-control form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Father's / Husband Name:</label>
                  <input
                    type="text"
                    value={fatherName}
                    className="form-control"
                    required
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Working Address:</label>
                  <input
                    type="text"
                    // value={fatherName}
                    className="form-control"
                    required
                    // onChange={(e) => setFatherName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Mobile No</label>
                  <input
                    type="number"
                    // value={fatherName}
                    className="form-control"
                    required
                    // onChange={(e) => setFatherName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                  <FormGroup>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="form-control"
                      // value={dateOfBirth}
                      // onChange={(e) => setDateOfBirth(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                <FormGroup>
                  <label htmlFor="gender">Category:</label>

                  <select
                    className="form-control form-select"
                    // value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Medical</option>
                    <option value="F">Surgical</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="gender">Attend Service</label>

                  <select
                    className="form-control form-select"
                    // value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Day</option>
                    <option value="F">Night</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md = '12'>
                <h3>Child Status</h3>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Child Name</label>
                  <input
                    type="text"
                    // value={fatherName}
                    className="form-control"
                    required
                    // onChange={(e) => setFatherName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Baby of Mothers Name</label>
                  <input
                    type="text"
                    // value={fatherName}
                    className="form-control"
                    required
                    // onChange={(e) => setFatherName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Address</label>
                  <input
                    type="text"
                    // value={fatherName}
                    className="form-control"
                    required
                    // onChange={(e) => setFatherName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label>Mobile No</label>
                  <input
                    type="number"
                    // value={fatherName}
                    className="form-control"
                    required
                    // onChange={(e) => setFatherName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                  <FormGroup>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="form-control"
                      // value={dateOfBirth}
                      // onChange={(e) => setDateOfBirth(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                <FormGroup>
                  <label htmlFor="gender">Category:</label>

                  <select
                    className="form-control form-select"
                    // value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Medical</option>
                    <option value="F">Surgical</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <label htmlFor="gender">Attend Service</label>

                  <select
                    className="form-control form-select"
                    // value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Day</option>
                    <option value="F">Night</option>
                  </select>
                </FormGroup>
              </Col>

              <Col md="12">
                <div className="mt-3">
                  <button type="submit" className="btn bg-primary text-white">
                    Submit
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
    </section>
  );
}

export default adminLayout(CustomerRegister);
