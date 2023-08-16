import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";



const AyaPaymentListContent = (props) => {
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
          // console.log("filtered data, chcekc it",data);
          setList(filteredData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    };
  
    const handleRowClick = (params) => {
    const field = params.field;
    // console.log("aisa kya hai isme", field);

      if (field === "assignedCustomerName" || field === 'paymentstatus') {
        return;
      }
      else {
      navigate(`/ayapayment/${params.row._id}`);
      }
    };
  
    useEffect(() => {
      apiCategory();
    }, [setLoading])

    useEffect(() => {
      apiCategory();
    }, [props.type])

    const compareDate = (billDate) => {
      // Get the current date
      const todayDate = new Date();
    
      // Split the billDate into day, month, and year parts
      const replaceDateParts = billDate.split('-');
      const billDay = parseInt(replaceDateParts[0]);
      const billMonth = parseInt(replaceDateParts[1]) - 1; // JavaScript months are 0-indexed
      const billYear = parseInt(replaceDateParts[2]);
    
      // Create a Date object for the billDate
      const currentDate = new Date(billYear, billMonth, billDay);
    
      // Calculate the difference in days
      const timeDifference = todayDate - currentDate; // Difference in milliseconds
      const diffDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      console.log('aaj ka date',todayDate);
      console.log('billdate ka date',currentDate);
    
      console.log('differnce of days',diffDays)
      return diffDays;
    };
    
    // // Example usage
    // const billDate = '10-08-2023';
    // const differenceInDays = compareDate(billDate);
    // console.log(`The difference between today and ${billDate} is ${differenceInDays} days.`);
    
    
  
  
    // console.log(list.file);
  
      //download Excel
      // const handleDownloadExcel = () => {
      // const worksheet = XLSX.utils.json_to_sheet(list);
      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet, "AYA Data");
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
          //   renderCell:(params) =>{
          //     const id = params;
          //     console.log("what's paramas",id);
          // }
        },
          {
            field: 'ayaCode',
            headerName: 'AYA CODE',
            width: 120,
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
            headerName: 'AYA NAME',
            type: 'string',
            width: 150,
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
          field: 'assignedCustomerName',
          headerName: 'ASSIGNED',
          type: 'string',
          width: 165,
          editable: true,
          renderCell: (params) => {
            const data = params.row.assignedCustomerDetails;
            let dLen = data.length;
            if (data && data.length > 0 && data[dLen-1].assignedCustomerName) {
              const assignedCustomerName = data[dLen-1].assignedCustomerName;
              const truncatedName = assignedCustomerName.length > 17 ? assignedCustomerName.substring(0, 40) + '...' : assignedCustomerName;
          
              return (
                <Link
                  to={`/customerreg/${data[dLen-1].assignedCustomerCode}`}
                  className="btn-success btn text-white"
                  title={assignedCustomerName} // Add the full name as a tooltip
                >
                  {truncatedName}
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
            let dLen = data.length;

            if (data && data.length > 0 && data[dLen-1].assignedCustomerRate) {
              return <>{data[dLen-1].assignedCustomerRate}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
          field: 'assignedCustomerPurpose',
          headerName: 'PURPOSE',
          type: 'string',
          width: 120,
          editable: true,
          renderCell: (params) => {
            const data = params.row.assignedCustomerDetails;
            let dLen = data.length;
            if (data && data.length > 0 && data[dLen-1].assignedCustomerPurpose) {
              return <>{data[dLen-1].assignedCustomerPurpose}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
          field: 'assignedCustomerShift',
          headerName: 'SHIFT',
          type: 'string',
          width: 60,
          editable: true,
          renderCell: (params) => {
            const data = params.row.assignedCustomerDetails;
            let dLen = data.length;
            if (data && data.length > 0 && data[dLen-1].assignedCustomerShift) {
              return <>{data[dLen-1].assignedCustomerShift}</>;
            } else {
              return null; // or render a placeholder text or component
            }
          },
        },
        {
          field: 'paymentstatus',
          headerName: 'STATUS',
          type: 'string',
          width: 130,
          renderCell: (params) => {
            const data = params.row.ayaGeneratedInvoice;
            // let dLen = data.length;
            console.log('aya name',params.row.name)
            console.log('invoice format',data)

            const data2 = params.row.assignedCustomerDetails;
            if(data.length <= 0 && data2 && data2.length > 0){
              return (
              <Link
              to={`/generateAyaBill/${params.row._id}`}
              className="btn btn-default text-black"
            >
              Not Generated
            </Link>
              )
            }
            else if (data && data.length > 0) {
              // console.log('before reverse',data);
              
              // const reverseData = data; // Reverse the array
              const lastGenerated = data[data.length-1];
        
              if (compareDate(lastGenerated.generatedToDate) < 30) {
                return (
                <Link
                to={`/generateAyaBill/${params.row._id}`}
                className="btn btn-success text-white"
              >
                Completed
              </Link>
                )
              } else {
                return(
                <Link
                to={`/generateAyaBill/${params.row._id}`}
                className="btn btn-danger text-white"
              >
                Pending
              </Link>
                )
              }
              
            } 
            else {
              return null;
            }
          },
        },
        ];
      return (
          <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={list}
              columns={columns}
              getRowId={getRowId}
              onCellClick={handleRowClick}
              // onRowClick={handleRowClick}
  
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

export default AyaPaymentListContent
