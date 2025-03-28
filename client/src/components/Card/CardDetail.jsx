import { useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { FiMinus, FiPlus, FiHeart, FiShare2 } from "react-icons/fi";
import { MdZoomIn } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/security";
import { CONFIRM } from "../../utils/Alert";
import { addToCart } from "../../services/CartService";
import { useSelector } from "react-redux";

const ProductImage = muiStyled(CardMedia)(({ theme }) => ({
  borderRadius: "7px",
  objectFit: "contain",
  cursor: "zoom-in",
  transition: "all 0.4s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[4],
  },
  userSelect: "none",
}));

const CardDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [, setShowSnackbar] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const product = location.state?.product || {
    name: "",
    price: 0,
    discount: 0,
    rating: 0,
    reviews: 0,
    quantity: 0,
    description: "",
    imgLink: "https://via.placeholder.com/400",
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    } else {
      handleAddStatus(`Quantity must be between 1 and ${product.quantity}`, 'info');
      setShowSnackbar(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    handleAddStatus("Link copied to clipboard!", 'success')
    setShowSnackbar(true);
  };

  const handleAddStatus = (message, severity) => {
    setSnackbar({
      open: true,
      message: message,
      severity: severity,
    });
  };
  const handleAddToCart = async () => {
    const token = getCookie("access_token");
    if (!token) {
      CONFIRM("Login Required !", "Please login now", "warning", () => {
        window.location.href = "/sign-in";
      });
    } else {
      const result = await addToCart(
        user.email,
        product.productId,
        product.price
      );
      console.log(result);
      if (result.success) handleAddStatus("Added To Cart", "success");
      else handleAddStatus(result?.error, "error");
    }
  };
  const handleBuy = async () => {
    const token = getCookie("access_token");
    if (!token) {
      CONFIRM("Login Required !", "Please login now", "warning", () => {
        window.location.href = "/sign-in";
      });
    } else {
      console.log(quantity);
    }
  };

  const discountedPrice = product.price * (1 - product.discount / 100);

  if (!product.name) {
    return <Typography>🔴 No thing to show :))</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              bgcolor: "grey.50",
              borderRadius: 2,
              p: 2,
            }}
          >
            <ProductImage
              component="img"
              image={product.imgLink}
              alt={product.name}
            />
            <Tooltip title="Click to zoom">
              <IconButton
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <MdZoomIn />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="h5" color="error.main">
              ${discountedPrice.toLocaleString()}
            </Typography>
            {product.discount > 0 && (
              <Typography
                variant="body1"
                sx={{ textDecoration: "line-through" }}
              >
                ${product.price.toLocaleString()}
              </Typography>
            )}
            <Chip
              label={`${product.discount}% OFF`}
              color="error"
              size="small"
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2">({product.reviews} reviews)</Typography>
          </Stack>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quantity
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <FiMinus />
              </IconButton>
              <TextField
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                type="number"
                inputProps={{ min: 1, max: product.quantity }}
                sx={{ width: 80 }}
              />
              <IconButton
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.quantity}
              >
                <FiPlus />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {product.quantity} items available
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                borderRadius: 2,
                background: "#202738",
                textTransform: "none",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: "none",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
              onClick={handleBuy}
              disabled
            >
              Buy Now
            </Button>
            <IconButton onClick={()=>setIsLiked(!isLiked)}>
              <FiHeart style={{ color: isLiked ? "red" : "inherit" }} />
            </IconButton>
            <IconButton onClick={handleShare}>
              <FiShare2 />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 10 }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CardDetail;
