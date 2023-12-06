import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { users, updateUsers } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Account = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handleDeleteRow = (rowId) => {
    // Thực hiện xóa các hàng đã chọn
    console.log("Delete rows:", rowId);
    const updatedRows = users.filter((row) => row.id !== rowId);
    updateUsers(updatedRows);
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
    },
    {
      field: "type",
      headerName: "Loại tài khoản",
      flex: 1,
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              type === "admin"
                ? colors.greenAccent[700]
                : colors.greenAccent[600]
            }
            borderRadius="4px"
          >
            {type === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {type === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {type}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        const { id, type } = params.row;
        
        if (type !== "admin") {
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
        return null;
      },
    }
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   renderCell: (params) => {
    //     const { id } = params.row;
    //     return (
    //       <div>
    //         <IconButton
    //           onClick={() => handleViewRow(id)}
    //           size="small"
    //           color="inherit"
    //         >
    //           <VisibilityIcon />
    //         </IconButton>
    //         <IconButton
    //           onClick={() => handleEditRow(id)}
    //           size="small"
    //           style={{ color: '#FFD700' }}
    //         >
    //           <EditIcon />
    //         </IconButton>
    //         <IconButton
    //           onClick={() => handleDeleteRow(id)}
    //           size="small"
    //           color="error"
    //         >
    //           <DeleteIcon />
    //         </IconButton>
    //       </div>
    //     );
    //   }
    // },
  ];

  return (
    <Box m="20px" width="100%">
      <Header title="TÀI KHOẢN" subtitle="Quản lý tài khoản" />
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
          rows={users}
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

export default Account;
