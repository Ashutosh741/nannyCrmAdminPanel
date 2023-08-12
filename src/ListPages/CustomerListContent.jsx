
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

  const apiCategory = () => {
    setLoading(true);
    axios
      .get(`${URL}/customerreg`)
      .then((res) => {
        console.log(res.data.data);
  
        let filteredData = res.data.data;
        // console.log('bhai bhul gya kya',props.availableCustomer)
        if(props.availableCustomer == "ggg"){
          // console.log('chala ya nhi')
          filteredData = res.data.data.filter((customer)=>{
            if(!customer.assignedAyaDetails){
              return true
            }else{
              const reverseData = customer.assignedAyaDetails;
              const length = reverseData.length;
              if(length > 0 && reverseData[length-1].assignedAyaToDate){
                if(!compareDate(reverseData[length-1].assignedAyaToDate)){
                  return true
                }else{
                  // console.log('inner customer is assigned')
                  return false
                }
              }else{
                // console.log('outer customer is assigned')
                return false;
              }
            }
          })
        }
        
        if (props.type) {
          // Filter data based on the workinglocation
          filteredData = res.data.data.filter((item) => item.workinglocation === props.type);
        }
  
        setList(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };
  
    const handleRowClick = (params) => {
      const field  = params.field;
      console.log("let's see again",field)
      if(field === "assignedAyaName" || field == "replaceAyaDetails"){
        // const ayaName = params.row.assignedAyaDetails
        // console.log("what's in this",ayaName[0].assignedAyaCode)
        //   navigate(`/ayareg/${ayaName[0].assignedAyaCode}`)
        return
      }
      // console.log(`/customerreg/${params.row._id}`);
  
      else navigate(`/customerreg/${params.row._id}`);
    };
  

    // const get_diff_days = (replaceAyaToDate) => {
    //   if (toDate && fromDate) {
    //     const toDateParts = toDate.split('-');
    //     const fromDateParts = fromDate.split('-');
    //     const toDateObj = new Date(`${toDateParts[1]}-${toDateParts[0]}-${toDateParts[2]}`);
    //     const fromDateObj = new Date(`${fromDateParts[1]}-${fromDateParts[0]}-${fromDateParts[2]}`);
    //     // const leaveTakenDays = parseFloat(leaveTaken);
    
    //     if (!isNaN(toDateObj) && !isNaN(fromDateObj) && !isNaN(leaveTaken)) {
    //       const diff = Math.floor((toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 86400)) + 1;
    //       return diff;
    //     } else {
    //       console.log('Invalid date or leaveTaken value.');
    //       return 0; // Or any other appropriate value to indicate an error.
    //     }
    //   } else {
    //     console.log('Missing toDate, fromDate, or leaveTaken value.');
    //     return 0; // Or any other appropriate value to indicate an error.
    //   }
    // };

    const checkDateDifference = (data) => {
      // if (data && data.length > 0) {
        // const reverseData = data[0].assignedCustomerDetails.reverse();
        const fromDate = new Date(data.assignedAyaFromDate);
        const toDate = new Date(data.assignedAyaToDate);
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
      // }
    };

    
    const replacedDateDifference = (data) => {
      // if (data && data.length > 0) {
        // const reverseData = data[0].assignedCustomerDetails.reverse();
        const fromDate = new Date(data.replaceAyaFromDate);
        const toDate = new Date(data.replaceAyaToDate);
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
      // }
      // return false; // Handle the case when data is missing or empty
    };

    useEffect(() => {
      apiCategory();
    },[])

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
            width: 80,
            type: 'string',
            editable: true,
          },

          {
            field: 'name',
            headerName: 'CUSTOMER NAME',
            type: 'string',
            width: 150,
            editable: true,
          },
          // {
          //   field: 'attendService',
          //   headerName: 'SHIFT',
          //   type: 'string',
          //   width: 60,
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
            width: 150,
            editable: true,
          },
          // {
          //   field: 'rate',
          //   headerName: 'RATE',
          //   type: 'string',
          //   width: 80,
          //   editable: true,
          // },
          // {
          //   field: 'workShift',
          //   headerName: 'SHIFT',
          //   type: 'string',
          //   width: 80,
          //   editable: true,
          // },
          // {
          //   field: 'assignedAyaName',
          //   headerName: 'ASSIGNED',
          //   type: 'string',
          //   width: 130,
          //   editable: true,
          //   renderCell: (params) => {
          //     const data = params.row.assignedAyaDetails.reverse();
          //     console.log("yes got it",data[0].assignedAyaName)
          //     return <div className="rowitem">
          //       {data[0].assignedAyaName}
          //       </div>;
          //   }
          // },
          
          // {
          //   field: 'rate',
          //   headerName: 'RATE',
          //   type: 'string',
          //   width: 80,
          //   editable: true,
          //   renderCell: (params) => {
          //     const data = params.row.assignedAyaDetails.reverse();
          //     console.log("yes got it",data[0].assignedAyaRate)
          //     return<> {data[0].assignedAyaRate}</>
          //     // return <div className="rowitem">
          //     //   {data[0].assignedAyaRate}
          //     //   </div>;
          //   }
          // },
          {
            field: 'assignedAyaName',
            headerName: 'ASSIGNED',
            type: 'string',
            width: 160,
            editable: true,
            renderCell: (params) => {
              //  ismein kuch is trah se reverse krna pad rha hai , chalo koi nhi
              const data = params.row.assignedAyaDetails;
              let length = data.length;
              // console.log("bhai tahbi mein kisme kr rha tha",data);
              // console.log("bhai tahbi mein kisme kr rha tha",checkDateDifference(data));
  
              if (length > 0 && checkDateDifference(data[length-1])){
                    return (
                      <Link
                      to={`/ayareg/${data[length-1].assignedAyaCode}`}
                      className="btn-success btn text-white"
                    >
                      {data[length-1].assignedAyaName}
                    </Link>
                    )
                }else{
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
            field: 'assignedAyaRate',
            headerName: 'RATE',
            type: 'string',
            width: 80,
            editable: true,
            renderCell: (params) => {
              const data = params.row.assignedAyaDetails;
              let length = data.length;
                // console.log('bhai yeh apne aap chal rrha tha', data);

              if (data && length > 0 && data[length-1].assignedAyaRate && checkDateDifference(data[length-1]))   {
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
            width: 120,
            editable: true,
            renderCell: (params) => {
              const data = params.row.assignedAyaDetails;
              let length = data.length;


              if (data && length > 0 && data[length-1].assignedAyaPurpose && checkDateDifference(data[length-1])) {
                return <>{data[length-1].assignedAyaPurpose}</>;
              } else {
                return null; // or render a placeholder text or component
              }
            },
          },
          
          // {
          //   field: 'paymentstatus',
          //   headerName: 'STATUS',
          //   type: 'string',
          //   width:70,
          //   editable: true,
          // },


          {
            field: 'assignedAyaShift',
            headerName: 'SHIFT',
            type: 'string',
            width: 70,
            editable: true,
            renderCell: (params) => {
              const data = params.row.assignedAyaDetails;
              let length = data.length;

              if (data && length > 0 && data[length-1].assignedAyaShift && checkDateDifference(data[length-1]))  {
                return <>{data[length-1].assignedAyaShift}</>;
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
            let length = data.length;
                // console.log('bhai yeh apne aap chal rrha tha', data);

            if (data && length > 0 && data[length-1].replaceAyaDetails) {
              const replaceDetails = data[length-1].replaceAyaDetails;
              if (replaceDetails) {
                const replaceDetailsCopy = replaceDetails;
                let length2 = replaceDetailsCopy.length;
                // console.log('bhai yeh apne aap chal rrha tha', replaceDetailsCopy);
                if(length2 > 0 && checkDateDifference(data[length-1])){
                return replacedDateDifference(replaceDetailsCopy[length2-1])
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
              }}
              else{
                return
              }
            }
            // return (
            //   <Link to={`/customerassign/${params.row._id}`} className="btn-success btn text-white">
            //       NO
            //     </Link>
            //   );
            }
    
          }

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
