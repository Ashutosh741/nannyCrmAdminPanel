import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";

const CustomerPaymentList = () => {
    const navigate = useNavigate();

    const [assigncheck, setAssignCheck] = useState("");
  
  
    const [list, setList] = useState([]);
  
    const [loading, setLoading] = useState(false);
  
  
    const apiCategory = () => {
      setLoading(true);
      axios
        .get(`${URL}/customerreg`)
        .then((res) => {

          const data = res.data.data.map((item) => {
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
  
    console.log(list.file);
  
      //download Excel
      const handleDownloadExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(list);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Data");
      XLSX.writeFile(workbook, "Customer_data.xlsx");
      };
          
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
            width: 145,
            editable: true,
            renderCell: (params) => {
              const data = params.row.assignedAyaDetails;
              if (data && data.length > 0 && data[0].assignedAyaName) {
                // return <>{data[0].assignedAyaName}</>;
                return (
                  <Link
                    to={`/ayareg/${data[0].assignedAyaCode}`}
                    className="btn-success btn text-white"
                  >
                    {data[0].assignedAyaName}
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
            width: 60,
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
            width:70,
            editable: true,
          },


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
          <Box sx={{ height: 600, width: '100%' }}>
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
