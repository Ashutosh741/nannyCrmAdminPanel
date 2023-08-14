import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, FormGroup } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../assets/css/profile.css";
import AyaListContent from "../ListPages/AyaListContent";
import LoadingOverlay from './LoadingOverlay'; // Adjust the path

function AyaAssign() {
  const [tech, setTech] = useState([]);
  // const [list, setList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [customerSelect, setCustomerSelect] = useState(false);

  const [loading, setLoading] = useState(false);
  // const [assignData, setAssignData] = useState([]);
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

  
  const [assignedAyaRate, setAssignedAyaRate] = useState("");
  const [commission,setCommission] = useState('0')
  const [toDate, setToDate] = useState('');
  const [updateReplacement,setUpdateReplacement] = useState('');
  const [replaceCustomerCode,setReplaceCustomerCode] = useState('');
  const [replaceCustomerName,setReplaceCustomerName] = useState('');
  const [replaceCustomerId,setReplaceCustomerId] = useState('')
  const [replaceCustomerFromDate,setReplaceCustomerFromDate] = useState('');
  const [replaceCustomerToDate, setReplaceCustomerToDate] = useState('');
  const [replaceDays,setReplaceDays] = useState('0');
  const [replaceList,setReplaceList] = useState([]);
  const [previousCustomerCode, setPreviousCustomerCode] = useState([]);
  const [assignedLength,setAssignedLength] = useState(0)
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isReplaced,setIsReplaced] = useState(false);
  const [isAssigned,setIsAssigned] = useState(false);
  const [isReplaceCustomerSelectEnabled, setIsReplaceCustomerSelectEnabled] = useState(false);



  const minDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  // const [replaceAyaCode,setReplaceAyaCode] = useState('');
  // const [fromDate, setFromDate] = us


  // mera jo assignedCustomerDetails wo reversed hai means, latest top pr hai, so i don't need to reverse it


  const { id } = useParams();

  const navigate = useNavigate();

  function ReverseString(str) {
    return str.split('-').reverse().join('-');
  }


  // abhi mujhe ismein , kya krna hai, ek condition check krna hai , jisse yeh pta chal jaye ki , 
  // jo customer show ho rha hai , agr wo future mein assigned hai to check kro, ho paayega


  const compareDate = (billDate) => {
    const todayDate = new Date();
    // console.log('today date format',todayDate)
    const replaceDateParts = billDate.split('-');
    const compareDate = new Date(replaceDateParts[0], replaceDateParts[1] - 1, replaceDateParts[2],0,0,0);
    // console.log('billDate format',compareDate)

    return todayDate <= compareDate;
}

const replaceayaData = async () => {
  try {
    const response = await axios.get(`${URL}/ayareg/${id}`);
    const assignedCustomerDetails = response.data.data.assignedCustomerDetails;

    if (assignedCustomerDetails.length > 0) {
      // let assignedCustomerDetailsCopy = [...assignedCustomerDetails].slice();
      let assignedCustomerDetailsCopy = [...assignedCustomerDetails].reverse();

      setPreviousCustomerCode(assignedCustomerDetailsCopy[0].assignedCustomerCode);
    }
    setAssignedLength(assignedCustomerDetails.length);

  } catch (error) {
    console.log(error);
  }
};


  const checkDateDifference = (data) => {
      const fromDate = new Date(data.assignedCustomerFromDate);
      const toDate = new Date(data.assignedCustomerToDate);
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
      const fromDate = new Date(data.replaceCustomerFromDate);
      const toDate = new Date(data.replaceCustomerToDate);
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

  const fetchaayaData = async () => {
    try {
      const response = await axios.get(`${URL}/ayareg/${id}`);
      const techData = response.data.data;
      
      // Create a shallow copy of assignedCustomerDetails before reversing
      const reversedAssignedCustomerDetails = [...techData.assignedCustomerDetails].reverse();
      // console.log('so whats status of assigned Details in reverse order',reversedAssignedCustomerDetails)
      setTech(techData);
      setAssignedCustomerDetails(reversedAssignedCustomerDetails);
      
      if (reversedAssignedCustomerDetails.length > 0) {
        // console.log('yh banda jakar kr kya rhaa',reversedAssignedCustomerDetails[0])

        // console.log('bhai date ka result kya a rha',checkDateDifference(reversedAssignedCustomerDetails[0]))
        if (checkDateDifference(reversedAssignedCustomerDetails[0])) {
          setIsAssigned(true);
          // console.log('aya is assigned to any customer');
          let replaceDetails  = reversedAssignedCustomerDetails[0].replaceCustomerDetails;
          if(replaceDetails && replaceDetails.length > 0) {
            let replaceDetailsCopy = [...replaceDetails].reverse();
            if(replaceDateDifference(replaceDetailsCopy[0])){
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
      const response = await axios.get(`${URL}/ayareg/${id}`);
      const techData = response.data.data;
      // setTech(techData);
      // setAssignid(techData.assign);
      // console.log("assigne custome code",techData.assign)
      
      // setAssignedCustomerDetails(response.data.data.assignedCustomerDetails)
      const  drillingData = response.data.data.assignedCustomerDetails;
      if(drillingData.length > 0){
        // let drillingDataCopy = drillingData.slice();
        let drillingDataCopy = [...drillingData].reverse();
        setPreviousCustomerCode(drillingDataCopy[0].assignedCustomerCode)
      }
      // fetchFilteredAya()
      // console.log("what's techDAata",techData)
    } catch (error) {
      console.log(error);
    }
  };
  // change the condition of filtering data , according to the requirement


  const dateDifference = () => {
    if (replaceCustomerToDate && replaceCustomerFromDate) {
      const toDateParts = replaceCustomerToDate.split('-');
      const fromDateParts = replaceCustomerFromDate.split('-');
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


  const fetchFilteredCustomer = async(e)=>{
    //  so in this function, i'm showing the filtered customer, which the admin have to choose for assign
    // where the conditioni is that it will not depend on from date and to date, it will depend on purpose and shift
    // also not intersection only union
    //  i think to do it like check in the interval, if someone is present will that purpose and shift
    //  that would be best filteration, no worries we'll do it later
    try{
      const response = await axios.get(`${URL}/customerreg`);
      let filteredData = response.data.data;

      filteredData = response.data.data.filter((customer) => {
        if (customer.assignedAyaDetails.length <= 0) {
            return true;
        } else {  
            const reverseData = customer.assignedAyaDetails.reverse();
    
            if (reverseData.length > 0 && compareDate(reverseData[0].assignedAyaFromDate)) {
              if(replaceCustomerToDate){
                console.log('last chekc for customer filtering')
                if(compareDate(reverseData[0].assignedAyaFromDate)){
                  console.log('successfull filtering')
                  return true;
                }
              }else{
                return false;
              }
                // if(diffDays(replaceCustomerFromDate,replaceCustomerToDate)){
                // return true
                // }
                // return true;
            } else if (reverseData[0].assignedAyaToDate && !compareDate(reverseData[0].assignedAyaToDate)) {
                return true;
            }
            return false; // If none of the conditions are met, filter out the item
        }
    });

      // console.log("filtered Customer data which are not assigned",filteredData)
    
      filteredData = filteredData.filter((item) => {
        return item.attendService === assignedCustomerShift || 
               item.requirementpurpose === assignedCustomerPurpose;
      });
      
      // console.log("filtered Customer data which align to the requirement",filteredData)

      // let replaceData = response.data.data;
      // console.log('my replace data',replaceData);
      const replaceData = filteredData.filter((item)=>(item.customerCode !== previousCustomerCode));
      setReplaceList(replaceData);
      // console.log("replace Customer list which are not assigned",filteredData)

      // console.log("replace list",replaceData);
      // console.log("required cusotmer",data);
      // if(data.length() > 0)data = "customer not available , add more Customer"
      setCustomerList(filteredData);
    } catch(error){
      console.log(error);
    }
  }

  
  const fetchassignData = async () => {
    try {
      const response = await axios.get(`${URL}/customerreg/${assignedCustomerCode}`);
      const techData = response.data.data;
  
      setAssignedCustomerId(techData._id);
      setAssignedCustomerName(techData.name);

    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(()=>{
    fetchaayaData();
  },[])



  useEffect(()=>{
    replaceayaData();
    
    // console.log('dikkat yha pr thi',previousCustomerCode)
    fetchFilteredCustomer();
  },[replaceCustomerFromDate,replaceCustomerToDate])
  const apiCustomerid = () => {
      axios.get(`${URL}/customerreg/`).then((res) => {
        setCustomerList(res.data.data);

        // console.log("customerList", res.data.data);
      }).catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    // console.log("to date kis format mein hai",ReverseString(toDate));

    fetchaayaData();
    // apiCustomerid();
  }, [id, customerSelect, toDate]);


    
  useEffect(() => {
    // console.log("to date kis format mein hai",ReverseString(toDate));

    // fetchaayaData();
    apiCustomerid();
    // fetchFilteredCustomer();
    fetchPreviousCode();
  }, [assignedCustomerShift, assignedCustomerPurpose ]);
  

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


    const handleReplaceCustomer = async (e) => {
      // e.preventDefault();

      console.log("yeah bro running",replaceCustomerId);
      try {
        const response = await axios.put(`${URL}/customerreg/${replaceCustomerId}`, {
          assignedAyaCode: tech.ayaCode,
          assignedAyaName: tech.name,
          assignedAyaFromDate: replaceCustomerFromDate,
          assignedAyaToDate: replaceCustomerToDate,
          assignedAyaReason: assignedCustomerReason,
          assignedAyaRate: assignedCustomerRate,
          assignedAyaShift: assignedCustomerShift,
          assignedAyaPurpose: assignedCustomerPurpose,
        });
        const data = response.data;
        console.log("it's show time ", data);
        await fetchassignData();
        navigate("/ayalist");

      } catch (err) {
        console.log(err);
      }
    };


    const dynamicData = {
      replaceCustomerCode: replaceCustomerCode,
      replaceCustomerName: replaceCustomerName,

      replaceCustomerFromDate: replaceCustomerFromDate,
      replaceCustomerToDate: replaceCustomerToDate
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
      console.log('selected id fetched',replaceCustomerId)
      console.log('From date fetched',replaceCustomerFromDate)
      console.log('to date fetched',replaceCustomerToDate)

    },[replaceCustomerId,replaceCustomerFromDate,replaceCustomerToDate])

    async function handleInsertReplacement(replaceCustomerDetails) {
        // e.preventDefault();
      try {
        const response = await axios.post(
          `${URL}/insertReplaceCustomerDetails/${id}/${assignedLength - 1}`,
          {
            replaceCustomerDetails: [replaceCustomerDetails]
          }
        );
    
        const data = response.data;
        alert('replacement successfully')
        fetchaayaData();
        handleReplaceCustomer();
        resetValue()
        // navigate("/ayalist");

        return data;
      } catch (error) {
        console.log('Error:', error.message);
        throw error;
      }
    }
      

  const resetValue = ()=>{
    setAssignedCustomerFromDate("");
    setAssignedCustomerToDate("");
    setAssignedCustomerReason("select");
    setAssignedCustomerRate("");
    setAssignedCustomerShift("select");
    setAssignedCustomerPurpose("select");
    setAssignedCustomerCode("");
    setCustomerSelect(false);
    setCustomerList([]);
    setCommission('');
    setAssignedCustomerRate('');
    setReplaceCustomerCode('');
    setReplaceCustomerFromDate('')
    setReplaceCustomerToDate('')
    setReplaceCustomerName('')

  }
  





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
        assignedCustomerRate: assignedAyaRate,
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
        assignedCustomerRate: assignedAyaRate,
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
      resetValue();
      // setShowAlert(true); 
      handleFormSubmitCustomer(e);
      alert("Data Submitted Successfully");
      navigate("/ayalist");

      
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
    // console.log(`/customerreg/${item._id}`);

    navigate(`/customerreg/${assignedCustomerCode}`);
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
  }, [assignedCustomerCode]);




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
    // fetchFilteredAya();

  },[replaceCustomerFromDate,replaceCustomerToDate])
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
              <h1>Manage Assigned Customer</h1>
          </Col>
          {/* {showAlert && (
  <div class="alert alert-success d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></svg>
    <div>
      Customer is assigned to Aya Successfully
    </div>
  </div>
          )} */}
          <Col md = '6' className="text-start mb-3">
            <button className="btn btn-primary">Remove Customer</button>
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
                          setReplaceCustomerFromDate(e.target.value);
                          setIsReplaceCustomerSelectEnabled(!!e.target.value && !!replaceCustomerToDate);
                        }}
                        value={replaceCustomerFromDate}
                        required
                      />
                    </Col>
                    <Col md="2">
                      <label className="mb-1">To Date</label>
                      <input
                        type="date"
                        min={replaceCustomerFromDate}
                        className="form-control"
                        onChange={(e) => {
                          setReplaceCustomerToDate(e.target.value);
                          setIsReplaceCustomerSelectEnabled(!!replaceCustomerFromDate && !!e.target.value);
                        }}
                        value={replaceCustomerToDate}
                        required
                      />
                    </Col>

                      <Col md = "2">  
                        <label className="mb-1" >Total days</label>
                        <input type = "number" className="form-control"  value = {replaceDays} readOnly></input>
                      </Col>
                      <Col md="3">
                        <label className="mb-1">List of Available Customer</label>
                        <select
                          className="form-control form-select"
                          value={replaceCustomerCode}
                          name="assign"
                          onChange={(e) => {
                            const selectedCustomerCode = e.target.value;
                            const selectedCustomerName = e.target.options[e.target.selectedIndex].text.split(' ')[1];
                            const selectedCustomerId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
                            setReplaceCustomerCode(selectedCustomerCode);
                            setReplaceCustomerName(selectedCustomerName);
                            setReplaceCustomerId(selectedCustomerId);
                          }}
                          required
                          disabled={!isReplaceCustomerSelectEnabled}
                        >
                          {!replaceList ? (
                            <option value="">Loading...</option>
                          ) : (
                            <>
                              <option value="">Select</option>
                              {replaceList.map((item) => (
                                <option key={item._id} value={item.customerCode} data-id={item._id}>
                                  {item.customerCode} {item.name}
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
                      <input type = "date" min={minDate} className="form-control" onChange={(e)=>setAssignedCustomerFromDate(e.target.value)} value = {assignedCustomerFromDate} required></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1" >To Date</label>
                      <input type = "date"  min={assignedCustomerFromDate} className="form-control"  onChange={(e)=>setAssignedCustomerToDate(e.target.value)} value={assignedCustomerToDate}></input>
                    </Col>
                    <Col md = "2">
                      <label className="mb-1">Shift</label>
                      <select className="form-select" onChange={(e)=>setAssignedCustomerShift(e.target.value)} value={assignedCustomerShift} required>
                      <option value="">Select</option>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                    <option value="day-night">Day Night</option>
                  </select>
                   </Col>
                    <Col md = "2">
                      <label className="mb-1">Purpose</label>
                      <select className="form-select" onChange={(e)=>setAssignedCustomerPurpose(e.target.value)} value={assignedCustomerPurpose} required>
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
                          fetchFilteredCustomer();
                        }
                        }
                      >
                        Search Customer
                      </button>

                      {loading && <LoadingOverlay />} {/* Show loading overlay when loading is true */}

                      </div>
                    </Col>
                    {/* <Col md='4'>

                    </Col> */}
                    <Col md="3 mt-3">
                      <label className="mb-1">List of Available Customer</label>
                      <select
                        className="form-control form-select"
                        value={assignedCustomerCode}
                        // setReplaceCustomerName = {item.name}
                        name="assign"
                        onChange={(e) => setAssignedCustomerCode(e.target.value)}
                        onClick={() => setCustomerSelect(true)}
                        required
                      >
                          <>
                            <option value="">Select</option>
                            {customerList.map((item) => (
                              <option key={item._id} value={item.customerCode}>
                                {item.customerCode} {item.name}
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
                      <input type = "number" className="form-control" max = {assignedAyaRate} min='0' onChange={(e)=>setAssignedAyaRate(e.target.value)} value={assignedAyaRate} required></input>
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
              </>
            ) : null
          }

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
                          {assignedCustomerDetails.map((item, index) => (
                            <React.Fragment key={index}>
                                    <tr onClick={() => handleRowClickToExpand(index)}
                                      className={expandedRowIndex === index ? 'expanded-row' : ''}
                                    >
                                      <td>{tech.ayaCode}</td>
                              <td>{tech.name}</td>
                              <td>{item.assignedCustomerCode}</td>
                              <td>{item.assignedCustomerName}</td>
                              <td>{item.assignedCustomerFromDate}</td>
                              <td>{item.assignedCustomerToDate}</td>
                              <td>{item.assignedCustomerRate}</td>
                              <td>{item.assignedCustomerShift}</td>
                              <td>{item.assignedCustomerPurpose}</td>
                              <td>{item.replaceCustomerDetails.length > 0 ? item.replaceCustomerDetails.length : 0 }</td>
                              </tr>
                              {expandedRowIndex === index && (
                                  <>
                                  <tr className="text-uppercase inner-table-cell " >

                                    <th  className="inner-table-cell">Sr.no</th>
                                    <th  className="inner-table-cell">Customer Code</th>
                                    <th  className="inner-table-cell">Customer Name</th>
                                  
                                    <th  className="inner-table-cell">From Date</th>
                                    <th  className="inner-table-cell">To Date</th>


                                    {/* <th  className="inner-table-cell">Generate Bill</th> */}
                                    

                                  </tr>
                                  {assignedCustomerDetails && assignedCustomerDetails[expandedRowIndex].replaceCustomerDetails ? (
                                  assignedCustomerDetails[expandedRowIndex].replaceCustomerDetails.map((item, index) => (
                                    <React.Fragment key={index}>
                                      <tr colSpan={12} className={`fade-in ${expandedRowIndex === index ? 'expanded-row' : ''}`}>

                                        <td  className="inner-table-cell">{index + 1}</td>
                                        <td className="inner-table-cell">{item.replaceCustomerCode}</td>
                                        <td className="inner-table-cell">{item.replaceCustomerName}</td>
                                        <td  className="inner-table-cell">{item.replaceCustomerFromDate}</td>
                                        <td  className="inner-table-cell">{item.replaceCustomerToDate}</td>
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

export default adminLayout(AyaAssign);

