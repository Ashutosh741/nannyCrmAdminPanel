
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoadingOverlay from './LoadingOverlay'; // Adjust the path

import "../assets/css/profile.css";

function TestingList() {
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

  const [assignedCustomerRate, setAssignedCustomerRate] = useState("");
  const [commission,setCommission] = useState('0')
  const [toDate, setToDate] = useState('');
  const [updateReplacement,setUpdateReplacement] = useState('');
  const [replaceAyaCode,setReplaceAyaCode] = useState('');
  const [replaceAyaName,setReplaceAyaName] = useState('');
  const [replaceAyaId,setReplaceAyaId] = useState('')
  const [replaceAyaFromDate,setReplaceAyaFromDate] = useState('');
  const [replaceAyaToDate, setReplaceAyaToDate] = useState('');
  const [replaceDays,setReplaceDays] = useState('0');
  const [replaceList,setReplaceList] = useState([]);
  const [previousAyaCode, setPreviousAyaCode] = useState([]);
  const [assignedLength,setAssignedLength] = useState(0)
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isReplaced,setIsReplaced] = useState(false);
  const [isAssigned,setIsAssigned] = useState(false);
  const [isReplaceAyaSelectEnabled, setIsReplaceAyaSelectEnabled] = useState(false);



  const minDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format


  const { id } = useParams();

  const navigate = useNavigate();

  const compareDate = (billDate) => {
    const todayDate = new Date();
    // console.log('today date format',todayDate)
    const replaceDateParts = billDate.split('-');
    const compareDate = new Date(replaceDateParts[0], replaceDateParts[1] - 1, replaceDateParts[2],0,0,0);
    // console.log('billDate format',compareDate)

    return todayDate <= compareDate;
}

const replaceCustomerData = async () => {
  try {
    const response = await axios.get(`${URL}/customerreg/${id}`);
    const assignedAyaDetails = response.data.data.assignedAyaDetails;

    if (assignedAyaDetails.length > 0) {
      // let assignedAyaDetailsCopy = [...assignedAyaDetails].slice();
      let length = assignedAyaDetails.length;
      console.log('check 1', assignedAyaDetails)
      setPreviousAyaCode(assignedAyaDetails[length-1].assignedAyaCode);

    }
    setAssignedLength(assignedAyaDetails.length);


  } catch (error) {
  console.log(error);
  }
};

  // const apiTechid = () => {
  //   axios.get(`${URL}/Ayareg/${id}`).then((res) => setTech(res.data.data));
  //   console.log(tech);
  // };


const checkDateDifference = (data) => {
    const fromDate = new Date(data.assignedAyaFromDate);
    const toDate = new Date(data.assignedAyaToDate);
    const todayDate = new Date();

    if (todayDate >= fromDate && todayDate <= toDate) {
      // Today's date is between fromDate and toDate
      return true;
    } else if(toDate == "Invalid Date" && todayDate >= fromDate){
      return true;
    }else{
      return false;
    }
};

const replaceDateDifference = (data) => {
    const fromDate = new Date(data.replaceAyaFromDate);
    const toDate = new Date(data.replaceAyaToDate);
    const todayDate = new Date();

    if (todayDate >= fromDate && todayDate <= toDate) {
      // Today's date is between fromDate and toDate
      return true;
    } else if(toDate == "Invalid Date" && todayDate >= fromDate){
      return true;
    }else{
      return false;
    }

};

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${id}`);
      const techData = response.data.data;
      
      // Create a shallow copy of assignedCustomerDetails before reversing
      const reversedAssignedAyaDetails = techData.assignedAyaDetails;
      let length = reversedAssignedAyaDetails.length;
      console.log('so whats status of assigned Details',reversedAssignedAyaDetails)
      setTech(techData);
      setAssignedAyaDetails(reversedAssignedAyaDetails);
      
      if (length > 0) {
        // console.log('yh banda jakar kr kya rhaa',reversedAssignedCustomerDetails[0])

        // console.log('bhai date ka result kya a rha',checkDateDifference(reversedAssignedCustomerDetails[0]))
        if (checkDateDifference(reversedAssignedAyaDetails[length-1])) {
          setIsAssigned(true);
          // console.log('aya is assigned to any customer');
          let replaceDetails  = reversedAssignedAyaDetails[length-1].replaceAyaDetails;
          if(replaceDetails && replaceDetails.length > 0) {
            let length2 = replaceDetails.length
            // let replaceDetailsCopy = [...replaceDetails].reverse();
            // if(replaceDateDifference(replaceDetailsCopy[length-1])){
            if(replaceDateDifference(replaceDetails[length2-1])){

              setIsReplaced(true);
              // console.log('customer is rpelaced by someone')
            }
          }
          // setIsReplaced(false)
        }
        else{
          console.log('check your date difference')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPreviousCode = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${id}`);
      const techData = response.data.data;
      // setTech(techData);
      // setAssignid(techData.assign);
      // console.log("assigne custome code",techData.assign)
      
      // setAssignedCustomerDetails(response.data.data.assignedCustomerDetails)
      const  drillingData = response.data.data.assignedAyaDetails;
      if(drillingData.length > 0){
        // let drillingDataCopy = drillingData.slice();
        // let drillingDataCopy = [...drillingData].reverse();
        let length = drillingData.length;
        setPreviousAyaCode(drillingData[length-1].assignedAyaCode)
        // setPreviousAyaCode(drillingDataCopy[0].assignedAyaCode)

      }
      // fetchFilteredAya()
      // console.log("what's techDAata",techData)
    } catch (error) {
      console.log(error);
    }
  };



  const dateDifference = () => {
    if (replaceAyaToDate && replaceAyaFromDate) {
      const toDateParts = replaceAyaToDate.split('-');
      const fromDateParts = replaceAyaFromDate.split('-');
      const toDateObj = new Date(`${toDateParts[0]}-${toDateParts[1]}-${toDateParts[2]}`);
      const fromDateObj = new Date(`${fromDateParts[0]}-${fromDateParts[1]}-${fromDateParts[2]}`);
      // const leaveTakenDays = parseFloat(leaveTaken);
  
      if (!isNaN(toDateObj) && !isNaN(fromDateObj)) {
        const diff = Math.floor((toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 86400)) + 1;
        return diff;
      } else {
        // console.log('Invalid date or leaveTaken value.');
        return 0; // Or any other appropriate value to indicate an error.
      }
    } else {
      // console.log('Missing toDate, fromDate, or leaveTaken value.');
      return 0; // Or any other appropriate value to indicate an error.
    }
  };


  const fetchFilteredAya = async(e)=>{
    // e.preventDefault()
    try{
      const response = await axios.get(`${URL}/ayareg`);
      let filteredData = response.data.data;
        // console.log('bhai are you ok',filteredData)
    //   filteredData = filteredData.filter((Aya) => {
    //     // console.log('abhi thik krke deta hoon',Aya.assignedCustomerDetails)
    //     if (Aya.assignedCustomerDetails && Aya.assignedCustomerDetails.length <= 0) {
    //         return true;
    //     } else if(Aya.assignedCustomerDetails && Aya.assignedCustomerDetails.length > 0){  
    //         // const reverseData = [...Aya.assignedCustomerDetails].reverse();
    //         //  reverseData = reverseData.reverse();
    //         const reverseData = Aya.assignedCustomerDetails;
    //         const length = Aya.assignedCustomerDetails.length;
    
    //         if (length > 0 && compareDate(reverseData[length-1].assignedCustomerFromDate)) {
    //           if(replaceAyaToDate){
    //             console.log('last chekc for Aya filtering')
    //             if(compareDate(reverseData[length-1].assignedCustomerFromDate)){
    //               console.log('successfull filtering')
    //               return true;
    //             }
    //           }else{
    //             return false;
    //           } 
    //         } else if (length > 0 && reverseData[length-1].assignedCustomerToDate && !compareDate(reverseData[length-1].assignedCustomerToDate)) {
    //             return true;
    //         }
    //         return false; // If none of the conditions are met, filter out the item
    //     }
    // });

    //     filteredData = response.data.data.filter((item) => ( item.ayaSpeciality === assignedAyaPurpose || (
    //       item.workShift === assignedAyaShift)))
      // }

      const replaceData = filteredData.filter((item)=>(item.ayaCode !== previousAyaCode));
      setReplaceList(replaceData);



      setAyaList(filteredData);
    } catch(error){
      console.log(error);
    }
  }


  const fetchAssignedAyaData = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${assignedAyaCode}`);
      const techData = response.data.data;
      // console.log("what's techDAata",techData)
      setAssignedAyaId(techData._id);
      // console.log("dekho kya hota hai",techData._id)
      setAssignedAyaName(techData.name);
      // console.log("assign data", assignData);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    fetchCustomerData();
  },[])


  useEffect(()=>{
    replaceCustomerData();
    
    // console.log('dikkat yha pr thi',previousCustomerCode)
    fetchFilteredAya();
  },[replaceAyaFromDate,replaceAyaToDate])


  const apiAya = () => {
    axios.get(`${URL}/ayareg/`).then((res) => setAyaList(res.data.data));
    // console.log("aya list",ayaList);
  };


  useEffect(() => {
    fetchCustomerData();
    // apiAya();
    // fetchAssignedAyaData();
  }, [id,ayaSelect,toDate]);

  useEffect(() => {
    // console.log("to date kis format mein hai",ReverseString(toDate));

    // fetchaayaData();
    apiAya();
    fetchPreviousCode();

  }, [assignedAyaShift, assignedAyaPurpose ]);

  // console.log("id", id);

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

  const handleReplaceAya = async (e) => {
    // e.preventDefault();

    console.log("yeah bro running",replaceAyaId);
    try {
      const response = await axios.put(`${URL}/ayareg/${replaceAyaId}`, {
        assignedCustomerCode: tech.customerCode,
        assignedCustomerName: tech.name,
        assignedCustomerFromDate: replaceAyaFromDate,
        assignedCustomerToDate: replaceAyaToDate,
        assignedCustomerReason: assignedAyaReason,
        assignedCustomerRate: assignedAyaRate,
        assignedCustomerShift: assignedAyaShift,
        assignedCustomerPurpose: assignedAyaPurpose,
      });
      const data = response.data;
      console.log("it's show time ", data);
      // await fetchAssignedAyaData();
      // navigate("/customerlist");

    } catch (err) {
      console.log(err);
    }
  };

  const dynamicData = {
    replaceAyaCode: replaceAyaCode,
    replaceAyaName: replaceAyaName,

    replaceAyaFromDate: replaceAyaFromDate,
    replaceAyaToDate: replaceAyaToDate
  };
  
  // const id = '64b5927940e567cce223499b';
  // const assignedLength = 4;

  const pushData =(e)=>{
    e.preventDefault()
    handleInsertReplacement(dynamicData)
    .then((data) => {
      console.log('Response:', data);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
  
  }

  
  useEffect(()=>{
    console.log('selected id fetched',replaceAyaId)
    console.log('From date fetched',replaceAyaFromDate)
    console.log('to date fetched',replaceAyaToDate)

  },[replaceAyaId,replaceAyaFromDate,replaceAyaToDate])


  async function handleInsertReplacement(replaceAyaDetails) {
    // e.preventDefault();
    // if(assignedLength <= 0)assignedLength = 1;
  try {
    const response = await axios.post(
      `${URL}/insertReplaceAyaDetails/${id}/${assignedLength-1}`,
      {
        replaceAyaDetails: [replaceAyaDetails]
      }
    );

    const data = response.data;
    alert('replacement successfully')
    fetchCustomerData();
    handleReplaceAya();
    resetValue()
    // navigate("/ayalist");

    return data;
  } catch (error) {
    console.log('Error:', error.message);
    throw error;
  }
}

const resetValue = ()=>{
  setAssignedAyaFromDate("");
  setAssignedAyaToDate("");
  setAssignedAyaReason("select");
  setAssignedCustomerRate("");
  setAssignedAyaShift("select");
  setAssignedAyaPurpose("select");
  setAssignedAyaCode("");
  setAyaSelect(false);
  setAyaList([]);
  setCommission('');
  setAssignedAyaRate('');
  setReplaceAyaCode('');
  setReplaceAyaFromDate('')
  setReplaceAyaToDate('')
  setReplaceAyaName('')

}



const handleFormSubmit = async (e) => {
  e.preventDefault();
   
      // console.log("helo hello why this is not showing+",assignedCustomerName)
  try {
    const response = await axios.put(`${URL}/customerreg/${id}`, {
      assignedAyaCode: assignedAyaCode,
      assignedAyaName: assignedAyaName,
      assignedAyaFromDate: assignedAyaFromDate,
      assignedAyaToDate: assignedAyaToDate,
      assignedAyaReason: assignedAyaReason,
      assignedAyaRate: assignedCustomerRate,
      assignedAyaShift: assignedAyaShift,
      assignedAyaPurpose: assignedAyaPurpose,
    });
    const data = response.data;
    console.log(data);

    

    const newAssignedAyaDetails = {
      assignedAyaCode: assignedAyaCode,
      assignedAyaName: assignedAyaName,
      assignedAyaFromDate: assignedAyaFromDate,
      assignedAyaToDate: assignedAyaToDate,
      assignedAyaReason: assignedAyaReason,
      assignedAyaRate: assignedCustomerRate,
      assignedAyaShift: assignedAyaShift,
      assignedAyaPurpose: assignedAyaPurpose,
    };

    const updatedTech = {
      ...tech,
      assignedAyaDetails: [
        ...tech.assignedAyaDetails,
        newAssignedAyaDetails,
      ],
    };


    // const updatedTech = {
    //   ...tech,
    //   assignedCustomerDetails: [
    //     ...tech.assignedCustomerDetails,
    //     newAssignedCustomerDetails,
    //   ],
    // };


    setTech(updatedTech);
    resetValue();
    // setShowAlert(true); 
    handleFormSubmitAya(e);
    alert("Data Submitted Successfully");
    // navigate("/customerlist");

    
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

    navigate(`/customerreg/${assignedAyaCode}`);
  };

  const handleRowClickToExpand = (index) => {
    if (index === expandedRowIndex) {
      setExpandedRowIndex(null); // Collapse the row if already expanded
    } else {
      setExpandedRowIndex(index); // Expand the clicked row
    }
  };

  useEffect(() => {
    fetchAssignedAyaData();
  }, [assignedAyaCode]);


  useEffect(()=>{
    setCommission(assignedCustomerRate-assignedAyaRate)
  },[assignedAyaRate])

  useEffect(()=>{
    setAssignedAyaRate(assignedCustomerRate - commission)
  },[commission])


  useEffect(()=>{
    setReplaceDays(dateDifference());
    // console.log("erplace from",replaceCustomerFromDate);
    // console.log("erplace to",replaceCustomerToDate);
    // fetchFilteredCustomer();

  },[replaceAyaFromDate,replaceAyaToDate])


  const fetchLoading = () => {
    setLoading(true);

    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleRemoveAya = ()=>{
    setIsAssigned(false);
    setIsReplaced(false)
  }


  return (
    <>
      <Container>
        <Row>
          <Col md = '12' className="text-center mb-5">
              <h1>Manage Assigned Aya</h1>
          </Col>
          <Col md = '6' className="text-start mb-3">
            <button className="btn btn-primary" onClick={handleRemoveAya}>Remove Aya</button>
          </Col>
          {
            (isReplaced && isAssigned) ? (
              <>
            <Col md = '3'>
                <label className="mb-1">Update Replacement</label>
                <select className="form-select" onChange={(e)=>setUpdateReplacement(e.target.value)} value={updateReplacement} required>
                  <option value = "select">Select</option>
                  <option value = "removeReplacement">Remove Replacement</option>
                  <option value = "extendReplacement">Extend Replacement</option>
                  <option value = "changeReplacement">Change Replacement</option>
                  {/* <option value = "replace">Extend Replacement</option> */}

                </select>
            </Col>
            <Col md = '3' className="mt-4">
            {/* <button className="btn bg-primary text-white" onClick = {(e)=>{handleUpdateReplacement}}>Update Changes</button> */}
            <button className="btn bg-primary text-white" >Update Changes</button>

            </Col>
            </>
            ) : (
              <>
              {
                ( !isReplaced && isAssigned) ? (
                  <>
                  <Form onSubmit={(e)=>{pushData(e);}}>
                    <Row>
    
                    <Col md="2">
                      <label className="mb-1">From Date</label>
                      <input
                        type="date"
                        min={minDate}
                        className="form-control"
                        onChange={(e) => {
                          setReplaceAyaFromDate(e.target.value);
                          setIsReplaceAyaSelectEnabled(!!e.target.value && !!replaceAyaToDate);
                        }}
                        value={replaceAyaFromDate}
                        required
                      />
                    </Col>
                    <Col md="2">
                      <label className="mb-1">To Date</label>
                      <input
                        type="date"
                        min={replaceAyaFromDate}
                        className="form-control"
                        onChange={(e) => {
                          setReplaceAyaToDate(e.target.value);
                          setIsReplaceAyaSelectEnabled(!!replaceAyaFromDate && !!e.target.value);
                        }}
                        value={replaceAyaToDate}
                        required
                      />
                    </Col>

                      <Col md = "2">  
                        <label className="mb-1" >Total days</label>
                        <input type = "number" className="form-control"  value = {replaceDays} readOnly></input>
                      </Col>
                      <Col md="3">
                        <label className="mb-1">List of Available Aya</label>
                        <select
                          className="form-control form-select"
                          value={replaceAyaCode}
                          name="assign"
                          onChange={(e) => {
                            const selectedAyaCode = e.target.value;
                            const selectedAyaName = e.target.options[e.target.selectedIndex].text.split(' ')[1];
                            const selectedAyaId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
                            setReplaceAyaCode(selectedAyaCode);
                            setReplaceAyaName(selectedAyaName);
                            setReplaceAyaId(selectedAyaId);
                          }}
                          required
                          disabled={!isReplaceAyaSelectEnabled}
                        >
                          {!replaceList ? (
                            <option value="">Loading...</option>
                          ) : (
                            <>
                              <option value="">Select</option>
                              {replaceList.map((item) => (
                                <option key={item._id} value={item.ayaCode} data-id={item._id}>
                                  {item.ayaCode} {item.name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </Col>

                      <Col md = '3' className="mt-4">
                      {/* <button className="btn bg-primary text-white" onClick = {(e)=>{handleUpdateReplacement}}>Update Changes</button> */}
                      <button className="btn bg-primary text-white">Replace Aya</button>
    
                      </Col>
                    </Row>
                  </Form>
                  </>
                ) : null
            }
              </>
            )
          }
          <Col md = '6'>
            
          </Col>

        </Row>
      </Container>
      <section className="regList mt-3">
        <Container>
          <Row className="align-items-center">
          {
            (!isReplaced && !isAssigned) ? (
              <>
              <Col md="12" className="mt-4">
              <div className="">
                <Form onSubmit={(e)=>{handleFormSubmit(e) }}>
                  <Row>

                    <Col md = "2">
                      <label className="mb-1">From Date</label>
                      <input type = "date" min={minDate} className="form-control" onChange={(e)=>setAssignedAyaFromDate(e.target.value)} value = {assignedAyaFromDate} required></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1" >To Date</label>
                      <input type = "date"  min={assignedAyaFromDate} className="form-control"  onChange={(e)=>setAssignedAyaToDate(e.target.value)} value={assignedAyaToDate}></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">Shift</label>
                      <select className="form-select" onChange={(e)=>setAssignedAyaShift(e.target.value)} value={assignedAyaShift} required>
                      <option value="">Select</option>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                    <option value="day-night">Day Night</option>
                  </select>
                   </Col>
                    <Col md = "2">
                      <label className="mb-1">Purpose</label>
                      <select className="form-select" onChange={(e)=>setAssignedAyaPurpose(e.target.value)} value={assignedAyaPurpose} required>
                      <option value="">Select</option>
                      <option value="Cooking">Cooking</option>
                      <option value="Cooking-and-housekeeping">Cooking and housekeeping</option>
                      <option value="Housekeeping">Housekeeping</option>
                      <option value="New-born-baby">New born baby</option>
                      <option value="Old-man">Old man</option>
                      <option value="Old-woman">Old woman</option>
                      <option value="Take-care-baby">Take care baby</option>
                    </select>
                    </Col>
                    <Col md="2 text-center">
                      <div className="mt-4">
                      <button
                        className="btn bg-primary text-white"
                        onClick={()=>{
                          fetchLoading();
                          fetchFilteredAya();
                        }
                        }
                      >
                        Search Aya
                      </button>

                      {loading && <LoadingOverlay />} {/* Show loading overlay when loading is true */}

                      </div>
                    </Col>
                    {/* <Col md='4'>

                    </Col> */}
                    <Col md="3 mt-3">
                      <label className="mb-1">List of Available Aya</label>
                      <select
                        className="form-control form-select"
                        value={assignedAyaCode}
                        // setReplaceAyaName = {item.name}
                        name="assign"
                        onChange={(e) => setAssignedAyaCode(e.target.value)}
                        onClick={() => setAyaSelect(true)}
                        required
                      >
                          <>
                            <option value="">Select</option>
                            {ayaList.map((item) => (
                              <option key={item._id} value={item.ayaCode}>
                                {item.ayaCode} {item.name}
                              </option>
                            ))}
                          </>
                      </select>

                    </Col>
                    <Col md = "2">
                      <label className="mb-1 mt-3">Customer Rate</label>
                      <input type = "number" className="form-control" onChange={(e)=>setAssignedCustomerRate(e.target.value)} value={assignedCustomerRate} min='0' required></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1  mt-3">Commission</label>
                      <input type = "number" className="form-control" max = {assignedCustomerRate} min='0' onChange={(e)=>setCommission(e.target.value)} value = {commission} required></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1  mt-3">Aya Rate</label>
                      <input type = "number" className="form-control" max = {assignedCustomerRate} min='0' onChange={(e)=>setAssignedAyaRate(e.target.value)} value={assignedAyaRate} required></input>
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
              </>
            ) : null
          }
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
                      <th>Rate</th>
                      <th className="">Shift</th>
                      <th className="">Purpose</th>
                      <th>Replacements</th>

                    </tr>
                  </thead>

                  {loading ? (
                    <div className="text-center d-flex justify-content-center p-3">
                      Loading...
                    </div>
                  ) : (
                    <tbody>
                    {assignedAyaDetails.map((item, index) => (
                      <React.Fragment key={index}>
                              <tr onClick={() => handleRowClickToExpand(index)}
                                className={expandedRowIndex === index ? 'expanded-row' : ''}
                              >
                                <td>{tech.customerCode}</td>
                        <td>{tech.name}</td>
                        <td>{item.assignedAyaCode}</td>
                        <td>{item.assignedAyaName}</td>
                        <td>{item.assignedAyaFromDate}</td>
                        <td>{item.assignedAyaToDate}</td>
                        <td>{item.assignedAyaRate}</td>
                        <td>{item.assignedAyaShift}</td>
                        <td>{item.assignedAyaPurpose}</td>
                        <td>{item.replaceAyaDetails.length > 0 ? item.replaceAyaDetails.length : 0 }</td>
                        </tr>
                        {expandedRowIndex === index && (
                            <>
                            <tr className="text-uppercase inner-table-cell " >

                              <th  className="inner-table-cell">Sr.no</th>
                              <th  className="inner-table-cell">Aya Code</th>
                              <th  className="inner-table-cell">Aya Name</th>
                            
                              <th  className="inner-table-cell">From Date</th>
                              <th  className="inner-table-cell">To Date</th>


                              {/* <th  className="inner-table-cell">Generate Bill</th> */}
                              

                            </tr>
                            {assignedAyaDetails && assignedAyaDetails[expandedRowIndex].replaceAyaDetails ? (
                            assignedAyaDetails[expandedRowIndex].replaceAyaDetails.map((item, index) => (
                              <React.Fragment key={index}>
                                <tr colSpan={12} className={`fade-in ${expandedRowIndex === index ? 'expanded-row' : ''}`}>

                                  <td  className="inner-table-cell">{index + 1}</td>
                                  <td className="inner-table-cell">{item.replaceAyaCode}</td>
                                  <td className="inner-table-cell">{item.replaceAyaName}</td>
                                  <td  className="inner-table-cell">{item.replaceAyaFromDate}</td>
                                  <td  className="inner-table-cell">{item.replaceAyaToDate}</td>
                                  {/* <td  className="inner-table-cell">{item.replaceCustomerToDate}</td> */}


                                </tr>
                              </React.Fragment>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4}>No data available</td>
                            </tr>
                            )}
                            </>
                        )}
                      </React.Fragment>
                    )).reverse()}
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

export default adminLayout(TestingList);
