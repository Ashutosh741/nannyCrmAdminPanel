import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";


const AyaAvailable = (props) => {
 
  const location = useLocation();
  console.log(location.pathname)

// console.log(props);
const navigate = useNavigate();

const [assigncheck, setAssignCheck] = useState("");


const [list, setList] = useState([]);

const [loading, setLoading] = useState(false);


const get_diff_days = (assignedCustomerFromDate) => {
  // if(assignedCustomerFromDate){
      const toDateParts = new Date();
      const fromDateParts = assignedCustomerFromDate.split('-');
      const toDateObj = new Date(`${toDateParts[1]}-${toDateParts[0]}-${toDateParts[2]}`);
      const fromDateObj = new Date(`${fromDateParts[1]}-${fromDateParts[0]}-${fromDateParts[2]}`);
      // const leaveTakenDays = parseFloat(leaveTaken);
  
      if (!isNaN(toDateObj) && !isNaN(fromDateObj)) {
        const diff = Math.floor((toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 86400));
        console.log("difference of date",diff)
        return diff;
      } else {
        console.log('Invalid date or leaveTaken value.');
        return 0; // Or any other appropriate value to indicate an error.
      }
  }


const apiCategory = () => {
  setLoading(true);
  axios
    .get(`${URL}/ayareg`)
    .then((res) => {
      console.log(res.data.data);
        
      let filteredData = res.data.data;

      if(location.pathname === "/ayapayment"){
        filteredData = res.data.data.filter((customer) => {
          if (customer.ayaGeneratedInvoice.length <= 0) {
            return true; // Exclude customers without any generated invoice
          } else {
            const reverseData = customer.ayaGeneratedInvoice.reverse();
            if (reverseData.length > 0 && reverseData[0].generatedToDate) {
              const daysDifference = get_diff_days(reverseData[0].generatedToDate);
              return daysDifference > 30; // Include customers with generatedToDate within 30 days
            } else {
              return true; // Exclude customers without generatedToDate
            }
          }
        });
        
      }


      else if(location.pathname === '/totalAvaibleNanny'){
        filteredData = res.data.data.filter((customer) => {
          if (customer.assignedCustomerDetails.length <= 0) {
              return true;
          } else {
              const reverseData = customer.assignedCustomerDetails.reverse();
      
              if (reverseData.length > 0 && compareFromDate(reverseData[0].assignedCustomerFromDate)) {
                  return true;
              } else if (reverseData[0].assignedCustomerToDate && !compareDate(reverseData[0].assignedCustomerToDate)) {
                  return true;
              }
      
              return false; // If none of the conditions are met, filter out the item
          }
      });
    }
    
      
      if (props.type) {
        // Filter data based on the workinglocation
        filteredData = res.data.data.filter((item) => item.workinglocation === props.type);
      }

      const data = filteredData.map((item) => {
        const assignedCustomerDetails = [...item.assignedCustomerDetails].reverse();
        return { ...item, assignedCustomerDetails };
      });
      setList(data);
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


  const compareDate = (billDate) => {
    const todayDate = new Date();
    // console.log('today date format',todayDate)
    const replaceDateParts = billDate.split('-');
    const compareDate = new Date(replaceDateParts[0], replaceDateParts[1] - 1, replaceDateParts[2],0,0,0);
    // console.log('billDate format',compareDate)

    return todayDate <= compareDate;
}

const compareFromDate = (billDate) => {
  const todayDate = new Date();
  // console.log('today date format',todayDate)
  const replaceDateParts = billDate.split('-');
  const compareDate = new Date(replaceDateParts[0], replaceDateParts[1] - 1, replaceDateParts[2],0,0,0);
  // console.log('billDate format',compareDate)

  return todayDate < compareDate;
}


useEffect(() => {
  apiCategory();
}, [setLoading])

useEffect(() => {
  apiCategory();
}, [props.type])

console.log(list.file);

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
        width: 165,
        editable: true,
        renderCell: (params) => {
          const data = params.row.assignedCustomerDetails;
          if (data && data.length > 0 && data[0].assignedCustomerName) {
            // return <>{data[0].assignedCustomerName}</>;
            return (
              <Link
                to={`/customerreg/${data[0].assignedCustomerCode}`}
                className="btn-success btn text-white"
              >
                {data[0].assignedCustomerName}
              </Link>
            );
          } else {
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
          if (data && data.length > 0 && data[0].assignedCustomerRate) {
            return <>{data[0].assignedCustomerRate}</>;
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
          if (data && data.length > 0 && data[0].assignedCustomerPurpose) {
            return <>{data[0].assignedCustomerPurpose}</>;
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
          if (data && data.length > 0 && data[0].assignedCustomerShift) {
            return <>{data[0].assignedCustomerShift}</>;
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
          if (data && data.length > 0 && data[0].replaceCustomerDetails) {
            // return <>{data[0].assignedCustomerName}</>;
            const replaceDetails = data[0].replaceCustomerDetails;
            // if(replaceDetails.replaceCustomerToDate && compareDate(replaceDetails[0].replaceCustomerToDate) > 0){
            if(replaceDetails[0] &&( replaceDetails[0].replaceCustomerToDate && compareDate(replaceDetails[0].replaceCustomerToDate) > 0)){
              
            return(
                <Link
                  to={`/ayaassign/${params.row._id}`}
                  className="btn-warning btn text-black"
                >
                  YES
                </Link>
              )
            }else{
              return(
                <Link
                  to={`/ayaassign/${params.row._id}`}
                  className="btn-success btn text-white"
                >
                  NO
                </Link>
              )
            }
        }
      },
    },
    // {
    //   field: 'paymentstatus',
    //   headerName: 'STATUS',
    //   type: 'string',
    //   width: 130,
    //   renderCell: (params) => {
    //     const data = params.row.ayaGeneratedInvoice;
    //     const data2 = params.row.assignedCustomerDetails;
    //     if(data.length <= 0 && data2 && data2.length > 0){
    //       return <button className="btn btn-default text-black">Not Generated</button>;
          
    //     }
    //     else if (data && data.length > 0) {
    //       console.log('before reverse',data);
          
    //       const reverseData = [...data].reverse(); // Reverse the array
    //       const lastGenerated = reverseData[0];
    //       console.log('after reverse',reverseData);
    
    //       if (compareDate(lastGenerated.generatedToDate) < 30) {
    //         return <button className="btn btn-success">Completed</button>;
    //       } else {
    //         return <button className="btn btn-danger">Pending</button>;
    //       }
    //     } 
    //     else {
    //       return null;
    //     }
        
    //     // else if (params.row.assignedAyaDetails.length > 0) {  
    //     //   const lastAssigned = [...params.row.assignedAyaDetails].reverse();
    //     //   if (get_diff_days(lastAssigned[0].assignedAyaFromDate) < 30) {
    //     //     return <button className="btn btn-default">Not Generated</button>;
    //     //   }
    //     // }
    
    //     // return <button className="btn btn-dark">Pending</button>;
    //   },
    // },
      
      
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
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
}

export default AyaAvailable
