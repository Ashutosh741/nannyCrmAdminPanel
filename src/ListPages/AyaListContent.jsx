
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";


//  this page is totally set, with correct detials, no changes required

const AyaListContent = (props) => {
  // console.log("type station",props.type)

console.log(props);
  const navigate = useNavigate();

  const [assigncheck, setAssignCheck] = useState("");


  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(false);



  const apiCategory = () => {
    setLoading(true);
    axios
      .get(`${URL}/ayareg`)
      .then((res) => {
        console.log(res.data.data);
  
        let filteredData = res.data.data;
        
        if (props.type) {
          // Filter data based on the workinglocation
          filteredData = res.data.data.filter((item) => item.workinglocation === props.type);
        }
  
        // const data = filteredData.map((item) => {
        //   const assignedCustomerDetails = [...item.assignedCustomerDetails].reverse();
        //   return { ...item, assignedCustomerDetails };
        // });
        setList(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };
  
  
  // console.log(type)

  const handleRowClick = (params) => {
    const field = params.field;
    // console.log("aisa kya hai isme", field);
    if (field === "assignedCustomerName" || field === "replaceCustomerDetails") {
      return;
      // console.log("bhai tu chaal bhi rha hai ?", params.row.assign);
      // const customerId = params.row.assign;
      // navigate(`/customerreg/${customerId}`);
    } else {
      navigate(`/ayareg/${params.row._id}`);
    }
  };

  const checkDateDifference = (data) => {
    if (data && data.length > 0) {
      // const reverseData = data[0].assignedCustomerDetails.reverse();
      const fromDate = new Date(data[data.length-1].assignedCustomerFromDate);
      const toDate = new Date(data[data.length-1].assignedCustomerToDate);
      const todayDate = new Date();
      // console.log("from date let's see",fromDate);
      // console.log("toDate date let's see",toDate)
      // console.log("today date let's see",todayDate)

  
      if (todayDate >= fromDate && todayDate <= toDate) {
        // Today's date is between fromDate and toDate
        return true;
      } else if(toDate == 'Invalid Date' && todayDate >= fromDate ){
        return true
      }else{
        return false;
      }
    }
    return false; // Handle the case when data is missing or empty
  };

    const replacedDateDifference = (data) => {
    if (data && data.length > 0) {
      // const reverseData = data[0].assignedCustomerDetails.reverse();
      const fromDate = new Date(data[data.length-1].replaceCustomerFromDate);
      const toDate = new Date(data[data.length-1].replaceCustomerToDate);
      const todayDate = new Date();
      // console.log("from date let's see",fromDate);
      // console.log("toDate date let's see",toDate)
      // console.log("today date let's see",todayDate)

  
      if (todayDate >= fromDate && todayDate <= toDate) {
        // Today's date is between fromDate and toDate
        return true;
      } else if(toDate == 'Invalid Date' && todayDate >= fromDate ){
        return true
      }else{
        return false;
      }
    }
    return false; // Handle the case when data is missing or empty
  };
  


  
  useEffect(() => {
    apiCategory();
  }, [setLoading])

  useEffect(() => {
    apiCategory();
  }, [props.type])

  console.log(list.file);

  const compareDate = (toDate) => {
    // Get the current date
    const todayDate = new Date();
  
    // Split the toDate into day, month, and year parts
    const replaceDateParts = toDate.split('-');
    const billDay = parseInt(replaceDateParts[0]);
    const billMonth = parseInt(replaceDateParts[1]) - 1; // JavaScript months are 0-indexed
    const billYear = parseInt(replaceDateParts[2]);
  
    // Create a Date object for the toDate
    const currentDate = new Date(billYear, billMonth, billDay);
  
    // Calculate the difference in days
    // const timeDifference = todayDate - currentDate; // Difference in milliseconds
    // const diffDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // console.log('aaj ka date',todayDate);
    // console.log('toDate ka date',currentDate);
  
    // console.log('differnce of days',diffDays)
    return todayDate >= currentDate;
  };
  

    //download Excel
    // const handleDownloadExcel = () => {
    // const worksheet = XLSX.utils.json_to_sheet(list);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Aya  Data");
    // XLSX.writeFile(workbook, "Aya_data.xlsx");
    // };
        
    const getRowId = (row) => row._id;

    const columns = [
        { field: 'sr.no',
         headerName: 'SR.NO', 
         flex: 0,
         editable: false,
         renderCell: (params) =>
           params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
         width: 60 ,
      },
      {
        field: "file",
        headerName: "IMAGE",
        width: 80,
        renderCell: (params) => {
          const { value } = params;
          return (
            <img
              src={`${URL}/${value}`}
              className="tableimgmui"
              style={{height:"55px",width:"55px"}}
            ></img>
          );
      },
      },
        {
          field: 'ayaCode',
          headerName: 'AYA CODE',
          width: 85,
          type: 'string',
          editable: true,
        },

        {
          field: 'name',
          headerName: 'AYA NAME',
          type: 'string',
          width: 120,
          editable: true,
        },
        // {
        //   field: 'workShift',
        //   headerName: 'SHIFT',
        //   type: 'string',
        //   width: 80,
        //   editable: true,
        // },
        {
          field: 'contactNumber',
          headerName: 'CONTACT NO.',
          type: 'string',
          width: 110,
          editable: true,
        },
        
        {
          field: 'presentAddress',
          headerName: 'LOCATION',
          type: 'string',
          width: 110,
          editable: true,
        },
        {
          field: 'assignedCustomerName',
          headerName: 'ASSIGNED',
          type: 'string',
          width: 145,
          editable: true,
          renderCell: (params) => {
            //  i don't know why reverse data aa rha hai, to isko as it is chod do
            const data = params.row.assignedCustomerDetails;
            // console.log("bhai tahbi mein kisme kr rha tha",data);
            // console.log("bhai tahbi mein kisme kr rha tha",checkDateDifference(data));
            let size = data.length-1;
            if(size < 0){
              return (
                <Link
                  to={`/ayaassign/${params.row._id}`}
                  className="btn-danger btn text-white"
                >
                  Assign Customer
                </Link>
              );
            }

            if (checkDateDifference(data)){
              return (
                <Link
                to={`/customerreg/${data[size].assignedCustomerCode}`}
                className="btn-success btn text-white"
              >
                {data[size].assignedCustomerName}
              </Link>
              )
            }
            else{
              return (
                <Link
                  to={`/ayaassign/${params.row._id}`}
                  className="btn-danger btn text-white"
                >
                  Assign Customer
                </Link>
              );
            }


          },
        },
        
        {
          field: 'rate',
          headerName: 'RATE',
          type: 'string',
          width: 60,
          editable: true,
          renderCell: (params) => {
            const data = params.row.assignedCustomerDetails;
            let size = data.length-1;
            if(size < 0)return;

            if (data && data.length > 0 && data[size].assignedCustomerRate) {
              return <>{data[size].assignedCustomerRate}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
          field: 'assignedCustomerPurpose',
          headerName: 'PURPOSE',
          type: 'string',
          width: 100,
          editable: true,
          renderCell: (params) => {
            const data = params.row.assignedCustomerDetails;
            let size = data.length-1;
            if(size < 0)return;

            if (data && data.length > 0 && data[size].assignedCustomerPurpose) {
              return <>{data[size].assignedCustomerPurpose}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
          field: 'assignedCustomerShift',
          headerName: 'SHIFT',
          type: 'string',
          width: 70,
          editable: true,
          renderCell: (params) => {
            const data = params.row.assignedCustomerDetails;
            let size = data.length-1;
            if(size < 0)return;
            if (data && data.length > 0 && data[size].assignedCustomerShift) {
              return <>{data[size].assignedCustomerShift}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
        field: 'replaceCustomerDetails',
        headerName: 'REPLACED',
        type: 'string',
        width: 90,
        editable: true,
        renderCell: (params) => {
        const data = params.row.assignedCustomerDetails;
        let size = data.length-1;
        console.log('name',params.row.name);
        console.log('assigned details',params.row.assignedCustomerDetails);
        console.log('length',size);

        if(size < 0)return null;
        else if(!compareDate(data[data.length-1].assignedCustomerToDate)){
          return null;
        }

        if (data && data.length > 0 && data[size].replaceCustomerDetails) {
          const replaceDetails = data[size].replaceCustomerDetails;
          if (replaceDetails) {
            // const replaceDetailsCopy = [...replaceDetails].reverse();
            // console.log('bhai yeh apne aap chal rrha tha', replaceDetailsCopy);
            return replacedDateDifference(replaceDetails)
              ? (
                <Link to={`/ayaassign/${params.row._id}`} className="btn-warning btn text-black">
                  YES
                </Link>
              )
              : (
                <Link to={`/ayaassign/${params.row._id}`} className="btn-success btn text-white">
                  NO
                </Link>
              );
          }
        }
        return (
          <Link to={`/ayaassign/${params.row._id}`} className="btn-success btn text-white">
            NO
          </Link>
        );
        }

      }
        
        
        // {
        //   field: 'paymentstatus',
        //   headerName: 'STATUS',
        //   type: 'string',
        //   width:70,
        //   editable: true,
        // },
        
        // {
        //   field: 'gender',
        //   headerName: 'GENDER',
        //   type: 'string',
        //   width: 75,
        //   editable: true,
        // },
        // {
        //   field: 'age',
        //   headerName: 'AGE',
        //   type: 'number',
        //   width: 20,
        //   editable: true,
        // },

        // {
        //   field: 'guardianName',
        //   headerName: 'PARENT NAME',
        //   type: 'string',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 140,
        // },



          // {
          //   field: 'assign',
          //   headerName: 'ASSIGNED',
          //   type: 'string',
          //   width: 100,
          //   editable: true,
          // },
          // {
          //   field: 'rate',
          //   headerName: 'RATE',
          //   type: 'string',
          //   width: 50,
          //   editable: true,
          // },

        //   {
        //     field: 'daysLeft',
        //     headerName: 'DAYS LEFT',
        //     type: 'number',
        //     width: 160,
        //     editable: true,
        //   },
        //   {
        //     field: 'customerAssigned',
        //     headerName: 'CUSTOMER ASSIGNED',
        //     type: 'number',
        //     width: 180,
        //     editable: true,
        //   },

      ];
      return (
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={list}
            columns={columns}
            getRowId={getRowId}
            onCellClick={handleRowClick}
            // onRowClick={handleRowClick}
      
            initialState={{
              // No pagination configuration here
            }}
            // pageSizeOptions={[10]}  // Removing pageSizeOptions
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      );
      
}

export default AyaListContent


