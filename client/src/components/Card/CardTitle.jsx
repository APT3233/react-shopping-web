import { Typography, Box } from "@mui/material";

const CardTitle = ({ title }) => {
  return (
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
      <Box
        sx={{
          height: "4px", 
          backgroundColor: "#2A3A4A", 
          width: "10%",
          mx: "auto", 
        }}
      />
    </Box>
  );
};

export default CardTitle;