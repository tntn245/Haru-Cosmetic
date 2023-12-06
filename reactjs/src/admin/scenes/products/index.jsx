import { Box, IconButton  } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { products,updateProducts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import React, { useState } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactDOM from 'react-dom';

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState(products);

  const handleDeleteRow = (rowId) => {
    // Thực hiện xóa các hàng đã chọn
    console.log("Delete rows:", rowId);
    const updatedRows = products.filter((row) => row.id !== rowId);
    setRows(updatedRows);
  };
  
  const handleEditRow = (rowId) => {
    // Handle edit logic for the selected row
    console.log('Edit row:', rowId);
  };

  const handleViewRow = (rowId) => {
    // Handle view logic for the selected row
    console.log('View row:', rowId);
    setSelectedRow(rowId);
  };

  const handleSelectionModelChange = (newRowSelectionModel) =>{
    setRowSelectionModel(newRowSelectionModel);
  };
  const ViewRowDetails = () => {
    // Render the detailed view component using Portal
    return ReactDOM.createPortal(
      <div>
        <h2>Row Details</h2>
        {/* Add your custom layout for the detailed view */}
        <p>Selected row: {selectedRow}</p>
        <button>Close</button>
      </div>,
      document.body // Render the component outside the main DOM tree
    );
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
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: (params) => {
    //     const { id } = params.row;
    //     const isSelected = rowSelectionModel.includes(id);
    //     return (
    //       <IconButton
    //         onClick={() => handleDeleteRows(id)}
    //         size="small"
    //         color="error"
    //         disabled={!isSelected}
    //       >
    //         <DeleteIcon />
    //       </IconButton>
    //     );
    //     }
    // },
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
      {selectedRow && <ViewRowDetails />}
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
          // checkboxSelection 
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
      <div>
        Selected Row(s): {rowSelectionModel.map((row) => row)}
      </div>
    </Box>
      //   <div>
      //   {selectedRow && <ViewRowDetails />}
      //   <div style={{ height: 400, width: '100%' }}>
      //     <DataGrid rows={products} columns={columns} />
      //   </div>
      // </div>
  );
};

export default Products;
