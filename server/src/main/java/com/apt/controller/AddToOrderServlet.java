package com.apt.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.io.BufferedReader;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.apt.dao.DataBaseConnector;
import com.apt.model.Order;
import com.apt.services.OrderService;
import com.apt.services.UserService;
import com.apt.services.impl.OrderServiceImpl;
import com.apt.services.impl.UserServiceImpl;
import com.google.gson.Gson;

@WebServlet("/add-to-cart")
public class AddToOrderServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private OrderService orderService;
    private UserService userService;
    private Gson gson;

    public AddToOrderServlet() throws SQLException {
        super();
        this.orderService = new OrderServiceImpl();
        this.userService = new UserServiceImpl();
        this.gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write("AddToOrderServlet is working!");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        ResponseModel responseModel = new ResponseModel();

        try {
            // Read request body
            StringBuilder requestBody = new StringBuilder();
            String line;
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
            RequestModel requestData = gson.fromJson(requestBody.toString(), RequestModel.class);

            // Get email from request (client sends email instead of userId)
            String email = requestData.getEmail();
            if (email == null || email.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                responseModel.setSuccess(false);
                responseModel.setError("Email is required");
                out.print(gson.toJson(responseModel));
                return;
            }

            int userId = userService.getUserId(email);
            if (userId <= 0) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
                responseModel.setSuccess(false);
                responseModel.setError("Invalid user email");
                out.print(gson.toJson(responseModel));
                return;
            }

            // Get product details
            int productId = requestData.getProductId();
            double price = requestData.getPrice();

            // Create order object
            Order order = new Order();
            order.setUserId(userId);
            order.setProductId(productId);
            order.setNumberBuy(1);
            order.setPrice(price);
            order.setStatus("unpaid");

            // Add to cart (order table with unpaid status)
            int result = orderService.addToOrder(order);

            if (result > 0) {
                response.setStatus(HttpServletResponse.SC_OK); // 200
                responseModel.setSuccess(true);
                responseModel.setMessage("Product has been added to the cart");
            } else if (result == -1) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                responseModel.setSuccess(false);
                responseModel.setError("Product already exists in the cart");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                responseModel.setSuccess(false);
                responseModel.setError("Unable to add product to the cart");
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
        return "Add To Order Servlet";
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

    // Request POJO class
    private static class RequestModel {
        private String email;
        private int productId;
        private int quantity;
        private double price;

        public String getEmail() {
            return email;
        }

        public int getProductId() {
            return productId;
        }

        public int getQuantity() {
            return quantity;
        }

        public double getPrice() {
            return price;
        }
    }
}