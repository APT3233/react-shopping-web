import Marquee from "react-fast-marquee";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled, keyframes } from "@mui/system";
import { Grid, Typography, useTheme } from "@mui/material";

// Định nghĩa keyframes cho animation
const animation1uyuer8 = keyframes`
  0% {
    color: #ffffff;
  }
  50% {
    color: #ff0000;
  }
  100% {
    color: #ffffff;
  }
`;

const StyledMarquee = styled(Marquee)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#202738",
  color: "#ffffff",
  fontSize: "2.5rem",
  fontWeight: "bold",
  padding: "10px 0",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",

  // Điều chỉnh cho mobile
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const MarqueeAnimation = ({ title, desc }) => {
  const theme = useTheme();

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} lg={4}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: "1.8rem",
            fontWeight: "700",
            gap: "20px",
            animation: `${animation1uyuer8} 10s linear 1s infinite normal none running`,

            [theme.breakpoints.down("sm")]: {
              fontSize: "1.5rem",
            },
          }}
        >
          <NotificationsIcon sx={{ fontSize: "2.5rem" }} />
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={8}>
        <StyledMarquee gradient={false} speed={80} direction="left">
          {desc.map((line, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: line }}
              style={{ whiteSpace: "pre-wrap" }}
            ></div>
          ))}
        </StyledMarquee>
      </Grid>
    </Grid>
  );
};

export default MarqueeAnimation;
