
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";


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
    console.log("aisa kya hai isme", field);
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
      const fromDate = new Date(data[0].assignedCustomerFromDate);
      const toDate = new Date(data[0].assignedCustomerToDate);
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
      const fromDate = new Date(data[0].replaceCustomerFromDate);
      const toDate = new Date(data[0].replaceCustomerToDate);
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
  
  

  const compareDate = (billDate) => {
    // console.log('bill date format',billDate);

    const todayDate = new Date();
    // console.log('today date format',todayDate)
    const replaceDateParts = billDate.split('-');
    const compareDate = new Date(replaceDateParts[0], replaceDateParts[1] - 1, replaceDateParts[2],0,0,0);
    // console.log('billDate format',compareDate)
    // console.log('compare date format',compareDate);
    // console.log('today date format',todayDate);
    // console.log("result",todayDate <= compareDate)
    return todayDate <= compareDate;
}


  
  useEffect(() => {
    apiCategory();
  }, [setLoading])

  useEffect(() => {
    apiCategory();
  }, [props.type])

  console.log(list.file);

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
            console.log("bhai tahbi mein kisme kr rha tha",data);
            // console.log("bhai tahbi mein kisme kr rha tha",checkDateDifference(data));

            if (checkDateDifference(data)){
              return (
                <Link
                to={`/customerreg/${data[0].assignedCustomerCode}`}
                className="btn-success btn text-white"
              >
                {data[0].assignedCustomerName}
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
          const replaceDetails = data[0].replaceCustomerDetails;
          if (replaceDetails) {
            const replaceDetailsCopy = [...replaceDetails].reverse();
            // console.log('bhai yeh apne aap chal rrha tha', replaceDetailsCopy);
            return replacedDateDifference(replaceDetailsCopy)
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

export default AyaListContent


