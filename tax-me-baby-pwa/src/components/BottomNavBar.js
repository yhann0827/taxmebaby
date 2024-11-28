import React, { useState, useEffect } from "react";
import { Paper, BottomNavigationAction, useTheme, BottomNavigation } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../App";

const BottomNavbar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const theme = useTheme();

  useEffect(() => {
    switch (pathname) {
      case routes.HOME:
        setValue(0);
        break;
      case routes.PERSONAL_CARDS:
        setValue(1);
        break;
      case routes.STORES:
        setValue(2);
        break;
      case routes.ACTIVITIES:
        setValue(3);
        break;
      default:
        setValue(0);
    }
  }, [pathname]);

  return (
    <Paper sx={{ position: "fixed", width: "inherit", bottom: 0, height: "50px", zIndex: theme.zIndex.appBar }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          switch (newValue) {
            case 0:
              navigate(routes.HOME);
              break;
            case 1:
              navigate(routes.PERSONAL_CARDS);
              break;
            case 2:
              navigate(routes.STORES);
              break;
            case 3:
              navigate(routes.ACTIVITIES);
              break;
            default:
              navigate(routes.HOME);
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<i className="fak fa-customhome" style={{ fontSize: "20px" }}></i>} />
        <BottomNavigationAction label="Planning" icon={<i className="fak fa-customscan" style={{ fontSize: "20px" }}></i>} />
        <BottomNavigationAction label="Invoice" icon={<i className="fak fa-customstore" style={{ fontSize: "20px" }}></i>} />
        <BottomNavigationAction label="Account" icon={<i className="fak fa-customactivity" style={{ fontSize: "20px" }}></i>} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;