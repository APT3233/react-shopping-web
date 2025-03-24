package com.apt.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.apt.dao.DataBaseConnector;
import com.apt.model.CartItem;
import com.apt.services.OrderService;
import com.apt.services.impl.OrderServiceImpl;
import com.apt.services.impl.UserServiceImpl;
import com.apt.services.UserService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet(urlPatterns = { "/order/clear-items", "/order/update-items" })
public class OrderServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserService UserService;
    private OrderService orderService;
    private Gson gson;

    public OrderServlet() throws SQLException {
        super();
        this.UserService = new UserServiceImpl();
        this.orderService = new OrderServiceImpl();
        this.gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        ResponseModel responseModel = new ResponseModel();

        try {
            String pathInfo = request.getServletPath();

            if (pathInfo.equals("/order/update-items")) {
                StringBuilder buffer = new StringBuilder();
                String line;
                BufferedReader reader = request.getReader();
                while ((line = reader.readLine()) != null) {
                    buffer.append(line);
                }

                JsonObject jsonRequest = gson.fromJson(buffer.toString(), JsonObject.class);

                String address = jsonRequest.get("address").getAsString();
                com.google.gson.JsonArray cartsArray = jsonRequest.get("carts").getAsJsonArray();

                List<CartItem> cartItems = new ArrayList<>();
                for (int i = 0; i < cartsArray.size(); i++) {
                    JsonObject cartObject = cartsArray.get(i).getAsJsonObject();
                    CartItem item = new CartItem();
                    item.setOrderId(cartObject.get("orderId").getAsInt());
                    item.setNumberBuy(cartObject.get("numberBuy").getAsInt());
                    cartItems.add(item);
                }

                boolean result = orderService.updateOrders(address, cartItems);

                if (result) {
                    response.setStatus(HttpServletResponse.SC_OK); // 200
                    responseModel.setSuccess(true);
                    responseModel.setMessage("Orders updated successfully. Items: " + cartItems.size());
                } else {
                    response.setStatus(HttpServletResponse.SC_OK); // 200 - still OK but no items updated
                    responseModel.setSuccess(true);
                    responseModel.setMessage("No orders were updated.");
                }
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                responseModel.setSuccess(false);
                responseModel.setError("Invalid endpoint. Use '/order/update-items'.");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            responseModel.setSuccess(false);
            responseModel.setError("Server error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            out.print(gson.toJson(responseModel));
            out.flush();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        ResponseModel responseModel = new ResponseModel();

        try {
            String action = request.getParameter("action");
            String email = request.getParameter("email");

            boolean result = false;

            if (action != null && action.equals("all")) {
                result = orderService.clearAllCarts();

                if (result) {
                    response.setStatus(HttpServletResponse.SC_OK); // 200
                    responseModel.setSuccess(true);
                    responseModel
                            .setMessage("All carts have been cleared successfully. Total items removed: " + result);
                } else {
                    response.setStatus(HttpServletResponse.SC_OK); // 200 - still OK but no items removed
                    responseModel.setSuccess(true);
                    responseModel.setMessage("No items to clear in any cart.");
                }
            } else if (email != null && !email.isEmpty()) {
                int userId = UserService.getUserId(email);

                if (userId <= 0) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                    responseModel.setSuccess(false);
                    responseModel.setError("Invalid email address or user not found.");
                    out.print(gson.toJson(responseModel));
                    return;
                }

                result = orderService.clearUserCart(userId);

                if (result) {
                    response.setStatus(HttpServletResponse.SC_OK); // 200
                    responseModel.setSuccess(true);
                    responseModel.setMessage(
                            "Cart cleared successfully for user: " + email + ". Total items removed: " + result);
                } else {
                    response.setStatus(HttpServletResponse.SC_OK); // 200 - still OK but no items removed
                    responseModel.setSuccess(true);
                    responseModel.setMessage("No items to clear in cart for user: " + email);
                }
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                responseModel.setSuccess(false);
                responseModel
                        .setError("Invalid request. Please provide either 'action=all' or 'email=user@example.com'.");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            responseModel.setSuccess(false);
            responseModel.setError("Server error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            out.print(gson.toJson(responseModel));
            out.flush();
        }
    }

    @Override
    public void destroy() {
        super.destroy();
        DataBaseConnector.close();
    }

    @Override
    public String getServletInfo() {
        return "Cart Servlet";
    }

    // Response POJO class
    private static class ResponseModel {
        private boolean success;
        private String message;
        private String error;

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public void setError(String error) {
            this.error = error;
        }
    }
}