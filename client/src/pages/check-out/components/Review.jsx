import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Review({ cartdata, addressData, paymentData }) {
  const cartItems = Array.isArray(cartdata)
    ? cartdata
    : cartdata?.cartItems || [];

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.numberBuy,
      0
    );
  };

  const shippingCost = 9.99;
  const total = calculateSubtotal() + shippingCost;

  const addressFields = [
    `${addressData.firstName || ""} ${addressData.lastName || ""}`,
    addressData.phoneNumber || "",
    addressData.address || "",
    `${addressData.city || ""}, ${addressData.state || ""} ${
      addressData.zip || ""
    }`,
    addressData.country || "",
  ].filter(Boolean);

  const paymentDetails =
    paymentData.paymentType === "creditCard"
      ? [
          { name: "Card type:", detail: "Credit Card" },
          { name: "Card holder:", detail: paymentData.cardName || "" },
          {
            name: "Card number:",
            detail: paymentData.cardNumber
              ? `xxxx-xxxx-xxxx-${paymentData.cardNumber.slice(-4)}`
              : "",
          },
          { name: "Expiry date:", detail: paymentData.expDate || "" },
        ]
      : [
          { name: "Method:", detail: "Bank Transfer" },
          { name: "Bank:", detail: "MB Bank" },
          {
            name: "Account number:",
            detail: import.meta.env.VITE_ROUTING_NUMBER,
          },
          {
            name: "Routing number:",
            detail: import.meta.env.VITE_ACCOUNT_NUMBER,
          },
          { name: "Transaction ID:", detail: paymentData.transactionId },
        ];

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Products"
            secondary={`${cartItems.length} selected`}
          />
          <Typography variant="body2">
            ${calculateSubtotal().toLocaleString()}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">${shippingCost.toFixed(2)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total.toLocaleString()}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          {addressFields.map((line, index) => (
            <Typography
              key={index}
              gutterBottom
              sx={{ color: index > 0 ? "text.secondary" : "inherit" }}
            >
              {line}
            </Typography>
          ))}
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {paymentDetails.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    {payment.detail}
                  </Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
