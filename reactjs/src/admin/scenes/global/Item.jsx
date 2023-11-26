/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const handleClick = () => {
        const navigate = useNavigate();
        setSelected(title);
        navigate("/login");
    }
    return (
        <>
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => handleClick()}
            icon={icon}>
            <Typography>{title}</Typography>
            {/* <Link to={to} /> */}
        </MenuItem>
        </>
    );
}

export default Item