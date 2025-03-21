package com.apt.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.BufferedReader;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.apt.dao.DataBaseConnector;
import com.apt.model.Order;
import com.apt.services.CartService;
import com.apt.services.impl.CartServiceImpl;
import com.google.gson.Gson;

@WebServlet("/add-to-cart")
public class CartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private CartService cartService;
    private Gson gson;

    public CartServlet() {
        super();
        this.cartService = new CartServiceImpl();
        this.gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write("CartServlet is working!");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);
        ResponseModel responseModel = new ResponseModel();

        try {
            if (session == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
                responseModel.setSuccess(false);
                responseModel.setError("No active session. Please log in.");
                out.print(gson.toJson(responseModel));
                return;
            }

            Object userIdObj = session.getAttribute("user_id");
            if (userIdObj == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
                responseModel.setSuccess(false);
                responseModel.setError("You need to log in to add a product to the cart");
                out.print(gson.toJson(responseModel));
                return;
            }
            int userId = (int) userIdObj;
            System.out.println("[--] UserID: " + userId);

            StringBuilder requestBody = new StringBuilder();
            String line;
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
            RequestModel requestData = gson.fromJson(requestBody.toString(), RequestModel.class);

            int productId = requestData.getProductId();
            int quantity = requestData.getQuantity() != 0 ? requestData.getQuantity() : 1; // Mặc định quantity = 1
            double price = requestData.getPrice();

            Order order = new Order();
            order.setUserId(userId);
            order.setProductId(productId);
            order.setNumberBuy(quantity);
            order.setPrice(price);
            order.setStatus("unpaid");

            int result = cartService.addToCart(order);

            if (result > 0) {
                response.setStatus(HttpServletResponse.SC_OK); // 200
                responseModel.setSuccess(true);
                responseModel.setMessage("Product has been added to the cart");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                responseModel.setSuccess(false);
                responseModel.setError("Unable to add product to the cart");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            responseModel.setSuccess(false);
            responseModel.setError("Server error: " + e.getMessage());
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

    // Lớp POJO cho phản hồi
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

    // Lớp POJO cho request body
    private static class RequestModel {
        private int productId;
        private int quantity;
        private double price;

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