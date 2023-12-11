import { Box, IconButton, Modal, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { products as mockProducts, updateProducts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import React, { useState, useEffect } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactDOM from 'react-dom';
import '../../styles/products.scss';
import axios from "../../../api/axios";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState(mockProducts);
  const [open, setOpen] = useState(false);
  const [editedRows, setEditedRows] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  // const [imageUrl, setImageUrl] = useState('');
  let imageUrl;

  useEffect(() => {
    axios.post("/api/get-categories")
      .then(
        (response) => {
          setCategories(response.data);
        })
      .catch(function (error) {
        console.log(error.message);
      });

    axios.post("/api/get-brands")
      .then(
        (response) => {
          setBrands(response.data);
        })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const handleImageUpload = async() => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    await axios.post("/upload-img-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-rapidapi-host": "file-upload8.p.rapidapi.com",
        "x-rapidapi-key": "your-rapidapi-key-here",
      },
    })
      .then((response) => {
        console.log(response);
        imageUrl = response.data.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = async(e) => {
    setSelectedImage(e.target.files[0]);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios.post("/upload-img-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-rapidapi-host": "file-upload8.p.rapidapi.com",
        "x-rapidapi-key": "your-rapidapi-key-here",
      },
    })
      .then((response) => {
        console.log(response);
        handleEditField('image', response.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditRow = (rowId) => {
    console.log('Edit row:', rowId);
    handleEditField('id', rowId);
    setSelectedRow(rowId);
    setOpen(true);
  };

  const handleEditField = (field, value) => {
    setEditedRows((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeCategory = (e) =>{
    handleEditField('category_name', e.target.value);
    handleEditField('category_id',e.target.options[e.target.selectedIndex].getAttribute('data-key'));
  }

  const handleChangeBrand = (e) =>{
    handleEditField('brand_name', e.target.value);
    handleEditField('brand_id',e.target.options[e.target.selectedIndex].getAttribute('data-key'));
  }

  const handleSave = async() => {
    console.log(editedRows);
    
    const { category_name, brand_name, ...data } = editedRows;

    axios.post("/api/update-product", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });





    // Implement your save logic using editedRows
    const updatedRows = rows.map((row) => {
      if (row.id === selectedRow) {
        return { ...row, ...editedRows };
      }
      return row;
    });

    // Update the state with the new rows
    setRows(updatedRows);

    // Update the columns with the edited values
    const updatedColumns = columns.map((column) => {
      if (column.field in editedRows) {
        return { ...column, valueGetter: (params) => params.row[column.field] };
      }
      return column;
    });

    // Reset edited rows after saving
    setEditedRows({});
    handleClose();
  };
  const handleCancelEdit = () => {
    setEditedRows({});
    handleClose();
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
            <IconButton
              onClick={() => handleEditRow(id)}
              size="small"
              style={{ color: '#FFD700' }}
            >
              <EditIcon />
            </IconButton>
          </div>
        );
      }
    },
  ];

  const renderEditPanel = () => {
    const selectedProduct = rows.find((row) => row.id === selectedRow);

    return (
      <Box
        sx={{
          position: 'absolute',
          width: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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

        <div className="edit-panel container">
          <div className="row">
            <div className="edit-panel__field col-md-6">
              <label>Hình ảnh:</label>
              <img src={selectedProduct.image} alt="Hình ảnh" style={{ width: '70%', height: 'auto', objectFit: 'cover' }} />
            </div>

            <div className="col-md-6">
              <div className="edit-panel__field">
                <label >Tên sản phẩm:</label>
                <input
                  type="text"
                  value={editedRows.name || selectedProduct.name}
                  onChange={(e) => handleEditField('name', e.target.value)}
                  style={{ fontSize: '14px', padding: '5px', width: '250px' }}
                />
              </div>

              <div className="edit-panel__field">
                <label>Tên loại sản phẩm:</label>
                <select id="categories" name="categories" style={{ fontSize: '14px', padding: '5px', width: '250px' }}
                value={editedRows.category_name || selectedProduct.category_name}
                onChange={handleChangeCategory}>
                  {categories.map((category) => (
                    <option data-key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="edit-panel__field">
                <label>Tên thương hiệu:</label>
                <select id="brands" name="brands" style={{ fontSize: '14px', padding: '5px', width: '250px' }}
                value={editedRows.brand_name || selectedProduct.brand_name}
                onChange={(e) => handleChangeBrand(e)}>
                  {brands.map((brand) => (
                    <option data-key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>

              <div className="edit-panel__field">
                <label>Đơn giá:</label>
                <input
                  style={{ fontSize: '14px', padding: '5px', width: '250px' }}
                  type="number"
                  value={editedRows.price !== undefined ? editedRows.price : selectedProduct.price}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleEditField('price', newValue);
                  }}
                />
              </div>

              <div className="edit-panel__field">
                <label>Số lượng đã bán:</label>
                <input
                  style={{ fontSize: '14px', padding: '5px', width: '250px' }}
                  type="number"
                  value={editedRows.quantity_sold !== undefined ? editedRows.quantity_sold : selectedProduct.quantity_sold}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleEditField('quantity_sold', newValue);
                  }}
                />
              </div>

              <div className="edit-panel__field">
                <label>Chọn hình ảnh:</label>
                <form onSubmit={handleImageUpload} encType="multipart/form-data">
                  <input type="file" accept="image/*" style={{ color: 'black' }} onChange={handleImageChange} />
                  {/* <button type="submit">Upload</button> */}
                </form>
              </div>

            </div>
          </div>


          <div className="edit-panel__buttons">
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '15px', marginTop: '16px' }}>
              Lưu
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelEdit} style={{ marginTop: '16px' }}>
              Hủy
            </Button>
          </div>
        </div>
      </Box>
    );
  };
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

      {selectedRow &&
        <Modal open={open} onClose={handleClose}>
          {renderEditPanel()}
        </Modal>
      }
    </Box>
  );
};

export default Products;
