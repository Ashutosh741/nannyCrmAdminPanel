import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../assets/css/profile.css";
import CustomerListContent from "../ListPages/CustomerListContent";
import LoadingOverlay from './LoadingOverlay'; // Adjust the path

function CustomerAssign() {
  const [tech, setTech] = useState([]);
  // const [list, setList] = useState([]);
  const [ayaList, setAyaList] = useState([]);
  const [AyaSelect, setAyaSelect] = useState(false);

  const [loading, setLoading] = useState(false);
  // const [assignData, setAssignData] = useState([]);
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

  // const [replaceAyaCode,setReplaceAyaCode] = useState('');
  // const [fromDate, setFromDate] = us


  // mera jo assignedAyaDetails wo reversed hai means, latest top pr hai, so i don't need to reverse it


  const { id } = useParams();

  const navigate = useNavigate();

  // abhi mujhe ismein , kya krna hai, ek condition check krna hai , jisse yeh pta chal jaye ki , 
  // jo Aya show ho rha hai , agr wo future mein assigned hai to check kro, ho paayega


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
      // let assignedAyaDetailsCopy = assignedAyaDetails;
      let assignedLen = assignedAyaDetails.length

      setPreviousAyaCode(assignedAyaDetails[assignedLen-1].assignedAyaCode);
    }
    setAssignedLength(assignedAyaDetails.length);

  } catch (error) {
    console.log(error);
  }
};


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
      
      // Create a shallow copy of assignedAyaDetails before reversing
      const reversedAssignedAyaDetails = techData.assignedAyaDetails;
      // console.log('so whats status of assigned Details in reverse order',reversedAssignedAyaDetails)
      setTech(techData);
      setAssignedAyaDetails(reversedAssignedAyaDetails);
      
      if (reversedAssignedAyaDetails.length > 0) {
        // console.log('yh banda jakar kr kya rhaa',reversedAssignedAyaDetails[0])
        let assignedLen = reversedAssignedAyaDetails.length

        // console.log('bhai date ka result kya a rha',checkDateDifference(reversedAssignedAyaDetails[0]))
        if (checkDateDifference(reversedAssignedAyaDetails[assignedLen-1])) {
          setIsAssigned(true);
          // console.log('aya is assigned to any Aya');
          let replaceDetails  = reversedAssignedAyaDetails[0].replaceAyaDetails;
          if(replaceDetails && replaceDetails.length > 0) {
            // let replaceDetailsCopy = [...replaceDetails].reverse();
            let replaceLen = replaceDetails.length;
            if(replaceDateDifference(replaceDetails[replaceLen-1])){
              setIsReplaced(true);
              // console.log('Aya is rpelaced by someone')
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
      
      // setAssignedAyaDetails(response.data.data.assignedAyaDetails)
      const  drillingData = response.data.data.assignedAyaDetails;
      if(drillingData.length > 0){
        // let drillingDataCopy = drillingData.slice();
        // let drillingDataCopy = [...drillingData].reverse();
        let drillLen = drillingData.length
        setPreviousAyaCode(drillingData[drillLen-1].assignedAyaCode)
      }
      // fetchFilteredAya()
      // console.log("what's techDAata",techData)
    } catch (error) {
      console.log(error);
    }
  };
  // change the condition of filtering data , according to the requirement


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
    //  so in this function, i'm showing the filtered Aya, which the admin have to choose for assign
    // where the conditioni is that it will not depend on from date and to date, it will depend on purpose and shift
    // also not intersection only union
    //  i think to do it like check in the interval, if someone is present will that purpose and shift
    //  that would be best filteration, no worries we'll do it later
    try{
      const response = await axios.get(`${URL}/ayareg`);
      let filteredData = response.data.data;

      filteredData = response.data.data.filter((Aya) => {
        if (Aya.assignedCustomerDetails.length <= 0) {
            return true;
        } else {  
            const reverseData = Aya.assignedCustomerDetails;
            let reverseLen = reverseData.length
    
            if (reverseData.length > 0 && compareDate(reverseData[reverseLen-1].assignedCustomerFromDate)) {
              if(replaceAyaToDate){
                console.log('last chekc for Aya filtering')
                if(compareDate(reverseData[reverseLen-1].assignedCustomerFromDate)){
                  console.log('successfull filtering')
                  return true;
                }
              }else{
                return false;
              }
                // if(diffDays(replaceAyaFromDate,replaceAyaToDate)){
                // return true
                // }
                // return true;
            } else if (reverseData[reverseLen-1].assignedCustomerToDate && !compareDate(reverseData[reverseLen-1].assignedCustomerToDate)) {
                return true;
            }
            return false; // If none of the conditions are met, filter out the item
        }
    });

      // console.log("filtered Aya data which are not assigned",filteredData)
    
      // filteredData = filteredData.filter((item) => {
      //   return item.workShift === assignedAyaShift || 
      //          item.ayaSpeciality === assignedAyaPurpose;
      // });
      
      console.log("filtered Aya data which align to the requirement",filteredData)

      const replaceData = filteredData.filter((item)=>(item.ayaCode !== previousAyaCode));
      setReplaceList(replaceData);
      // console.log("replace Aya list which are not assigned",filteredData)

      // console.log("replace list",replaceData);
      // console.log("required cusotmer",data);
      // if(data.length() > 0)data = "Aya not available , add more Aya"
      setAyaList(filteredData);
    } catch(error){
      console.log(error);
    }
  }

  
  const fetchassignData = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${assignedAyaCode}`);
      const techData = response.data.data;
  
      setAssignedAyaId(techData._id);
      setAssignedAyaName(techData.name);

    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(()=>{
    fetchCustomerData();
  },[])



  useEffect(()=>{
    replaceCustomerData();
    
    // console.log('dikkat yha pr thi',previousAyaCode)
    fetchFilteredAya();
  },[replaceAyaFromDate,replaceAyaToDate])
  const apiAyaid = () => {
      axios.get(`${URL}/ayareg/`).then((res) => {
        setAyaList(res.data.data);

        // console.log("AyaList", res.data.data);
      }).catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    // console.log("to date kis format mein hai",ReverseString(toDate));

    fetchCustomerData();
    // apiAyaid();
  }, [id, AyaSelect, toDate]);


    
  useEffect(() => {
    // console.log("to date kis format mein hai",ReverseString(toDate));

    // fetchaayaData();
    apiAyaid();
    // fetchFilteredAya();
    fetchPreviousCode();
  }, [assignedAyaShift, assignedAyaPurpose ]);
  

  const handleFormSubmitAya = async (e) => {
    e.preventDefault();
    // console.log("yeah bro running",assignedAyaId);
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
      await fetchassignData();
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
          assignedCustomerFromDate: assignedAyaFromDate,
          assignedCustomerToDate: assignedAyaToDate,
          assignedCustomerReason: assignedAyaReason,
          assignedCustomerRate: assignedAyaRate,
          assignedCustomerShift: assignedAyaShift,
          assignedCustomerPurpose: assignedAyaPurpose,
        });
        const data = response.data;
        console.log("it's show time ", data);
        await fetchassignData();
        navigate("/customerlist");

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
      try {
        const response = await axios.post(
          `${URL}/insertReplaceAyaDetails/${id}/${assignedLength - 1}`,
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
    setAssignedAyaRate("");
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
     
        // console.log("helo hello why this is not showing+",assignedAyaName)
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

      setTech(updatedTech);
      resetValue();
      // setShowAlert(true); 
      handleFormSubmitAya(e);
      alert("Data Submitted Successfully");
      navigate("/customerlist");

      
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (showAlert) {
  //     const timer = setTimeout(() => {
  //       setShowAlert(false); // Hide the success alert after 3 seconds
  //     }, 3000);
  
  //     return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  //   }
  // }, [showAlert]);


  const handleRowClick = () => {
    // console.log(`/Ayareg/${item._id}`);

    navigate(`/ayareg/${assignedAyaCode}`);
  };

  const handleRowClickToExpand = (index) => {
    if (index === expandedRowIndex) {
      setExpandedRowIndex(null); // Collapse the row if already expanded
    } else {
      setExpandedRowIndex(index); // Expand the clicked row
    }
  };

  useEffect(() => {
    fetchassignData();
  }, [assignedAyaCode]);


  useEffect(()=>{
    setCommission(assignedAyaRate-assignedCustomerRate)
  },[assignedCustomerRate])

  useEffect(()=>{
    setAssignedCustomerRate(assignedAyaRate - commission)
  },[commission])

  useEffect(()=>{
    setReplaceDays(dateDifference());
    // console.log("erplace from",replaceAyaFromDate);
    // console.log("erplace to",replaceAyaToDate);
    // fetchFilteredAya();

  },[replaceAyaFromDate,replaceAyaToDate])
  // useEffect(()=>{
  //   fetchFilteredAya();
  // },[])

  const fetchLoading = () => {
    setLoading(true);

    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md = '12' className="text-center mb-5">
              <h1>Manage Assigned Aya</h1>
          </Col>
          {/* {showAlert && (
  <div class="alert alert-success d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></svg>
    <div>
      Aya is assigned to Aya Successfully
    </div>
  </div>
          )} */}
          <Col md = '6' className="text-start mb-3">
            <button className="btn btn-primary">Remove Aya</button>
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
                      <button className="btn bg-primary text-white">Replace Customer</button>
    
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
      <section className="regList ">
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
                      <input type = "number" className="form-control" onChange={(e)=>setAssignedAyaRate(e.target.value)} value={assignedAyaRate} min='0' required></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1  mt-3">Commission</label>
                      <input type = "number" className="form-control" max = {assignedAyaRate} min='0' onChange={(e)=>setCommission(e.target.value)} value = {commission} required></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1  mt-3">Customer Rate</label>
                      <input type = "number" className="form-control" max = {assignedCustomerRate} min='0' onChange={(e)=>setAssignedCustomerRate(e.target.value)} value={assignedCustomerRate} required></input>
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

                      {/* <th className="">Assign</th> */}
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
                                        {/* <td  className="inner-table-cell">{item.replaceAyaToDate}</td> */}


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
                          ))}
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

