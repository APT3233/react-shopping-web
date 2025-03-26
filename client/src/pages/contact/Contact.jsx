import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
  Avatar,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Spin } from "antd";
import { sendFeedBack } from "../../utils/security";
import "animate.css";
import AnimatedWrapper from "../../components/ui/animation"; // Import the AnimatedWrapper component
import { noop } from "antd/es/_util/warning";

// Styled Components remain the same
const StyledPaper = styled(Paper)(() => ({
  padding: "2rem",
  height: "100%",
  background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledTitle = styled(Typography)(() => ({
  textAlign: "center",
  fontFamily: "Playfair Display, serif",
  fontSize: "2.5rem",
  fontWeight: 700,
  color: "#2196F3",
  marginBottom: "2rem",
}));

const TeamMemberCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
}));

const ContactCart = ({ teamMembers }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const resp = await sendFeedBack(
          formData.fullName,
          formData.email,
          formData.phone,
          formData.message
        );
        if (resp.success) {
          setSnackbar({
            open: true,
            message: "Message sent successfully!",
            severity: "success",
          });
          setFormData({ fullName: "", email: "", phone: "", message: "" });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to send message. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Introduce team */}
      <AnimatedWrapper aosAnimation="fade-up" aosDuration={1000} aosDelay={200}>
        <StyledTitle>Meet Our Expert Team</StyledTitle>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AnimatedWrapper
                aosAnimation="fade-up"
                aosDuration={1000}
                aosDelay={index * 200}
              >
                <TeamMemberCard>
                  <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <Avatar
                      src={member.avatar}
                      sx={{
                        width: 140,
                        height: 140,
                        margin: "0 auto 1.5rem auto",
                        border: "4px solid white",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      sx={{ fontWeight: 500 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography
                      variant="subtitle3"
                      color="secondary2"
                      sx={{ textDecoration: "none" }}
                      component="a"
                      href={member.link}
                      target="_blank"
                      rel="nopener noreferrer"
                    >
                      view{" "}
                    </Typography>
                  </CardContent>
                </TeamMemberCard>
              </AnimatedWrapper>
            </Grid>
          ))}
        </Grid>
      </AnimatedWrapper>

      {/* form Contact */}
      <AnimatedWrapper aosAnimation="zoom-in" aosDuration={1000} aosDelay={300}>
        <StyledTitle style={{ color: "#202738", marginTop: "50px" }}>
          Thanks for using!
        </StyledTitle>
      </AnimatedWrapper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <AnimatedWrapper
            aosAnimation="fade-right"
            aosDuration={1000}
            aosDelay={300}
          >
            <StyledPaper>
              <Typography
                variant="h4"
                gutterBottom
                color="primary"
                style={{ color: "#202738" }}
              >
                Our Office
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                  alt="Office Interior"
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    mb: 2,
                  }}
                />
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2"
                  alt="Meeting Room"
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </StyledPaper>
          </AnimatedWrapper>
        </Grid>

        <Grid item xs={12} md={7}>
          <AnimatedWrapper
            aosAnimation="fade-left"
            aosDuration={1000}
            aosDelay={300}
          >
            <StyledPaper component="form" onSubmit={handleSubmit}>
              <Typography
                variant="h4"
                gutterBottom
                color="primary"
                style={{ color: "#202738" }}
              >
                Send Us a Message
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{ height: "50px", backgroundColor: "#202738" }}
                  >
                    {loading ? <Spin /> : "Send Message"}
                  </Button>
                </Grid>
              </Grid>
            </StyledPaper>
          </AnimatedWrapper>
        </Grid>
      </Grid>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 10 }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactCart;
