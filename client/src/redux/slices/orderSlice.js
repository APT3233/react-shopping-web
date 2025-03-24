import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.orderId !== action.payload
      );
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order) {
        order.status = status;
      }
    },
    updateOrderQuantity: (state, action) => {
      const { orderId, numberBuy } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order) {
        order.numberBuy = numberBuy;
      }
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOrders,
  addOrder,
  removeOrder,
  updateOrderStatus,
  updateOrderQuantity,
  clearOrders,
  fetchOrdersStart,
  fetchOrdersFailure,
} = orderSlice.actions;

export default orderSlice.reducer;