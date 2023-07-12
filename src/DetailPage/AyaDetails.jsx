import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../Url";

function AyaDetails() {
  const [tech, setTech] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [border, setBorder] = useState(false);

  const [joining, setJoining] = useState("");

  const [closingDate, setClosingDate] = useState("");

  const [statusAya, setStatusAya] = useState("");
  const [workShift, setWorkShift] = useState("");
  const [name, setName] = useState("");
  const [guardianName, setGuardianName] = useState("");
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
  const [ayaSpeciality, setAyaSpeciality] = useState("");

  const [ayaRemark, setayaRemark] = useState("");
  const [ayaCanSpeak, setayaCanSpeak] = useState([]);
  const [workinglocation, setWorkingLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [assign, setAssign] = useState("");

  const [assigndata, setAssignData] = useState([]);
  // const [assignName, setAssginName] = useState("");
  // const [assignCheck, setAssignCheck] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const apiTechid = () => {
    axios.get(`${URL}/ayareg/${id}`).then((res) => setTech(res.data.data));
    console.log(tech);
  };
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${id}`);
      const techData = response.data.data;
      setTech(techData);
      setName(techData.name);
      setGuardianName(techData.guardianName);
      setWorkShift(techData.workShift);
      setJoining(techData.joining);
      setClosingDate(techData.closingDate);

      setPresentAddress(techData.presentAddress);
      setVill(techData.vill);
      setStreet(techData.street);
      setLandmark(techData.landmark);
      setPost(techData.post);
      setDistrict(techData.district);
      setState(techData.state);
      setPin(techData.pin);
      setPermanentAddress(techData.permanentAddress);
      setPermanentVill(techData.permanentVill);
      setPermanentStreet(techData.permanentAddress);
      setPermanentLandmark(techData.permanentLandmark);
      setPermanentDistrict(techData.permanentDistrict);
      setPermanentState(techData.permanentState);
      setPermanentPin(techData.permanentPin);
      setPermanentPost(techData.permanentPost);
      setDateOfBirth(techData.dateOfBirth);
      setGender(techData.gender);
      setAge(techData.age);
      setNationality(techData.nationality);
      setContactNumber(techData.contactNumber);
      setAlternativeNumber(techData.alternativeNumber);
      setReligion(techData.religion);
      setMarriageStatus(techData.marriageStatus);
      setIdCardType(techData.idCardType);
      setIdCardNumber(techData.idCardNumber);
      setStatusAya(techData.statusAya);

      setayaRemark(techData.ayaRemark);
      setAyaSpeciality(techData.ayaSpeciality);
      setayaCanSpeak(techData.ayaCanSpeak);
      setWorkingLocation(techData.workinglocation);
      setAssign(techData.assign);
    } catch (error) {
      console.log(error);
    }
  };

  // name comes undefined

  const handleDelete = () => {
    axios
      .delete(`${URL}/ayareg/${id}`)
      .then((res) => {
        console.log("Data deleted successfully");

        // window.location.href = "http://localhost:3000/ayaList";
        navigate("/ayaList");

        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.log("Error deleting data:", error);
        // Handle any errors that occurred during deletion
      });
  };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .put(`${URL}/ayareg/${id}`, tech)
  //     .then((res) => {
  //       alert("Data updated successfully");
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
          name: name,
          guardianName: guardianName,
          workShift: workShift,
          joining: joining,

          closingDate: closingDate,

          presentAddress: presentAddress,
          vill: vill,
          street: street,
          landmark: landmark,
          post: post,
          district: district,
          state: state,
          pin: pin,
          permanentAddress: permanentAddress,
          permanentStreet: permanentStreet,
          permanentLandmark: permanentLandmark,
          permanentPost: permanentPost,
          permanentDistrict: permanentDistrict,
          permanentState: permanentState,
          permanentVill: permanentVill,
          permanentPin: permanentPin,
          dateOfBirth: dateOfBirth,
          gender: gender,
          age: age,
          nationality: nationality,
          contactNumber: contactNumber,
          alternativeNumber: alternativeNumber,
          religion: religion,
          marriageStatus: marriageStatus,
          idCardType: idCardType,
          idCardNumber: idCardNumber,
          statusAya: statusAya,
          ayaRemark: ayaRemark,
          ayaSpeciality: ayaSpeciality,
          ayaCanSpeak: ayaCanSpeak,
          workinglocation: workinglocation,
          assign: assign,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchCustomerData();
      const data = await response.json();
      console.log(data);
      alert("data Submitted Succesfully");
    } catch (err) {
      console.log(err);
    }
  };

  const view = () => {
    console.log("view screen");
    navigate(`/ayaassign/${id}`);
  };

  const handleRowRemove = () => {
    setBorder(true);
  };

  useEffect(() => {
    apiTechid();
    fetchCustomerData();
  }, [id]);

  // useEffect(() => {
  //   if (assignCheck) {
  //     fetchAssignData();
  //   }
  // }, [assignCheck]);

  console.log("id", id);

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
                      alt="Choose Image"
                      textAlign = "center"
                    />
                  </div>
                  <div class="profile-usertitle">
                    <div class="profile-usertitle-name">{tech.name}</div>
                    <div class="profile-usertitle-job">
                      Aya Code :{" "}
                      <span style={{ textTransform: "lowercase" }}>
                        {tech.ayaCode}
                      </span>
                    </div>
                    {/* <div class="profile-usertitle-job">
                      Assign :{" "}
                      <span style={{ textTransform: "lowercase" }}>{}</span>
                    </div> */}
                  </div>
                  <div class="profile-userbuttons">
                    <button
                      type="button"
                      class="btn btn-success btn-sm mb-3"
                      onClick={handleRowRemove}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm mb-3"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm mb-3"
                      onClick={() => view()}
                    >
                      Assign Customer
                    </button>
                  </div>
                  <div>
        <label htmlFor="image-upload" class="btn btn-primary btn-sm">
          Change Image
        </label>
        <input
          id="image-upload"
          type="file"
          style={{ display: "none" }}
          // onChange={handleImageUpload}
        />
      </div>
                  <hr />
                  {/* <div>
                    <div class="bd-example">
                      <div class="list-group">
                        <a
                          aria-current="page"
                          class="list-group-item list-group-item-action active"
                          href="/profile"
                        >
                          Personal Info
                        </a>
                        <a
                          class="list-group-item list-group-item-action "
                          href="/change-password"
                        >
                          Change Password
                        </a>
                        <a
                          class="list-group-item list-group-item-action "
                          href="/preferences"
                        >
                          Preferences
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </Col>
            <Col md="9">
              <div className="my-3 p-3 bg-body rounded shadow-sm detailPage">
                <h6 className="border-bottom pb-2 mb-0 mb-3 ">Personal Info</h6>

                <Form onSubmit={handleFormSubmit}>
                  <Row>
                    <Col md="6">
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
                          value={name || ""}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label>Father's / Husband Name:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="guardianName"
                          value={guardianName || ""}
                          onChange={(e) => setGuardianName(e.target.value)}
                        />
                        {/* if border were fasle  then add  when border true remove Readonly */}
                      </FormGroup>
                    </Col>
                    {/* <Col md="6">
                      <label>Assign:</label>
                      <select
                        // className="form-control form-select"
                        className={`form-control ${
                          border
                            ? "form-select"
                            : "  border-0 bg-secondary text-white event-none"
                        }`}
                        value={tech.assign || ""}
                        name="assign"
                        onChange={handleInputChange}
                      >
                        {customer.map((item) => {
                          return (
                            <>
                              <option value={item.name}>{item.name}</option>
                            </>
                          );
                        })}
                      </select>
                    </Col> */}
                    <Col md="6">
                      <FormGroup>
                        <label>Shift of Work:</label>
                        <select
                          // className="form-control form-select"
                          className={`form-control   ${
                            border
                              ? "form-select"
                              : " border-0 bg-secondary text-white event-none"
                          }`}
                          value={workShift || ""}
                          name="workShift"
                          onChange={(e) => setWorkShift(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Day">Day</option>
                          <option value="Night">Night</option>
                          <option value="day-night">Day Night</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Date of Joining:</label>
                        <input
                          type={border ? "date" : "text"}
                          name="joining"
                          // className="form-control"
                          className={`form-control   ${
                            border
                              ? ""
                              : " border-0 bg-secondary text-white event-none"
                          }`}
                          value={joining ? joining.substring(0, 10) : ""}
                          onChange={(e) => setJoining(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label>Closing Date:</label>
                        <input
                          type={border ? "date" : "text"}
                          name="closingDate"
                          // className="form-control"
                          className={`form-control   ${
                            border
                              ? ""
                              : " border-0 bg-secondary text-white event-none"
                          }`}
                          value={
                            closingDate ? closingDate.substring(0, 10) : ""
                          }
                          onChange={(e) => setClosingDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <h3 className="">Present Address</h3>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Present Address:</label>
                        <input
                          type="text"
                          name="presentAddress"
                          value={presentAddress || ""}
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          onChange={(e) => setPresentAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Vill:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          type="text"
                          name="vill"
                          value={vill || ""}
                          onChange={(e) => setVill(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label> Street:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          type="text"
                          name="street"
                          value={street || ""}
                          onChange={(e) => setStreet(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label> Landmark:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="landmark"
                          type="text"
                          value={landmark || ""}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label> Post:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="post"
                          type="text"
                          value={post || ""}
                          onChange={(e) => setPost(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label> District:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          type="text"
                          name="district"
                          value={district || ""}
                          onChange={(e) => setDistrict(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label> State:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          type="text"
                          name="state"
                          value={state || ""}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label> Pin:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          type="text"
                          name="pin"
                          value={pin || ""}
                          onChange={(e) => setPin(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <h3 className="">Permanenet Address</h3>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlhtmlFor="permanentAddress">
                          Permanent Address:
                        </label>
                        <input
                          type="text"
                          name="permanentAddress"
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          id="permanentAddress"
                          value={permanentAddress || ""}
                          onChange={(e) => setPermanentAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlhtmlFor="permanentVill">Vill:</label>
                        <input
                          type="text"
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          id="permanentVill"
                          name="permanentVill"
                          value={permanentVill || ""}
                          onChange={(e) => setPermanentVill(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlhtmlFor="permanentStreet">Street:</label>
                        <input
                          type="text"
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          id="permanentStreet"
                          name="permanentStreet"
                          value={permanentStreet || ""}
                          onChange={(e) => setPermanentStreet(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlhtmlFor="permanentLandmark">
                          Land Mark:
                        </label>
                        <input
                          type="text"
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="permanentLandmark"
                          id="permanentLandmark"
                          value={permanentLandmark || ""}
                          onChange={(e) => setPermanentLandmark(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlhtmlFor="permanentPost">Post:</label>
                        <input
                          type="text"
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="permanentPost"
                          id="permanentPost"
                          value={permanentPost || ""}
                          onChange={(e) => setPermanentPost(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlhtmlFor="permanentDistrict">District:</label>
                        <input
                          type="text"
                          name="permanentDistrict"
                          id="permanentDistrict"
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          value={permanentDistrict || ""}
                          onChange={(e) => setPermanentDistrict(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label> State:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="permanentState"
                          type="text"
                          value={permanentState || ""}
                          onChange={(e) => setPermanentState(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label> Pin:</label>
                        <input
                          // className="form-control"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="permanentPin"
                          type="text"
                          value={permanentPin || ""}
                          onChange={(e) => setPermanentPin(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <h3 className="">Personal Detail</h3>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                          type={border ? "date" : "text"}
                          id="dateOfBirth"
                          name="dateOfBirth"
                          // className="form-control"
                          className={`form-control   ${
                            border
                              ? ""
                              : " border-0 bg-secondary text-white event-none"
                          }`}
                          value={
                            dateOfBirth ? dateOfBirth.substring(0, 10) : ""
                          }
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="gender">Gender:</label>

                        <select
                          className={`form-control ${
                            border
                              ? "form-select"
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          value={gender || ""}
                          onChange={(e) => setGender(e.target.value)}
                          name="gender"
                          id="gender"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="age">Age:</label>
                        <input
                          type="number"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          id="age"
                          name="age"
                          // className="form-control"
                          value={age || ""}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="nationality">Nationality:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="nationality"
                          id="nationality"
                          // className="form-control"
                          value={nationality || ""}
                          onChange={(e) => setNationality(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input
                          type="tel"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          id="contactNumber"
                          name="contactNumber"
                          // className="form-control"
                          value={contactNumber || ""}
                          onChange={(e) => setContactNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="alternativeNumber">
                          Alternative Number:
                        </label>
                        <input
                          type="tel"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          id="alternativeNumber"
                          name="alternativeNumber"
                          // className="form-control"
                          value={alternativeNumber || ""}
                          onChange={(e) => setAlternativeNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="religion">Religion:</label>
                        <input
                          type="text"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          id="religion"
                          // className="form-control"
                          value={religion || ""}
                          name="religion"
                          onChange={(e) => setReligion(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label for="marriageStatus">Marriage Status:</label>
                        <select
                          id="marriageStatus"
                          className={`form-control ${
                            border
                              ? "form-select"
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          name="marriageStatus"
                          value={marriageStatus || ""}
                          onChange={(e) => setMarriageStatus(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widow">Widow</option>
                        </select>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label>ID Card Type:</label>
                        <select
                          className={`form-control ${
                            border
                              ? "form-select"
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          value={idCardType || ""}
                          name="idCardType"
                          onChange={(e) => setIdCardType(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="aadhar-card">Aadhar Card</option>
                          <option value="voter-idcard">Voter IdCard</option>
                          <option value="pan-card">Pan Card</option>
                          <option value="driving-license">
                            Driving License
                          </option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>ID Card Number:</label>
                        <input
                          // className="form-control"
                          name="idCardNumber"
                          type="text"
                          className={`form-control ${
                            border
                              ? ""
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          value={idCardNumber || ""}
                          onChange={(e) => setIdCardNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    {/* {border ? (
                      <Col md="6">
                        <FormGroup>
                          <label for="idProof">ID Proof:</label>
                          <input
                            type="file"
                            id="idproof"
                            className="form-control"
                            // onChange={handleImageUpload}
                          />
                        </FormGroup>
                      </Col>
                    ) : null} */}
                    {/* <Col md="6">
                      <div className="">
                        <div className="image-box">
                          {selectedImage && (
                            <img src={selectedImage} alt="Preview" />
                          )}
                        </div>
                      </div>
                    </Col> */}
                    <Col md="6">
                      <FormGroup>
                        <label for="idProof">Status of Aya:</label>
                        <select
                          id="status"
                          name="statusAya"
                          // className="form-control form-select"
                          className={`form-control ${
                            border
                              ? "form-select"
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          value={statusAya || ""}
                          onChange={(e) => setStatusAya(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Running-Aya">Running Aya</option>
                          <option value="Close-Aya">Close Aya</option>
                          <option value="Hold-Aya">Hold Aya</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label for="idProof">Working Location:</label>
                        <select
                          id="workinglocation"
                          name="workinglocation"
                          // className="form-control form-select"
                          className={`form-control ${
                            border
                              ? "form-select"
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          value={workinglocation || ""}
                          onChange={(e) => setWorkingLocation(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Local">Local</option>
                          <option value="Out-Station">Out Station</option>
                        </select>
                      </FormGroup>
                    </Col>

                    {/* <Col md="6">
                  <FormGroup>
                    <label for="ayaRemark">Aya Remark:</label>
                    <select
                      id="ayaRemark"
                      name="ayaRemark"
                      className="form-control form-select"
                      value={ayaRemark}
                      onChange={(e) => setayaRemark(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Misbehave">Misbehave</option>
                      <option value="Personal Setting">Personal Setting</option>
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Misbehave with Office Staff">
                        Misbehave with Office Staff
                      </option>
                      <option value="Misbehave with aya">
                        Misbehave with aya
                      </option>
                    </select>
                  </FormGroup>
                </Col> */}
                    <Col md="6">
                      <FormGroup>
                        <label for="ayaRemark">Aya Speciality:</label>
                        <select
                          id="ayaSpeciality"
                          // className="form-control form-select"
                          className={`form-control ${
                            border
                              ? "form-select"
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          value={ayaSpeciality || ""}
                          name="ayaSpeciality"
                          onChange={(e) => setAyaSpeciality(e.target.value)}
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
                    <Col md="6">
                      <FormGroup>
                        <label for="canspeak">aya Can Speak:</label>
                        <select
                          id="canspeak"
                          name="ayaCanSpeak"
                          // className="form-control form-select"
                          className={`form-control ${
                            border
                              ? "form-select"
                              : "  border-0 bg-secondary text-white event-none"
                          }`}
                          value={ayaCanSpeak || ""}
                          onChange={(e) => setayaCanSpeak(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Bengali">Bengali</option>
                          <option value="English">English</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <div className="mt-3">
                        {border ? (
                          <button
                            type="submit"
                            className="btn bg-primary text-white"
                          >
                            Save
                          </button>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default adminLayout(AyaDetails);

// firstly remove border in detailPage and only do read only  and then user clicks on edit btn it appear border and remove readonly
