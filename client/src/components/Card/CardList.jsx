import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { styled } from "@mui/system";
import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardTitle from "./CardTitle";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/security";
import { CONFIRM } from "../../utils/Alert";
import { addToCart } from "../../services/CartService";
import { useSelector } from "react-redux";
import AnimatedWrapper from "../ui/animation";

// Styled components
// const StyledCard = styled(Card)(() => ({
//   height: "100%",
//   width: "90%",
//   display: "flex",
//   flexDirection: "column",
//   borderRadius: "16px",
//   transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//   margin: "0 auto",
//   "&:hover": {
//     boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
//   },
// }));
const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isOutOfStock",
})(({ theme, isOutOfStock }) => ({
  height: "100%",
  width: "90%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  margin: "0 auto",
  position: "relative",
  opacity: isOutOfStock ? 0.5 : 1, 
  filter: isOutOfStock ? "grayscale(100%)" : "none",
  "&:hover": {
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  },
}));

const SoldOutOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  borderRadius: "16px",
}));

const SoldOutText = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  fontSize: "1.5rem",
  padding: "10px 20px",
  backgroundColor: "rgba(255, 0, 0, 0.7)",
  borderRadius: "8px",
  transform: "rotate(-15deg)",
}));

const StyledCardMedia = styled(CardMedia)(() => ({
  objectFit: "cover",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.15)",
  },
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  borderRadius: "8px",
  textTransform: "none",
  padding: "8px 16px",
  backgroundColor: "#202738",
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary?.dark,
  },
}));

const NavigationButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "#202738",
  color: "white",
  padding: "20px 0",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "#2A3A4A",
  },
  fontSize: "8px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
    color: "black",
    backgroundColor: "transparent",
    padding: "20px 0",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

// CardList component with loading state
const CardList = ({ title, data, sliderClassName, isLoading = false }) => {
  const products = data || [];
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddStatus = (message, severity) => {
    setSnackbar({
      open: true,
      message: message,
      severity: severity,
    });
  };

  const handleCheckClick = async (item) => {
    const isLoggedIn = getCookie("access_token");
    if (!isLoggedIn) {
      CONFIRM("Login Required", "Please login now", "warning", () => {
        window.location.href = "/sign-in";
      });
    } else {
      console.log("Redux: " + user.email);
      const result = await addToCart(user.email, item.productId, item.price);
      console.log(result);
      if (result.success) handleAddStatus("Added To Cart", "success");
      else handleAddStatus(result?.error, "error");
    }
  };

  const SkeletonCard = () => (
    <div style={{ margin: "0 10px" }}>
      <StyledCard>
        <Skeleton variant="rectangular" height={250} animation="wave" />
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width="40%" height={20} animation="wave" />
          <Skeleton
            variant="text"
            width="70%"
            height={30}
            animation="wave"
            sx={{ my: 1 }}
          />
          <Skeleton
            variant="text"
            width="30%"
            height={30}
            animation="wave"
            sx={{ mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={24}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={40}
            width="100%"
            animation="wave"
          />
        </CardContent>
      </StyledCard>
    </div>
  );

  if (isLoading) {
    return (
      <>
        <CardTitle title={title} />
        <AnimatedWrapper
          aosAnimation="fade-up"
          aosDuration={1200}
          aosDelay={200}
        >
          <Container maxWidth="xl" sx={{ position: "relative", py: 6 }}>
            <Slider {...settings} className={sliderClassName}>
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </Slider>
          </Container>
        </AnimatedWrapper>
      </>
    );
  }

  // If not loading but no products available
  if (!products.length) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6">No products available</Typography>
      </Box>
    );
  }

  // Render actual content
  return (
    <>
      <CardTitle title={title} />
      <AnimatedWrapper aosAnimation="fade-up" aosDuration={1200} aosDelay={300}>
        <Container maxWidth="xl" sx={{ position: "relative", py: 6 }}>
          <Slider {...settings} className={sliderClassName}>
          {products.map((product, index) => (
              <div key={index} style={{ margin: "0 10px" }}>
                <StyledCard 
                  tabIndex={0} 
                  aria-label={`Product: ${product.name}`}
                  isOutOfStock={product.quantity === 0} // Pass out of stock status
                >
                  {product.quantity === 0 && (
                    <SoldOutOverlay>
                      <SoldOutText>Sold Out</SoldOutText>
                    </SoldOutOverlay>
                  )}
                  <StyledCardMedia
                    component="img"
                    height="250"
                    image={product.imgLink}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                    }}
                    onClick={() =>
                      navigate(`/product/detail/${product.productId}`, {
                        state: { product },
                      })
                    }
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1,
                      }}
                    >
                      {product.category}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        mb: 1,
                        ...(product.quantity === 0 && { color: 'text.disabled' }),
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color={product.quantity === 0 ? "text.disabled" : "primary"}
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {`$${product.price.toLocaleString()}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={product.quantity === 0 ? "text.disabled" : "text.secondary"}
                      sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* Render filled stars based on the rating */}
                      {Array.from({ length: 5 }, (_, index) =>
                        index < Math.floor(product.rating) ? (
                          <Star
                            key={index}
                            sx={{ 
                              color: product.quantity === 0 ? "gray" : "gold", 
                              fontSize: "1rem" 
                            }}
                          />
                        ) : (
                          <StarBorder
                            key={index}
                            sx={{ 
                              color: product.quantity === 0 ? "gray" : "gold", 
                              fontSize: "1rem" 
                            }}
                          />
                        )
                      )}
                      {/* Display the rating and reviews count */}
                      <span style={{ marginLeft: "8px" }}>
                        {`(${product.reviews} reviews)`}
                      </span>
                    </Typography>
                    <AddToCartButton
                      variant="contained"
                      startIcon={<FaShoppingCart />}
                      fullWidth
                      onClick={() => handleCheckClick(product)}
                      disabled={product.quantity === 0}
                    >
                      {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                    </AddToCartButton>
                  </CardContent>
                </StyledCard>
              </div>
            ))}
          </Slider>

          {/* Navigation Buttons */}
          <AnimatedWrapper animation="fadeIn" duration="1.2s" delay="0.5s">
            <NavigationButton
              onClick={() =>
                document
                  .querySelector(`.${sliderClassName} .slick-prev`)
                  .click()
              }
              aria-label="Previous"
              sx={{ left: -50 }}
            >
              &#10094;
            </NavigationButton>
          </AnimatedWrapper>

          <AnimatedWrapper animation="fadeIn" duration="1.2s" delay="0.5s">
            <NavigationButton
              onClick={() =>
                document
                  .querySelector(`.${sliderClassName} .slick-next`)
                  .click()
              }
              aria-label="Next"
              sx={{ right: -50 }}
            >
              &#10095;
            </NavigationButton>
          </AnimatedWrapper>
        </Container>
      </AnimatedWrapper>

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
    </>
  );
};

CardList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  sliderClassName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default CardList;
