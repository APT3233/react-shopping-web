import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
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

const Contact = () => {
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
        setSnackbar({
          open: true,
          message: "Message sent successfully!",
          severity: "success",
        });
        setFormData({ fullName: "", email: "", phone: "", message: "" });
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
      <StyledTitle style={{ color: "#202738" }}>Thanks for using!</StyledTitle>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <StyledPaper>
            <Typography
              variant="h4"
              gutterBottom
              color="primary"
              style={{ color: "#202738" }}
            >
              Our Office
            </Typography>
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
        </Grid>

        <Grid item xs={12} md={7}>
          <StyledPaper component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              gutterBottom
              color="primary"
              style={{ color: "#202738" }}
            >
              Send Us a Message
            </Typography>
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
                  background="#202738"
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ height: "50px", backgroundColor: "#202738" }}
                >
                  {loading ? <CircularProgress size={24} /> : "Send Message"}
                </Button>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
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

export default Contact;
