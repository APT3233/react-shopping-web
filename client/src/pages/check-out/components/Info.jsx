import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

function Info() {
  const {orders} = useSelector((state)=> state.order)
  const data = orders

  const total = data.reduce((sum, product) => sum + product.price * product.numberBuy,0) + 9.99;


  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        <Typography variant="h6" component="span">
          $
        </Typography>
        {total.toLocaleString()}
      </Typography>
      <List disablePadding>
        {data.map((product) => (
          <ListItem key={product.productName} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.productName}
              secondary={"Quantity: " + product.numberBuy}
            />
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              ${(product.price * product.numberBuy).toLocaleString()}
            </Typography>
          </ListItem>
        )) }
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
