import { Box, Grid, Typography } from "@mui/material";
import FastDeliveryIcon from "@mui/icons-material/LocalShipping";
import MoneyGuaranteeIcon from "@mui/icons-material/Money";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import PaymentIcon from "@mui/icons-material/Payment";

const Feauter_1 = () => {
  return (
    <Box sx={{ bgcolor: "#ffffff", padding: 3, margin: "20px 0", borderRadius: "20px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} md={6} lg={3} textAlign="center">
          <FastDeliveryIcon fontSize="large" />
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1.25rem", md: "1.5rem" }, // Giảm từ 1rem xuống 0.875rem trên xs
            }}
          >
            Fast Delivery
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.625rem", sm: "0.875rem", md: "1rem" }, // Giảm từ 0.75rem xuống 0.625rem trên xs
            }}
          >
            Start from $10
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={3} textAlign="center">
          <MoneyGuaranteeIcon fontSize="large" />
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            Money Guarantee
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.625rem", sm: "0.875rem", md: "1rem" },
            }}
          >
            7 Days Back
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={3} textAlign="center">
          <TimelapseIcon fontSize="large" />
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            365 Days
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.625rem", sm: "0.875rem", md: "1rem" },
            }}
          >
            For free return
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={3} textAlign="center">
          <PaymentIcon fontSize="large" />
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            Payment
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.625rem", sm: "0.875rem", md: "1rem" },
            }}
          >
            Secure system
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Feauter_1;