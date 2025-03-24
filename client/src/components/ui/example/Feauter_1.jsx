import { Box, Grid, Typography } from "@mui/material";
import FastDeliveryIcon from "@mui/icons-material/LocalShipping";
import MoneyGuaranteeIcon from "@mui/icons-material/Money";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import PaymentIcon from "@mui/icons-material/Payment";
import AnimatedWrapper from "../../ui/animation"; // Điều chỉnh đường dẫn đến index.jsx

const Feauter_1 = () => {
  const features = [
    {
      icon: <FastDeliveryIcon fontSize="large" />,
      title: "Fast Delivery",
      description: "Start from $10"
    },
    {
      icon: <MoneyGuaranteeIcon fontSize="large" />,
      title: "Money Guarantee",
      description: "7 Days Back"
    },
    {
      icon: <TimelapseIcon fontSize="large" />,
      title: "365 Days",
      description: "For free return"
    },
    {
      icon: <PaymentIcon fontSize="large" />,
      title: "Payment",
      description: "Secure system"
    }
  ];

  return (
    <AnimatedWrapper aosAnimation="fade-up" aosDuration={800}>
      <Box sx={{ bgcolor: "#ffffff", padding: 3, margin: "20px 0", borderRadius: "20px" }}>
        <Grid container spacing={2} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={6} md={6} lg={3} textAlign="center" key={index}>
              <AnimatedWrapper
                aosAnimation="zoom-in"
                aosDelay={index * 100}
                aosDuration={600}
              >
                {feature.icon}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1.25rem", md: "1.5rem" },
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.625rem", sm: "0.875rem", md: "1rem" },
                  }}
                >
                  {feature.description}
                </Typography>
              </AnimatedWrapper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AnimatedWrapper>
  );
};

export default Feauter_1;