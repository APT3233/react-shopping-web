import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Chip,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { FaEdit, FaSearch, FaSave, FaTimes } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import instance from "../../utils/customizeAxios";
import AnimatedWrapper from "../../components/ui/animation"; // Đảm bảo đường dẫn đúng tới file AnimatedWrapper

const StyledAvatar = styled(Avatar)(() => ({
  width: 180,
  height: 180,
  cursor: "pointer",
  margin: "0 auto",
  border: "6px solid #fff",
  boxShadow: "0 0 25px rgba(0,0,0,0.15)",
  transition: "all 0.4s ease",
  "&:hover": {
    transform: "scale(1.08)",
    boxShadow: "0 0 35px rgba(0,0,0,0.2)",
  },
}));

const StyledCard = styled(Card)({
  marginBottom: 20,
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  borderRadius: "16px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});

const StyledChip = styled(Chip)({
  borderRadius: "12px",
  fontWeight: "bold",
  padding: "8px",
  fontSize: "0.9rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

const UserProfile = ({ userEmail }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    avatar: "",
  });
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStats, setOrderStats] = useState({
    total: 0,
    paid: 0,
    unpaid: 0,
  });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const pieData = [
    { name: "Paid", value: orderStats.paid },
    { name: "Unpaid", value: orderStats.unpaid },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === "all" || order.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = order.product
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    return matchesFilter && matchesSearch;
  });

  const COLORS = ["#4CAF50", "#f44336"];
  const [avatarFile, setAvatarFile] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    if (!userEmail) return;

    setIsLoading(true);
    instance
      .get(`/api/user/profile?email=${userEmail}`)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setFormData(data.dataUser);
          setOrderStats(data.orderStats);

          // Đảm bảo format dữ liệu orders nhất quán
          const formattedOrders = data.orders.map((order) => ({
            id: order.id,
            product: order.product,
            quantity: order.numberBuy,
            price: order.price,
            date: new Date(order.date).toISOString().split("T")[0],
            status: order.status,
          }));

          setOrders(formattedOrders);
        } else {
          throw new Error(data.error || "Failed to load user data");
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setError(err.response?.data?.error || err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userEmail]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        setAvatarFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const profileData = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      dob: formData.dob,
      avatar: formData.avatar,
    };

    instance
      .post("/api/user/profile/update", profileData)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setNotification({
            open: true,
            message: "Profile updated successfully!",
            severity: "success",
          });
          setIsEditMode(false);
        } else {
          throw new Error(data.error || "Failed to update profile");
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setNotification({
          open: true,
          message: `Error: ${err.response?.data?.error || err.message}`,
          severity: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (isLoading && !formData.email) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
          <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
            Loading profile data...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error && !formData.email) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">Failed to load profile: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <AnimatedWrapper
            aosAnimation="fade-right"
            aosDuration={1200}
            aosDelay={100}
          >
            <StyledCard
              sx={{
                background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
                position: "relative",
                overflow: "visible",
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                  pb: 4,
                }}
              >
                <AnimatedWrapper
                  aosAnimation="zoom-in"
                  aosDuration={1000}
                  aosDelay={300}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      mb: 4,
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload">
                      <StyledAvatar src={formData.avatar} alt={formData.name} />
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: 5,
                          right: 5,
                          backgroundColor: "primary.main",
                          padding: "12px",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                            transform: "scale(1.1)",
                          },
                        }}
                        size="large"
                      >
                        <MdCloudUpload
                          style={{ color: "#fff", fontSize: "24px" }}
                        />
                      </IconButton>
                    </label>
                  </Box>
                </AnimatedWrapper>

                <Box sx={{ mt: 2 }}>
                  {!isEditMode ? (
                    <AnimatedWrapper
                      aosAnimation="fade-up"
                      aosDuration={800}
                      aosDelay={400}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.8)",
                        }}
                      >
                        <Typography
                          variant="h4"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            backgroundImage:
                              "linear-gradient(45deg, #2196F3, #3f51b5)",
                            backgroundClip: "text",
                            textFillColor: "transparent",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {formData.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{ fontSize: "1.1rem", mb: 1 }}
                        >
                          {formData.email}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{ fontSize: "1.1rem", mb: 1 }}
                        >
                          {formData.phone}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{ fontSize: "1.1rem", mb: 2 }}
                        >
                          {formData.dob}
                        </Typography>
                        <Button
                          startIcon={<FaEdit />}
                          variant="contained"
                          sx={{
                            mt: 2,
                            backgroundColor: "rgb(32, 39, 56)",
                            color: "#fff",
                            borderRadius: "12px",
                            padding: "12px 24px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            textTransform: "none",
                            boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)",
                          }}
                          onClick={() => setIsEditMode(true)}
                        >
                          Edit Profile
                        </Button>
                      </Box>
                    </AnimatedWrapper>
                  ) : (
                    <AnimatedWrapper
                      animation="fadeIn"
                      duration="0.5s"
                    >
                      <Box>
                        <TextField
                          fullWidth
                          label="Name"
                          value={formData.name || ""}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          value={formData.email || ""}
                          disabled
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Phone"
                          value={formData.phone || ""}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Date of Birth"
                          type="date"
                          value={formData.dob || ""}
                          onChange={(e) => handleInputChange("dob", e.target.value)}
                          sx={{ mb: 2 }}
                          InputLabelProps={{ shrink: true }}
                        />
                        <Box
                          sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                        >
                          <Button
                            startIcon={<FaSave />}
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={isLoading}
                          >
                            {isLoading ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            startIcon={<FaTimes />}
                            variant="outlined"
                            color="error"
                            onClick={() => setIsEditMode(false)}
                            disabled={isLoading}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </AnimatedWrapper>
                  )}
                </Box>
              </CardContent>
            </StyledCard>
          </AnimatedWrapper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {[
              { title: "Total Orders", value: orderStats.total, color: "primary", delay: 100 },
              { title: "Paid Orders", value: orderStats.paid, color: "success", delay: 200, percentage: orderStats.total ? (orderStats.paid / orderStats.total) * 100 : 0 },
              { title: "Unpaid Orders", value: orderStats.unpaid, color: "error", delay: 300, percentage: orderStats.total ? (orderStats.unpaid / orderStats.total) * 100 : 0 }
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <AnimatedWrapper
                  aosAnimation="fade-down"
                  aosDuration={800}
                  aosDelay={stat.delay}
                >
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h6">{stat.title}</Typography>
                      <Typography variant="h4">{stat.value}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={stat.percentage !== undefined ? stat.percentage : 100}
                        color={stat.color}
                        sx={{ mt: 2 }}
                      />
                    </CardContent>
                  </StyledCard>
                </AnimatedWrapper>
              </Grid>
            ))}
          </Grid>

          <AnimatedWrapper
            aosAnimation="fade-up"
            aosDuration={1200}
            aosDelay={400}
          >
            <StyledCard sx={{ mt: 3, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </StyledCard>
          </AnimatedWrapper>
        </Grid>

        <Grid item xs={12}>
          <AnimatedWrapper
            aosAnimation="fade-up"
            aosDuration={1000}
            aosDelay={500}
          >
            <StyledCard>
              <CardContent>
                <Box
                  sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
                >
                  <Typography variant="h6">Order History</Typography>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <TextField
                      size="small"
                      placeholder="Search by product name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <IconButton>
                            <FaSearch />
                          </IconButton>
                        ),
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                          width: "250px",
                        },
                      }}
                    />
                    <Select
                      size="small"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Orders</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="unpaid">Unpaid</MenuItem>
                    </Select>
                  </Box>
                </Box>
                {orders.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Order ID</TableCell>
                          <TableCell>Product</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id} hover>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>${order.price?.toLocaleString() || 0}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <StyledChip
                                label={order.status}
                                color={
                                  order.status?.toLowerCase() === "paid"
                                    ? "success"
                                    : "error"
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography color="textSecondary">No orders found</Typography>
                  </Box>
                )}
              </CardContent>
            </StyledCard>
          </AnimatedWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;