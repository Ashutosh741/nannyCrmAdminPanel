
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";


const CustomerListContent = (props) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiCategory = () => {
    setLoading(true);
    axios
      .get(`${URL}/customerreg`)
      .then((res) => {
        console.log(res.data.data);
  
        let filteredData = res.data.data;
        
        if (props.type) {
          // Filter data based on the workinglocation
          filteredData = res.data.data.filter((item) => item.workinglocation === props.type);
        }
  
        const data = filteredData.map((item) => {
          const assignedAyaDetails = [...item.assignedAyaDetails].reverse();
          return { ...item, assignedAyaDetails };
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
    if (field === "assignedAyaName" || field === "replaceAyaDetails") {
      return;
      // console.log("bhai tu chaal bhi rha hai ?", params.row.assign);
      // const AyaId = params.row.assign;
      // navigate(`/Ayareg/${AyaId}`);
    } else {
      navigate(`/customerreg/${params.row._id}`);
    }
  };

  const checkDateDifference = (data) => {
    if (data && data.length > 0) {
      // const reverseData = data[0].assignedAyaDetails.reverse();
      const fromDate = new Date(data[0].assignedAyaFromDate);
      const toDate = new Date(data[0].assignedAyaToDate);
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
      // const reverseData = data[0].assignedAyaDetails.reverse();
      const fromDate = new Date(data[0].replaceAyaFromDate);
      const toDate = new Date(data[0].replaceAyaToDate);
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
    },[])

    useEffect(() => {
      apiCategory();
    }, [props.type])
  
    // console.log(list.file);
  
      //download Excel
      // const handleDownloadExcel = () => {
      // const worksheet = XLSX.utils.json_to_sheet(list);
      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Data");
      // XLSX.writeFile(workbook, "Customer_data.xlsx");
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
          field: 'customerCode',
          headerName: 'C CODE',
          width: 85,
          type: 'string',
          editable: true,
        },

        {
          field: 'name',
          headerName: 'CUSTOMER NAME',
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
          field: 'assignedAyaName',
          headerName: 'ASSIGNED',
          type: 'string',
          width: 145,
          editable: true,
          renderCell: (params) => {
            //  i don't know why reverse data aa rha hai, to isko as it is chod do
            const data = params.row.assignedAyaDetails;
            console.log("bhai tahbi mein kisme kr rha tha",data);
            // console.log("bhai tahbi mein kisme kr rha tha",checkDateDifference(data));

            if (checkDateDifference(data)){
              return (
                <Link
                to={`/ayareg/${data[0].assignedAyaCode}`}
                className="btn-success btn text-white"
              >
                {data[0].assignedAyaName}
              </Link>
              )
            }
            else{
              return (
                <Link
                  to={`/ayaassign/${params.row._id}`}
                  className="btn-danger btn text-white"
                >
                  Assign Aya
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
            const data = params.row.assignedAyaDetails;
            if (data && data.length > 0 && data[0].assignedAyaRate) {
              return <>{data[0].assignedAyaRate}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
          field: 'assignedAyaPurpose',
          headerName: 'PURPOSE',
          type: 'string',
          width: 100,
          editable: true,
          renderCell: (params) => {
            const data = params.row.assignedAyaDetails;
            if (data && data.length > 0 && data[0].assignedAyaPurpose) {
              return <>{data[0].assignedAyaPurpose}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
          field: 'assignedAyaShift',
          headerName: 'SHIFT',
          type: 'string',
          width: 70,
          editable: true,
          renderCell: (params) => {
            const data = params.row.assignedAyaDetails;
            if (data && data.length > 0 && data[0].assignedAyaShift) {
              return <>{data[0].assignedAyaShift}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
        field: 'replaceAyaDetails',
        headerName: 'REPLACED',
        type: 'string',
        width: 90,
        editable: true,
        renderCell: (params) => {
        const data = params.row.assignedAyaDetails;
        if (data && data.length > 0 && data[0].replaceAyaDetails) {
          const replaceDetails = data[0].replaceAyaDetails;
          if (replaceDetails) {
            const replaceDetailsCopy = [...replaceDetails].reverse();
            // console.log('bhai yeh apne aap chal rrha tha', replaceDetailsCopy);
            return replacedDateDifference(replaceDetailsCopy)
              ? (
                <Link to={`/customerassign/${params.row._id}`} className="btn-warning btn text-black">
                  YES
                </Link>
              )
              : (
                <Link to={`/customerassign/${params.row._id}`} className="btn-success btn text-white">
                  NO
                </Link>
              );
          }
        }
        return (
          <Link to={`/customerassign/${params.row._id}`} className="btn-success btn text-white">
            NO
          </Link>
        );
        }

      }
        
  
      ];
        return (
          <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={list}
              columns={columns}
              getRowId={getRowId}
              onCellClick={handleRowClick}
              // onRowClick={handleRowClick}
              pagination={false} // Set pagination to false
              // initialState={{
              //   pagination: {
              //     paginationModel: {
              //       pageSize: 10,
              //     },
              //   },
              // }}
              // pageSizeOptions={[10]}
              // checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        );
        
}

export default CustomerListContent
