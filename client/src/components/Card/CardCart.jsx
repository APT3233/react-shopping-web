import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  useMediaQuery,
  TextField,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";
import { Spin } from "antd";
import PropTypes from "prop-types";
import instance from "../../utils/customizeAxios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { fetchOrders } from "../../redux/slices/orderSlice";
import AnimatedWrapper from "../ui/animation"; // Import the animation wrapper
import 'animate.css'; // Import animate.css styles

const StyledCard = styled(Card)(() => ({
  margin: "20px",
  padding: "20px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  borderRadius: "16px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
  },
}));

const ProductImage = styled("img")({
  width: "100%",
  maxHeight: "150px",
  objectFit: "cover",
  borderRadius: "12px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const CheckoutButton = styled(Button)(() => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: "20px",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .3)",
  },
}));

const CardCart = ({ initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate(); 

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.numberBuy,
      0
    );
  };

  const handleQuantityChange = (orderId, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.orderId === orderId) {
          const newNumberBuy = item.numberBuy + change;
          const updatedNumberBuy = Math.max(
            1,
            Math.min(newNumberBuy, item.quantity)
          );
          return { ...item, numberBuy: updatedNumberBuy };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (orderId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.orderId !== orderId)
    );
    setSnackbar({
      open: true,
      message: "Item removed from cart",
      severity: "info",
    });
  };

  const handleClearCart = async () => {
    setCartItems([]);
    try {
      const response = await instance.get("/api/order/clear-items", {
        params: { email: user.email },
      });
      console.log(response);
      setSnackbar({
        open: true,
        message: "Cart cleared successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      setSnackbar({
        open: true,
        message: "Failed to clear cart",
        severity: "error",
      });
    }
    setOpenDialog(false);
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1595079676077-750c6f6a9442";
  };

  const handleCheckout = () => {
    console.log(cartItems)
    setLoading(true);
    dispatch(fetchOrders(cartItems))
    setSnackbar({
      open: true,
      message: "Proceeding to checkout...",
      severity: "info",
    });

    
    setTimeout(() => {
      setLoading(false); 
      navigate("/check-out");
    }, 1500);
  };

  useEffect(() => {
    setCartItems(initialCartItems || []);
  }, [initialCartItems]);

  return (
    <AnimatedWrapper animation="fadeIn" duration="1.2s">
      <Box sx={{ maxWidth: { xs: "100%", sm: "1200px" }, margin: "0 auto" }}>
        <StyledCard>
          <AnimatedWrapper animation="fadeInDown" duration="1s">
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "#1976d2",
                fontWeight: "600",
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
              }}
            >
              <FaShoppingCart className="animate__animated animate__swing animate__delay-1s" /> 
              Your orders
            </Typography>
          </AnimatedWrapper>

          {cartItems.length === 0 ? (
            <AnimatedWrapper animation="fadeIn" duration="0.8s">
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  backgroundColor: "#f5f5f5",
                  borderRadius: "12px",
                  padding: "40px",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Your cart is empty
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Start adding some products to your cart!
                </Typography>
              </Box>
            </AnimatedWrapper>
          ) : (
            <Grid container spacing={isMobile ? 0.5 : 1}>
              {cartItems.map((item, index) => (
                <Grid item xs={12} key={item.orderId}>
                  <AnimatedWrapper 
                    aosAnimation="fade-up" 
                    aosDelay={index * 100}
                    aosDuration={600}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                        },
                        marginBottom: "5px",
                      }}
                    >
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        <Box sx={{ width: isMobile ? "100%" : "200px", p: 1 }}>
                          <ProductImage
                            src={item.productImage}
                            alt={item.productName}
                            onError={handleImageError}
                            loading="lazy"
                            className="animate__animated animate__pulse animate__slow animate__infinite"
                          />
                        </Box>
                        <CardContent sx={{ flex: 1, p: 1 }}>
                          <Typography
                            variant={isMobile ? "subtitle2" : "h6"}
                            sx={{ fontWeight: "600" }}
                          >
                            {item.productName}
                          </Typography>
                          <Typography
                            variant={isMobile ? "body2" : "subtitle1"}
                            color="primary"
                          >
                            ${item.price.toLocaleString()} each
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                              gap: 1,
                            }}
                          >
                            <IconButton
                              onClick={() => handleQuantityChange(item.orderId, -1)}
                              aria-label="decrease quantity"
                              size="small"
                              sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                              className="animate__animated animate__headShake animate__faster"
                            >
                              <FaMinus />
                            </IconButton>
                            <TextField
                              value={item.numberBuy}
                              size="small"
                              InputProps={{ readOnly: true }}
                              sx={{
                                width: "50px",
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "8px",
                                },
                              }}
                            />
                            <IconButton
                              onClick={() => handleQuantityChange(item.orderId, 1)}
                              aria-label="increase quantity"
                              size="small"
                              sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                              className="animate__animated animate__headShake animate__faster"
                            >
                              <FaPlus />
                            </IconButton>
                            <Typography
                              variant={isMobile ? "body2" : "subtitle1"}
                              sx={{ ml: "auto", fontWeight: "600" }}
                            >
                              Subtotal: $
                              {(item.price * item.numberBuy).toLocaleString()}
                            </Typography>
                            <IconButton
                              onClick={() => handleRemoveItem(item.orderId)}
                              color="error"
                              aria-label="remove item"
                              size="small"
                              sx={{ "&:hover": { backgroundColor: "#ffebee" } }}
                              className="animate__animated animate__rubberBand animate__faster"
                            >
                              <FaTrash />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </Paper>
                  </AnimatedWrapper>
                </Grid>
              ))}
              <Grid item xs={12}>
                <AnimatedWrapper animation="fadeInUp" duration="1s" delay="0.5s">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setOpenDialog(true)}
                        startIcon={<FaTrash />}
                        sx={{
                          borderRadius: "20px",
                          width: { xs: "100px", md: "150px" },
                          fontSize: { xs: "0.5rem", md: "0.8rem" },
                          "&:hover": { backgroundColor: "#ffebee" },
                        }}
                        className="animate__animated animate__heartBeat animate__slower animate__delay-2s"
                      >
                        Clear Cart
                      </Button>
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "1rem", sm: "1rem", md: "1.25rem" },
                        }}
                        className="animate__animated animate__fadeIn animate__slower"
                      >
                        Total: ${calculateTotal().toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <CheckoutButton
                        onClick={handleCheckout}
                        endIcon={!loading && <FaArrowRight />}
                        disabled={loading}
                        className="animate__animated animate__pulse animate__slow animate__infinite"
                      >
                        {loading ? <Spin /> : "Proceed to Checkout"}
                      </CheckoutButton>
                    </Box>
                  </Box>
                </AnimatedWrapper>
              </Grid>
            </Grid>
          )}
        </StyledCard>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="clear-cart-dialog"
          PaperProps={{
            className: "animate__animated animate__zoomIn animate__faster"
          }}
        >
          <DialogTitle id="clear-cart-dialog">Clear Cart?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove all items from your cart?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleClearCart} color="error" autoFocus>
              Clear Cart
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 14 }}
        >
          <Alert 
            severity={snackbar.severity} 
            sx={{ width: "100%" }}
            className="animate__animated animate__slideInRight animate__faster"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AnimatedWrapper>
  );
};

CardCart.propTypes = {
  initialCartItems: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      numberBuy: PropTypes.number.isRequired,
      productImage: PropTypes.string.isRequired,
    })
  ),
};

export default CardCart;
