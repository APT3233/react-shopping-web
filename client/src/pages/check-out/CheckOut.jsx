import * as React from "react";
import {useNavigate} from "react-router-dom"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Snackbar, Alert } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./components/AddressForm";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import "../../assets/css/checkout.css";
import logo from "../../assets/img/logo.png";
import { updateCart } from "../../services/CartService";

const steps = ["Shipping address", "Payment details", "Review your order"];
const genTransactionId = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) result += Math.floor(Math.random() * 10);
  return result;
};

export default function Checkout({ data }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(data);
  const [addressFormData, setAddressFormData] = React.useState({});
  const [paymentFormData, setPaymentFormData] = React.useState({});
  const [formIsValid, setFormIsValid] = React.useState(false);
  const newTransactionId = genTransactionId(13);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const requiredAddressFields = [
    "firstName",
    "lastName",
    "phone",
    "address",
    "city",
    "state",
    "zip",
    "country",
  ];
  const requiredPaymentFields = ["cardName", "cardNumber", "expDate", "cvv"];

  const totalPrice = (
    cartItems.reduce(
      (sum, product) => sum + product.price * product.numberBuy,
      0
    ) + 9.99
  ).toLocaleString();

  const handleAddressFormChange = (data) => {
    setAddressFormData(data);
    const isValid = requiredAddressFields.every(
      (field) => data[field] && data[field].trim() !== ""
    );
    setFormIsValid(isValid);
  };

  const handlePaymentFormChange = (data) => {
    setPaymentFormData(data);
    if (data.paymentType === "bankTransfer") {
      setFormIsValid(true);
    } else {
      const isValid = requiredPaymentFields.every(
        (field) => data[field] && data[field].trim() !== ""
      );
      setFormIsValid(isValid);
    }
  };

  React.useEffect(() => {
    if (activeStep === 0) {
      const isValid = requiredAddressFields.every(
        (field) =>
          addressFormData[field] && addressFormData[field].trim() !== ""
      );
      setFormIsValid(isValid);
    } else if (activeStep === 1) {
      if (paymentFormData.paymentType === "bankTransfer") {
        setFormIsValid(true);
      } else {
        const isValid = requiredPaymentFields.every(
          (field) =>
            paymentFormData[field] && paymentFormData[field].trim() !== ""
        );
        setFormIsValid(isValid);
      }
    } else if (activeStep === 2) {
      setFormIsValid(true);
    }
  }, [activeStep, addressFormData, paymentFormData]);
  React.useEffect(() => {
    if (activeStep === 1 && !paymentFormData.transactionId) {
      setPaymentFormData((prev) => ({
        ...prev,
        transactionId: newTransactionId,
      }));
    }
  }, [activeStep, paymentFormData.transactionId]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            onFormChange={handleAddressFormChange}
            formData={addressFormData}
          />
        );
      case 1:
        return (
          <PaymentForm
            onFormChange={handlePaymentFormChange}
            formData={paymentFormData}
          />
        );
      case 2:
        return (
          <Review
            addressData={addressFormData}
            paymentData={paymentFormData}
            cartdata={cartItems}
            transactionId={newTransactionId}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep < 2) {
      setFormIsValid(false);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSave = async () => {
    const updateCartData = cartItems.map((item) => ({
      orderId: item.orderId,
      numberBuy: item.numberBuy,
    }));
    const address =
      addressFormData.address +
      "-" +
      addressFormData.city +
      "-" +
      addressFormData.country;
    const res = await updateCart(address, updateCartData);
    if (res.success && res.message.includes("Items")) {
      setSnackbar({
        open: true,
        message: "Payment successful",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: res.message,
        severity: "info",
      });
    }
    setTimeout(() => {
      handleNext()
    }, 1000)

  };
  const handleButtonClick = () => {
    if (activeStep === steps.length - 1) {
      handleSave();
    } else {
      handleNext();
    }
  };
  return (
    <>
      <Grid
        container
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexWrap: "nowrap",
        }}
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
          mb: {
            xs: 15,
            sm: 0,
          },
        }}
      >
        {/* Left */}
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            borderRadius: "10px",
            marginRight: "20px",
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <img src={logo} alt="logo" style={{ width: "50px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info />
          </Box>
        </Grid>
        {/* End Left */}

        {/* Right */}
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            borderRadius: "10px",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
          className="check-out-right"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: "100%", height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ":first-child": { pl: 0 }, ":last-child": { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          {/* Top Mobile */}
          <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {totalPrice}
                </Typography>
              </div>
              <InfoMobile
                totalPrice={totalPrice}
              />
            </CardContent>
          </Card>
          {/* End Top Mobile */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Your order number is
                  <strong> #140396</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Button
                  style={{ backgroundColor: "#202738" }}
                  variant="contained"
                  sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
                  onClick={()=>navigate('/profile')}
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={[
                    {
                      display: "flex",
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      alignItems: "end",
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: "60px",
                    },
                    activeStep !== 0
                      ? { justifyContent: "space-between" }
                      : { justifyContent: "flex-end" },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    style={{ backgroundColor: "#202738", color: "white" }}
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleButtonClick}
                    disabled={!formIsValid}
                    sx={{ width: { xs: "100%", sm: "fit-content" } }}
                  >
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
        {/* End Right */}

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
      </Grid>
    </>
  );
}
