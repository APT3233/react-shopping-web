import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { margin, padding, styled } from "@mui/system";
import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardTitle from "./CardTitle";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "90%", 
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  margin: "0 auto", 
  "&:hover": {
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
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

const CardList = ({ title, data }) => {
  const products = data || [];

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

  if (!products.length) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6">No products available</Typography>
      </Box>
    );
  }

  return (
    <>
      <CardTitle title={title} />
      <Container maxWidth="xl" sx={{ position: "relative", py: 6 }}>
        <Slider {...settings} className="product-slider">
          {products.map((product) => (
            <div key={product.id} style={{ margin: "0 10px" }}>
              <StyledCard tabIndex={0} aria-label={`Product: ${product.name}`}>
                <StyledCardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                  }}
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
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {`$${product.price}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
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
                          sx={{ color: "gold", fontSize: "1rem" }}
                        />
                      ) : (
                        <StarBorder
                          key={index}
                          sx={{ color: "gold", fontSize: "1rem" }}
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
                  >
                    Add to Cart
                  </AddToCartButton>
                </CardContent>
              </StyledCard>
            </div>
          ))}
        </Slider>
        {/* Navigation Buttons */}
        <NavigationButton
          onClick={() => document.querySelector(".slick-prev").click()}
          aria-label="Previous"
          sx={{ left: -50 }}
        >
          &#10094;
        </NavigationButton>
        <NavigationButton
          onClick={() => document.querySelector(".slick-next").click()}
          aria-label="Next"
          sx={{ right: -50 }}
        >
          &#10095;
        </NavigationButton>
      </Container>
    </>
  );
};

CardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
      reviews: PropTypes.string.isRequired,
    })
  ),
};

export default CardList;