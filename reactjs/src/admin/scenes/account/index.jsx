import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
// import { users, updateUsers } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect} from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "../../../api/axios";

const Account = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.post("/api/get-users")
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      throw error;
    });
  }, []);

  const handleDeleteRow = (id) => {
    console.log("Delete rows:", id);
    const updatedRows = users.filter((row) => row.id !== id);
    setUsers(updatedRows);

    axios.post("/api/delete-user", {id})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw error;
    });
  };
  
  const handleEditRow = (id) => {
    console.log('Edit row:', id);
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
    // {
    //   field: "actions",
    //   headerName: "",
    //   renderCell: (params) => {
    //     const { id, type } = params.row;
        
    //     if (type !== "admin") {
    //       return (
    //         <div>
    //           <IconButton
    //             onClick={() => handleEditRow(id)}
    //             size="small">
    //             <VisibilityIcon />
    //           </IconButton>
    //         </div>
    //       );
    //     }
    //     return null;
    //   },
    // }
  ];

  return (
    <Box m="20px" width="100%">
      <Header title="TÀI KHOẢN" subtitle="Quản lý tài khoản" />
      <Box
        m="40px 0 0 0"
        height="80vh"
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
          checkboxSelection
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
