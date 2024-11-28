import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      <Box
        sx={{
          paddingTop: "16px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <Typography variant="h6">Dashboard</Typography>
      </Box>
      <Card sx={{ backgroundColor: "#86945E", margin: "16px", borderRadius: "10px" }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" gutterBottom color="white">
              Hi, Jacky!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
              <Typography color="white">Taxable Income:</Typography>
              <Typography color="white">RM 55,000</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                color: "#red",
                borderRadius: "10px",
                px: 1,
                py: 0.5,
              }}
            >
              <Typography variant="body2">Category D</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Typography sx={{ marginLeft: "16px" }} variant="h6" gutterBottom>
        Total Income
      </Typography>
    </Box>
  );
};

export default Dashboard;
