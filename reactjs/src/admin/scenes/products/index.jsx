import { Box, IconButton, Modal, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { products, updateProducts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactDOM from 'react-dom';
import '../../styles/products.scss';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState(products);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditRow = (rowId) => {
    console.log('Edit row:', rowId);
  };

  const handleViewRow = (rowId) => {
    console.log('View row:', rowId);
    setSelectedRow(rowId);
    setOpen(true);
  };

  const handleSave = () => {
  };

  const handleSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "image",
      headerName: "Hình ảnh",
      flex: 1,
      renderCell: (params) => (
        <img src={params.value} alt="Hình ảnh" style={{ width: "50%", height: "auto", objectFit: "cover", padding: "5px" }} />
      ),
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category_name",
      headerName: "Tên loại sản phẩm",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "brand_name",
      headerName: "Tên thương hiệu",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Đơn giá",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "quantity_sold",
      headerName: "Số lượng đã bán",
      flex: 1,
    },
    {
      field: "star",
      headerName: "Đánh giá",
      flex: 1,
      renderCell: ({ row: { star } }) => {
        return (
          <ReactStars
            count={5}
            value={star}
            size={24}
            color1="#CCCCCC"
            color2="#FFD700"
            edit={false}
          />
        );
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <div>
            {/* <IconButton
              onClick={() => handleViewRow(id)}
              size="small"
              color="inherit"
            >
              <VisibilityIcon />
            </IconButton> */}
            <IconButton
              onClick={() => handleEditRow(id)}
              size="small"
              style={{ color: '#FFD700' }}
            >
              <EditIcon />
            </IconButton>
            {/* <IconButton
              onClick={() => handleDeleteRow(id)}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton> */}
          </div>
        );
      }
    },
  ];

  return (
    <Box m="20px" width="100%">
      <Header
        title="SẢN PHẨM"
        subtitle="Quản lý sản phẩm"
      />
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
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            handleSelectionModelChange(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
            onClick={handleClose}
            style={{ color: '#D80032' }}
          >
            <CloseIcon />
          </IconButton>
          <p>Nội dung của panel...</p>
          <p>Nội dung của panel...</p>
          <p>Nội dung của panel...</p>
          <p>Nội dung của panel...</p>
          <p>Nội dung của panel...</p>
          <Button onClick={handleSave}>Lưu</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Products;
