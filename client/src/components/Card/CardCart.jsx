import React, { useState, useEffect } from "react";
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
import PropTypes from "prop-types";

const StyledCard = styled(Card)(({ theme }) => ({
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

const CheckoutButton = styled(Button)(({ theme }) => ({
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

const CartCart = ({ initialCartItems = [] }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSnackbar({
      open: true,
      message: "Item removed from cart",
      severity: "info",
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: "Cart cleared successfully",
      severity: "success",
    });
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1595079676077-750c6f6a9442";
  };

  const handleCheckout = () => {
    setSnackbar({
      open: true,
      message: "Proceeding to checkout...",
      severity: "success",
    });
  };

  return (
    <Box sx={{ maxWidth: { xs: "100%", sm: "1200px" }, margin: "0 auto" }}>
      <StyledCard>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "#1976d2",
            fontWeight: "600",
            fontSize: {
              xs: "1.5rem",
              sm: "1.8rem",
              md: "2rem",
            },
          }}
        >
          <FaShoppingCart /> Your orders (fake code)
        </Typography>

        {cartItems.length === 0 ? (
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
        ) : (
          <Grid container spacing={isMobile ? 0.5 : 1}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
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
                        src={item.image}
                        alt={item.name}
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </Box>
                    <CardContent sx={{ flex: 1, p: 1 }}>
                      <Typography
                        variant={isMobile ? "subtitle2" : "h6"}
                        sx={{ fontWeight: "600" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant={isMobile ? "body2" : "subtitle1"}
                        color="primary"
                      >
                        ${item.price.toFixed(2)} each
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
                          onClick={() => handleQuantityChange(item.id, -1)}
                          aria-label="decrease quantity"
                          size="small"
                          sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                        >
                          <FaMinus />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          size="small"
                          InputProps={{ readOnly: true }}
                          sx={{
                            width: "40px",
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                            },
                          }}
                        />
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, 1)}
                          aria-label="increase quantity"
                          size="small"
                          sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                        >
                          <FaPlus />
                        </IconButton>
                        <Typography
                          variant={isMobile ? "body2" : "subtitle1"}
                          sx={{ ml: "auto", fontWeight: "600" }}
                        >
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          color="error"
                          aria-label="remove item"
                          size="small"
                          sx={{ "&:hover": { backgroundColor: "#ffebee" } }}
                        >
                          <FaTrash />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12}>
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
                  >
                    Clear Cart
                  </Button>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                      fontWeight: "600",
                      fontSize: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "1.25rem",
                      },
                    }}
                  >
                    Total: ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>

                <Box >
                  <CheckoutButton
                    onClick={handleCheckout}
                    endIcon={<FaArrowRight />}
                  >
                    Proceed to Checkout
                  </CheckoutButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </StyledCard>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="clear-cart-dialog"
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
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

CartCart.propTypes = {
  initialCartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default CartCart;
