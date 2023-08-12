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
    
          const data = filteredData.map((item) => {
            const assignedCustomerDetails = [...item.assignedCustomerDetails].reverse();
            return { ...item, assignedCustomerDetails };
          });
          // console.log("filtered data, chcekc it",data);
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
    console.log("aisa kya hai isme", field);

      if (field === "assignedCustomerName") {
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
        //   {
        //     field: 'customerCode',
        //     headerName: 'CUSTOMER CODE',
        //     width: 140,
        //     type: 'string',
        //     editable: true,
        //   },
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
            width: 140,
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
          width: 145,
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
          width: 60,
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
          // {
          //   field: 'paymentstatus',
          //   headerName: 'STATUS',
          //   type: 'string',
          //   width:70,
          //   editable: true,
          // },


        //   {
        //       field: 'workShift',
        //       headerName: 'SHIFT',
        //       type: 'string',
        //       width: 80,
        //       editable: true,
        //     },

            {
              field: 'gender',
              headerName: 'GENDER',
              type: 'string',
              width: 90,
              editable: true,
            },
            {
              field: 'age',
              headerName: 'AGE',
              type: 'number',
              width: 20,
              editable: true,
            },
            {
                field: 'guardianName',
                headerName: 'PARENT NAME',
                type: 'string',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 140,
              },


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

export default AyaPaymentListContent
