import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";

const CustomerPaymentList = (props) => {
    const navigate = useNavigate();

    const [assigncheck, setAssignCheck] = useState("");
  
  
    const [list, setList] = useState([]);
  
    const [loading, setLoading] = useState(false);
  
  
    // const apiCategory = () => {
    //   setLoading(true);
    //   axios
    //     .get(`${URL}/customerreg`)
    //     .then((res) => {

    //       const data = res.data.data.map((item) => {
    //         const assignedAyaDetails = [...item.assignedAyaDetails].reverse();
    //         return { ...item, assignedAyaDetails };
    //       });

    //       setList(data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //       setLoading(false);
    //     });
    // };

    const compareDate = (billDate) => {
      const todayDate = new Date();
      // console.log('today date format',todayDate)
      const replaceDateParts = billDate.split('-');
      const compareDate = new Date(replaceDateParts[2], replaceDateParts[1] - 1, replaceDateParts[0]);
      // console.log('billDate format',compareDate)
  
      return Math.max(0,todayDate - compareDate);
  }

//   const get_diff_days = (assignedCustomerFromDate) => {
  
//     const toDateParts = new Date();
//     const fromDateParts = assignedCustomerFromDate.split('-');
//     const toDateObj = new Date(`${toDateParts[1]}-${toDateParts[0]}-${toDateParts[2]}`);
//     const fromDateObj = new Date(`${fromDateParts[1]}-${fromDateParts[0]}-${fromDateParts[2]}`);
//     // const leaveTakenDays = parseFloat(leaveTaken);

//     if (!isNaN(toDateObj) && !isNaN(fromDateObj)) {
//       const diff = Math.floor((toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 86400));
//       // console.log("difference of date",diff)
//       return diff;
//     } else {
//       console.log('Invalid date or leaveTaken value.');
//       return 0; // Or any other appropriate value to indicate an error.
//     }
// }
  

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
    
  
    const handleRowClick = (params) => {
      const field = params.field;
      if(field === "assignedAyaName")return ;
      // console.log(`/payment/${params.row._id}`);
  
      else navigate(`/payment/${params.row._id}`);
    };
  
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
          //   renderCell:(params) =>{
          //     const id = params;
          //     console.log("what's paramas",id);
          // }
        },
          {
            field: 'customerCode',
            headerName: 'C CODE',
            width: 80,
            type: 'string',
            editable: true,
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
            field: 'name',
            headerName: 'CUSTOMER NAME',
            type: 'string',
            width: 160,
            editable: true,
          },
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
            width: 120,
            editable: true,
          },
          {
            field: 'assignedAyaName',
            headerName: 'ASSIGNED',
            type: 'string',
            width: 160,
            editable: true,
            renderCell: (params) => {
              const data = params.row.assignedAyaDetails; 
              let length = params.row.assignedAyaDetails.length;
                // console.log('idhar reverse mall aa rha kya?',data)
              if (length > 0 && data[length-1].assignedAyaName) {
                // return <>{data[0].assignedAyaName}</>;
                return (
                  <Link
                    to={`/ayareg/${data[length-1].assignedAyaCode}`}
                    className="btn-success btn text-white"
                  >
                    {data[length-1].assignedAyaName}
                  </Link>
                );
              } else {
                return (
                  <Link
                    to={`/customerassign/${params.row._id}`}
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
              let length  = params.row.assignedAyaDetails.length;
              if (length > 0 && data[length-1].assignedAyaRate) {
                return <>{data[length-1].assignedAyaRate}</>;
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
              let length  = params.row.assignedAyaDetails.length;
              if (length > 0 && data[length-1].assignedAyaPurpose) {
                return <>{data[length-1].assignedAyaPurpose}</>;
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
              let length  = params.row.assignedAyaDetails.length;
              if (length > 0 && data[length-1].assignedAyaShift) {
                return <>{data[length-1].assignedAyaShift}</>;
              } else {
                return null; // or render a placeholder text or component
              }
            },
          },
          // {
          //   field: 'assign',
          //   headerName: 'ASSIGNED',
          //   type: 'string',
          //   width: 130,
          //   editable: true,
          // },
          
          // {
          //   field: 'rate',
          //   headerName: 'RATE',
          //   type: 'string',
          //   width: 80,
          //   editable: true,
          // },
          {
            field: 'paymentstatus',
            headerName: 'STATUS',
            type: 'string',
            width: 130,
            renderCell: (params) => {
              const data = params.row.customerGeneratedInvoice;
              const data2 = params.row.assignedAyaDetails;
              if(data.length <= 0 && data2 && data2.length > 0){
                return <button className="btn btn-default text-black">Not Generated</button>;
                
              }
              else if (data && data.length > 0) {
                console.log('before reverse',data);
                
                const reverseData = [...data].reverse(); // Reverse the array
                const lastGenerated = reverseData[0];
                console.log('after reverse',reverseData);
          
                if (compareDate(lastGenerated.generatedToDate) < 30) {
                  return <button className="btn btn-secondary">Completed</button>;
                } else {
                  return <button className="btn btn-danger">Pending</button>;
                }
              } 
              else {
                return null;
              }
              
              // else if (params.row.assignedAyaDetails.length > 0) {  
              //   const lastAssigned = [...params.row.assignedAyaDetails].reverse();
              //   if (get_diff_days(lastAssigned[0].assignedAyaFromDate) < 30) {
              //     return <button className="btn btn-default">Not Generated</button>;
              //   }
              // }
          
              // return <button className="btn btn-dark">Pending</button>;
            },
          },
          


        //   {
        //       field: 'workShift',
        //       headerName: 'SHIFT',
        //       type: 'string',
        //       width: 80,
        //       editable: true,
        //     },

            // {
            //   field: 'gender',
            //   headerName: 'GENDER',
            //   type: 'string',
            //   width: 90,
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
            //     field: 'guardianName',
            //     headerName: 'PARENT NAME',
            //     type: 'string',
            //     description: 'This column has a value getter and is not sortable.',
            //     sortable: false,
            //     width: 140,
            //   },


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

export default CustomerPaymentList
