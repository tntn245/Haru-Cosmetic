import { Box, Typography, useTheme, Modal, IconButton, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
// import { orders } from "../../data/mockData";
import Header from "../../components/Header";
import React, { useState, useEffect, useContext } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, Table } from 'react-bootstrap';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ShopContext } from '../../../components/shopcontext'
import axios from "../../../api/axios";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [selectedEditRow, setSelectedEditRow] = useState(null);
  const [selectedViewRow, setSelectedViewRow] = useState(null);
  // const [editedRows, setEditedRows] = useState({});
  const [openEditPanel, setOpenEditPanel] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [openViewPanel, setOpenViewPanel] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const shopcontext = useContext(ShopContext);


  useEffect(() => {
    axios.post("/api/get-orders")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, [])

  // const handleDeleteRow = (id) => {
  //   console.log("Delete rows:", id);

  //   axios.post("/api/delete-product", { id })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });

  //   const updatedRows = rows.filter((row) => row.id !== id);
  //   setRows(updatedRows);
  // };

  const handleClose = () => {
    setOpenEditPanel(false);
    setOpenViewPanel(false);
  };

  const handleSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  //dropdown edit status
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedEditRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    //setSelectedEditRow(null);
  };

  const handleOptionClick = (option) => {
    console.log(`Option "${option}" selected for row ID ${selectedEditRow.id}`);
    var status = option;
    var paymentStatus = selectedEditRow.payment_status

    if (option != "Đã giao") {
      if (option === "Duyệt đơn")
        status = "Đã duyệt"
      else if (option === "Hủy đơn")
        status = "Đã hủy"

      shopcontext.updateOrderStatus(selectedEditRow.id, status)
      shopcontext.updateDeliveredDate(selectedEditRow.id, "")
      if(selectedEditRow.payment_method === "COD"){
        shopcontext.updatePaymentStatus(selectedEditRow.id, "Chưa thanh toán")
        paymentStatus = "Chưa thanh toán"
      }

      const updatedRows = rows.map((row) => {
        if (row.id === selectedEditRow.id) {
          return { ...row, order_status: status, delivered_date: "", payment_status: paymentStatus };
        }
        return row;
      });
      setRows(updatedRows);
      handleMenuClose();
    }
    else {
      handleMenuClose();
      //setSelectedEditRow(selectedEditRow.id);
      setOpenEditPanel(true);
    }
  };
  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSaveDeliveredDate = () => {
    console.log('Ngày đã chọn:', selectedDate, " ",selectedEditRow.id);
    setOpenEditPanel(false);

    shopcontext.updateOrderStatus(selectedEditRow.id, "Đã giao")
    shopcontext.updateDeliveredDate(selectedEditRow.id, selectedDate)
    shopcontext.updatePaymentStatus(selectedEditRow.id, "Đã thanh toán")

      const updatedRows = rows.map((row) => {
        if (row.id === selectedEditRow.id) {
          return { ...row, order_status: "Đã giao", delivered_date: selectedDate, payment_status: "Đã thanh toán" };
        }
        return row;
      });
      setRows(updatedRows);
  }

  const columns = [
    { field: "id", 
      headerName: "ID" ,
      flex: 0.5,
    },
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
      field: "created_date",
      headerName: "Ngày đặt",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "delivered_date",
      headerName: "Ngày giao",
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
      headerName: "",
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
            {/* <IconButton
              onClick={() => handleEditRow(id)}
              size="small"
              style={{ color: '#FFD700' }}
            >
              <EditIcon />
            </IconButton> */}
            <IconButton aria-controls="menu" aria-haspopup="true" onClick={(event) => handleMenuOpen(event, params.row)}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleOptionClick('Hủy đơn')}>Hủy đơn</MenuItem>
              <MenuItem onClick={() => handleOptionClick('Duyệt đơn')}>Duyệt đơn</MenuItem>
              <MenuItem onClick={() => handleOptionClick('Đang vận chuyển')}>Đang vận chuyển</MenuItem>
              <MenuItem onClick={() => handleOptionClick('Đã giao')}>Đã giao</MenuItem>
            </Menu>
          </div>
        );
      }
    },
  ];

  // const handleEditField = (field, value) => {
  //   setEditedRows((prev) => ({ ...prev, [field]: value }));
  // };

  // const handleEditRow = (orderID) => {
  //   console.log('Edit row:', orderID);
  //   handleEditField('id', orderID);
  //   setSelectedEditRow(orderID);
  //   setOpenEditPanel(true);
  // };

  const handleViewRow = (orderID) => {
    console.log('View row:', orderID);
    setSelectedViewRow(orderID);
    axios.post("/api/get-user-orders-details", { orderID })
      .then(
        (response) => {
          setOrderDetails(response.data);
        })
      .catch(function (error) {
        console.log('Error', error.message);
      })
    setOpenViewPanel(true);
  };

  const renderEditPanel = () => {
    const selectedProduct = rows.find((row) => row.id === selectedEditRow);
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
          <div>
            <label>Chọn ngày giao hàng:</label>
            <div style={{}}>
            <input type="date" id="birthday" name="delivered_date"
              value={selectedDate}
              onChange={handleDateChange} style={{border: '1px solid #000', width: '100%'}}/>
              </div>
          </div>

          <div className="edit-panel__buttons">
            <Button variant="contained" color="primary" onClick={handleSaveDeliveredDate} style={{ marginRight: '15px', marginTop: '16px' }}>
              Lưu
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose} style={{ marginTop: '16px' }}>
              Hủy
            </Button>
          </div>
        </div>
      </Box>
    );
  };

  const renderViewPanel = () => {
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
            <div className="row" style={{ flexDirection: 'row', margin: '10px', color: '#000' }}>
              <div className="col-3" style={{ placeSelf: 'center' }}></div>
              <div className="col-3" style={{ placeSelf: 'center' }}><b>Tên sản phẩm</b></div>
              <div className="col-3" style={{ placeSelf: 'center' }}><b>Đơn giá x SL</b></div>
              <div className="col-3" style={{ placeSelf: 'center' }}><b>Tổng</b></div>
            </div>
          {orderDetails.map((item) => (
            <div className="row card" key={item.product_id} style={{ flexDirection: 'row', margin: '10px', color: '#000' }}>
              <div className="col-3" style={{ textAlign: 'center' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', marginRight: '20px' }}
                />
              </div>
              <div className="col-3" style={{ placeSelf: 'center' }}>{item.name}</div>
              <div className="col-3" style={{ placeSelf: 'center' }}>
                <div>{item.price} x{item.quantity}</div>
              </div>
              <div className="col-3" style={{ placeSelf: 'center' }}>{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
      </Box>
    );
  };

  return (
    <Box m="20px" width="100%">
      <Header title="ĐƠN HÀNG" subtitle="Quản lý đơn hàng" />
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
          disableRowSelectionOnClick
          checkboxSelection
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            handleSelectionModelChange(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>

      {selectedEditRow &&
        <Modal open={openEditPanel} onClose={handleClose}>
          {renderEditPanel()}
        </Modal>
      }

      {selectedViewRow &&
        <Modal open={openViewPanel} onClose={handleClose}>
          {renderViewPanel()}
        </Modal>
      }
    </Box>
  );
};

export default Orders;
