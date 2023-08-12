import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//  for regisstraction don't forget to let enter other charcater than alphabets    
// on replacement the replaced button should change, also then the inner content should also be changed
// also in the replace details , their should be one generate bill option, which turn on different colour 
// if the bill is generated, and overall the generatedbill should also show 

function AyaReg() {
  const [ayaCode, setayaCode] = useState("");
  const [joining, setJoining] = useState("");

  const [closingDate, setClosingDate] = useState("");

  const [statusAya, setStatusAya] = useState("");
  const [workShift, setWorkShift] = useState("");
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
  const [ayaimage, setAyaimage] = useState(null);

  const [ayaRemark, setayaRemark] = useState("");
  const [ayaCanSpeak, setayaCanSpeak] = useState([]);
  const [workinglocation, setWorkingLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [sameAddress, setSameAddress] = useState(true);
  const [aadharCardNumber,setAadharCardNumber] = useState('');
  const [aadharCardImage,setAadharCardImage] = useState(null);
  const [idCardImage,setIdCardImage] = useState(null);  
  const[casteCategory,setCasteCategory] = useState('')
  const [baseRate,setBaseRate] = useState('');

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setAyaimage(selectedFile);
  // };

  const navigate = useNavigate();

  const resetForm = () => {
    setJoining("");
    setClosingDate("");
    setStatusAya("");
    setWorkShift("");
    setWorkShift("");
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
    setAyaSpeciality("");
    setayaCanSpeak("");
    setWorkingLocation("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("ayaCode", ayaCode);
    formData.append("name", name);
    formData.append("guardianName", fatherName);
    formData.append("workShift", workShift);
    formData.append("joining", joining);
    formData.append("closingDate", closingDate);
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
    formData.append("nationality", nationality);
    formData.append("contactNumber", contactNumber);
    formData.append("alternativeNumber", alternativeNumber);
    formData.append("religion", religion);
    formData.append("casteCategory",casteCategory);
    formData.append("marriageStatus", marriageStatus);
    formData.append("aadharCardNumber", aadharCardNumber);
    formData.append("aadharCardImage", aadharCardImage);
    formData.append("idCardImage", idCardImage);
    formData.append("idCardType", idCardType);
    formData.append("idCardNumber", idCardNumber);
    formData.append("statusAya", statusAya);
    formData.append("ayaRemark", ayaRemark);
    formData.append("workinglocation", workinglocation);
    formData.append("ayaSpeciality", ayaSpeciality);
    formData.append("ayaCanSpeak", ayaCanSpeak);
    formData.append("file", file);
    formData.append("baseRate",baseRate);
    axios
      .post(`${URL}/ayareg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        // Handle successful response
        console.log(response.data);
        alert("Data Submitted Successfully");
        navigate("/ayalist");
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

  const handleAadharFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setAadharCardImage(selectedFile);
  };
  const handleIdCardFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setIdCardImage(selectedFile);
  };


  console.log("ayamdkfds", file);

  const handleCheckAddress = () => {
    setSameAddress(!sameAddress);
    console.log("same Address", sameAddress);
    if (sameAddress === true) {
      setPermanentAddress(presentAddress);
      setPermanentVill(vill);
      setPermanentStreet(street);
      setPermanentLandmark(landmark);
      setPermanentPost(post);
      setPermanentDistrict(district);
      setPermanentState(state);
      setPermanentPin(pin);
    } else {
      setPermanentAddress("");
      setPermanentVill("");
      setPermanentStreet("");
      setPermanentLandmark("");
      setPermanentPost("");
      setPermanentDistrict("");
      setPermanentState("");
      setPermanentPin("");
    }
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

  return (
    <>
      <section className="space registration">
        <Container>
          <Col md="12">
            <div className="">
              <h1 className="heading">Aya Details</h1>
            </div>
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <label>Father's / Husband Name:</label>
                    <input
                      type="text"
                      name="guardianName"
                      value={fatherName}
                      className="form-control"
                      onChange={(e) => setFatherName(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Shift of Work:</label>
                    <select
                      className="form-control form-select"
                      value={workShift}
                      name="workShift"
                      onChange={(e) => setWorkShift(e.target.value)}
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
                    <label>Date of Joining:</label>
                    <input
                      type="date"
                      name="joining"
                      className="form-control"
                      value={joining}
                      onChange={(e) => setJoining(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Closing Date:</label>
                    <input
                      type="date"
                      name="closingDate"
                      className="form-control"
                      value={closingDate}
                      onChange={(e) => setClosingDate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Base Rate</label>
                    <input
                      type="number"
                      name="baseRate"
                      className="form-control"
                      value={baseRate}
                      onChange={(e) => setBaseRate(e.target.value)}
                    />
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
                      name="presentAddress"
                      type="text"
                      value={presentAddress}
                      onChange={(e) => setPresentAddress(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>Vill:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="vill"
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
                      name="street"
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
                      name="landmark"
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
                      name="post"
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
                      name="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <label> State:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <label> Pin:</label>
                    <input
                      className="form-control"
                      type="number"
                      name="pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <div
                    className="input-group mt-3  shadow rounded-3 p-3"
                    style={{ background: "#0747a6" }}
                    onClick={handleCheckAddress}
                  >
                    <input
                      type="checkbox"
                      id="checkaddress"
                      className="me-2"
                      style={{ cursor: "pointer" }}
                    />
                    <label
                      htmlFor="checkaddress"
                      className="m-0 text-white"
                      style={{ cursor: "pointer" }}
                    >
                      If Present Address were same as Permanent Address then
                      Click the Checkbox{" "}
                    </label>
                  </div>
                </Col>
                <Col md="12">
                  <h3 className="">Permanenet Address</h3>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlhtmlFor="permanentAddress">
                      Permanent Address:
                    </label>
                    <input
                      type="text"
                      name="permanentAddress"
                      className="form-control"
                      id="permanentAddress"
                      value={permanentAddress}
                      onChange={(e) => setPermanentAddress(e.target.value)}
                      required

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
                      name="permanentVill"
                      value={permanentVill}
                      onChange={(e) => setPermanentVill(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlhtmlFor="permanentStreet">Street:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="permanentStreet"
                      name="permanentStreet"
                      value={permanentStreet}
                      onChange={(e) => setPermanentStreet(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlhtmlFor="permanentLandmark">Land Mark:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="permanentLandmark"
                      id="permanentLandmark"
                      value={permanentLandmark}
                      onChange={(e) => setPermanentLandmark(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlhtmlFor="permanentPost">Post:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="permanentPost"
                      id="permanentPost"
                      value={permanentPost}
                      onChange={(e) => setPermanentPost(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlhtmlFor="permanentDistrict">District:</label>
                    <input
                      type="text"
                      name="permanentDistrict"
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
                      name="permanentState"
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
                      name="permanentPin"
                      type="number"
                      value={permanentPin}
                      onChange={(e) => setPermanentPin(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <h3 className="">Personal Detail</h3>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="dateOfBirth">Aadhar Card Number</label>
                    <input type="number"
                    id="aadharCardNumber"
                    name="aadharCardNumber"
                    className="form-control"
                    value={aadharCardNumber}
                    onChange={(e) => setAadharCardNumber(e.target.value)}
                    required
                    data-type="adhaar-number"
                     maxLength="12"/>
                  </FormGroup>
                </Col>
                <Col md="4">
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
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>ID Card Type:</label>
                    <select
                      className="form-control form-select"
                      name="idCardType"
                      value={idCardType}
                      onChange={(e) => setIdCardType(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="voter-idcard">Voter IdCard</option>
                      <option value="pan-card">Pan Card</option>
                      <option value="driving-license">Driving License</option>
                      required

                    </select>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label>ID Card Number:</label>
                    <input
                      className="form-control"
                      name="idCardNumber"
                      type="number"
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
                      name="gender"
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
                    <label  htmlFor="age">Age:</label>
                    <input
                    readOnly
                      type="number"
                      name="age"
                      id="age"
                      className="form-control"
                      value={age}
                      // onChange={(e) => setAge(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="nationality">Nationality:</label>
                    <input
                      type="text"
                      name="nationality"
                      id="nationality"
                      className="form-control"
                      value="Indian"
                      required
                      readOnly

                      onChange={(e) => setNationality(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                      type="number"
                      id="contactNumber"
                      name="contactNumber"
                      className="form-control"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      required

                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label htmlFor="alternativeNumber">
                      Alternative Number:
                    </label>
                    <input
                      type="number"
                      name="alternativeNumber"
                      id="alternativeNumber"
                      className="form-control"
                      value={alternativeNumber}
                      onChange={(e) => setAlternativeNumber(e.target.value)}
                    />
                  </FormGroup>
                </Col>
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
                      name="marriageStatus"
                      className="form-control form-select"
                      value={marriageStatus}
                      onChange={(e) => setMarriageStatus(e.target.value)}
                      required

                    >
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widow">Widow</option>
                    </select>
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
                {/* <Col md="4">
                  <div className="">
                    <div className="image-box">
                      {selectedImage && (
                        <img src={selectedImage} alt="Preview" />
                      )}
                    </div>
                  </div>
                </Col> */}
                {/* <Col md="4">
                  <FormGroup>
                    <label for="idProof">Status of Aya:</label>
                    <select
                      id="status"
                      name="statusAya"
                      className="form-control form-select"
                      value={statusAya}
                      onChange={(e) => setStatusAya(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Running-Aya">Running Aya</option>
                      <option value="Close-Aya">Close Aya</option>
                      <option value="Hold-Aya">Hold Aya</option>
                    </select>
                  </FormGroup>
                </Col> */}
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

                {/* <Col md="4">
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
                <Col md="4">
                  <FormGroup>
                    <label for="ayaRemark">Aya Speciality:</label>
                    <select
                      id="ayaSpeciality"
                      className="form-control form-select"
                      value={ayaSpeciality}
                      name="ayaSpeciality"
                      onChange={(e) => setAyaSpeciality(e.target.value)}
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
                <Col md="4">
                  <FormGroup>
                    <label for="canspeak">aya Can Speak:</label>
                    <select
                      id="canspeak"
                      name="ayaCanSpeak"
                      className="form-control form-select"
                      value={ayaCanSpeak}
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
    </>
  );
}

export default adminLayout(AyaReg);
