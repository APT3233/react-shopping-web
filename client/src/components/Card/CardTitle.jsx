import { Typography, Box } from "@mui/material";
import AnimatedWrapper from "../ui/animation"

// eslint-disable-next-line react/prop-types
const CardTitle = ({ title }) => {
  return (
    <AnimatedWrapper 
      aosAnimation="fade-up" 
      aosDuration={1000} 
      aosDelay={100}
    >
      <Box sx={{ textAlign: "center", mb: 2, margin: "30px 0 0 0" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: "1.8rem",
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <AnimatedWrapper 
          aosAnimation="zoom-in" 
          aosDuration={800} 
          aosDelay={300}
        >
          <Box
            sx={{
              height: "4px", 
              backgroundColor: "#2A3A4A", 
              width: "10%",
              mx: "auto", 
            }}
          />
        </AnimatedWrapper>
      </Box>
    </AnimatedWrapper>
  );
};

export default CardTitle;