import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { orders } from "../../data/mockData";
import Header from "../../components/Header";
import React, { useState } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handleDeleteRow = (rowId) => {
    // Thực hiện xóa các hàng đã chọn
    console.log("Delete rows:", rowId);
  };
  
  const handleEditRow = (rowId) => {
    // Handle edit logic for the selected row
    console.log('Edit row:', rowId);
  };

  const handleViewRow = (rowId) => {
    // Handle view logic for the selected row
    console.log('View row:', rowId);
  };

  const handleSelectionModelChange = (newRowSelectionModel) =>{
    setRowSelectionModel(newRowSelectionModel);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payment_status",
      headerName: "Tình trạng thanh toán",
      flex: 1,
    },
    {
      field: "order_status",
      headerName: "Tình trạng đơn hàng",
      flex: 1,
    },
    {
      field: "total_price",
      headerName: "Tổng tiền",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.total_price}
        </Typography>
      ),
    },
    {
      field: "payment_method",
      headerName: "Phương thức thanh toán",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <div>
            <IconButton
              onClick={() => handleViewRow(id)}
              size="small"
              color="inherit"
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => handleEditRow(id)}
              size="small"
              style={{ color: '#FFD700' }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteRow(id)}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      }
    },
  ];

  return (
    <Box m="20px" width="100%">
      <Header title="ĐƠN HÀNG" subtitle="Quản lý đơn hàng" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
      <DataGrid 
          disableRowSelectionOnClick 
          rows={orders} 
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            handleSelectionModelChange(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
    </Box>
  );
};

export default Orders;
