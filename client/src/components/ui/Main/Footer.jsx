import { useState } from "react";
import { Box, Container, Grid, Typography, IconButton, Switch, Tooltip, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { NavLink } from "react-router-dom";

const StyledFooter = styled(Box)(({ theme, darkMode }) => ({
  background: darkMode
    ? "rgb(34, 41, 53)"
    : "linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)",
  padding: theme.spacing(6, 0),
  color: darkMode ? "#fff" : "#333",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  position: "relative",
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #ff4081 0%, #7c4dff 100%)"
  }
}));

const SocialButton = styled(IconButton)(({ theme, darkMode }) => ({
  margin: theme.spacing(0, 1),
  color: darkMode ? "#fff" : "#333",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    color: "#7c4dff"
  },
  "&:focus": {
    outline: "2px solid #7c4dff",
    outlineOffset: "2px"
  }
}));

const FooterLink = styled(NavLink)(({ theme, darkMode }) => ({
  color: darkMode ? "#fff" : "#333",
  textDecoration: "none",
  transition: "color 0.2s ease",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -2,
    left: 0,
    width: 0,
    height: "2px",
    background: "#7c4dff",
    transition: "width 0.3s ease"
  },
  "&:hover::after": {
    width: "100%"
  },
  "&:hover": {
    color: "#7c4dff"
  }
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "translateX(5px)"
  }
}));

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <StyledFooter darkMode={darkMode}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We are dedicated to providing innovative solutions and exceptional services to our valued customers worldwide.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Hack Mode
              </Typography>
              <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                color="primary"
                inputProps={{ "aria-label": "toggle dark mode" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FooterLink to="/" darkMode={darkMode}>Home</FooterLink>
              <FooterLink to="/product" darkMode={darkMode}>Product</FooterLink>
              <FooterLink to="/cart" darkMode={darkMode}>Cart</FooterLink>
              <FooterLink to="/contact" darkMode={darkMode}>Contact</FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Info
            </Typography>
            <ContactItem>
              <MdLocationOn style={{ marginRight: "8px" }} />
              <Typography variant="body2">Sihanoukville, Campuchia</Typography>
            </ContactItem>
            <ContactItem>
              <MdPhone style={{ marginRight: "8px" }} />
              <Typography variant="body2">+84 86 2433 237</Typography>
            </ContactItem>
            <ContactItem>
              <MdEmail style={{ marginRight: "8px" }} />
              <Typography variant="body2">anhnkde180030@thankyou.com</Typography>
            </ContactItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Follow Us
            </Typography>
            <Box>
              <Tooltip title="Facebook" arrow>
                <SocialButton aria-label="facebook" darkMode={darkMode} target="_blank" href="https://www.facebook.com">
                  <FaFacebook />
                </SocialButton>
              </Tooltip>
              <Tooltip title="Twitter" arrow>
                <SocialButton aria-label="twitter" darkMode={darkMode} target="_blank" href="https://www.twitter.com">
                  <FaTwitter />
                </SocialButton>
              </Tooltip>
              <Tooltip title="Instagram" arrow>
                <SocialButton aria-label="instagram" darkMode={darkMode} target="_blank" href="https://www.instagram.com">
                  <FaInstagram />
                </SocialButton>
              </Tooltip>
              <Tooltip title="View Project Github" arrow>
                <SocialButton aria-label="github" darkMode={darkMode} href="https://github.com/ahihi/chua_show_duoc" target="_blank">
                  <FaGithub />
                </SocialButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid", borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Group of Hacker. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;