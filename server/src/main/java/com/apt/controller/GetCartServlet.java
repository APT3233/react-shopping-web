package com.apt.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.apt.dao.DataBaseConnector;
import com.apt.model.CartItem;
import com.apt.services.OrderService;
import com.apt.services.UserService;
import com.apt.services.impl.OrderServiceImpl;
import com.apt.services.impl.UserServiceImpl;
import com.google.gson.Gson;

@WebServlet("/get-cart")
public class GetCartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private OrderService orderService;
    private UserService userService;
    private Gson gson;

    public GetCartServlet() throws SQLException {
        super();
        this.orderService = new OrderServiceImpl();
        this.userService = new UserServiceImpl();
        this.gson = new Gson();
        System.out.println("[+] GetCartServlet initialized");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        ResponseModel responseModel = new ResponseModel();

        try {
            String email = request.getParameter("email");
            System.out.println("[+] Received request with email: " + email);

            if (email == null || email.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                responseModel.setSuccess(false);
                responseModel.setError("Email parameter is required");
                System.out.println("[-] Error: Email parameter is missing or empty");
                out.print(gson.toJson(responseModel));
                return;
            }

            System.out.println("[+] Fetching userId for email: " + email);
            int userId = userService.getUserId(email);
            System.out.println("[+] UserId retrieved: " + userId);

            if (userId <= 0) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
                responseModel.setSuccess(false);
                responseModel.setError("Invalid user email");
                System.out.println("[-] Error: Invalid user email: " + email);
                out.print(gson.toJson(responseModel));
                return;
            }

            System.out.println("[+] Fetching cart items for userId: " + userId);
            List<CartItem> cartItems = orderService.getCartItems(userId);
            
            if (cartItems != null && !cartItems.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_OK); // 200
                responseModel.setSuccess(true);
                responseModel.setCartItems(cartItems);
                System.out.println("[+] Cart items retrieved successfully, count: " + cartItems.size());
            } else {
                response.setStatus(HttpServletResponse.SC_OK); // 200
                responseModel.setSuccess(true);
                responseModel.setCartItems(List.of()); // Return empty array
                responseModel.setMessage("Your cart is empty");
                System.out.println("[+] Cart is empty for userId: " + userId);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            responseModel.setSuccess(false);
            responseModel.setError("Server error: " + e.getMessage());
            System.out.println("[-] Error fetching cart for email: " + request.getParameter("email"));
            e.printStackTrace(); 
        } finally {
            String jsonResponse = gson.toJson(responseModel);
            System.out.println("[+] Sending response: " + jsonResponse);
            out.print(jsonResponse);
            out.flush();
        }
    }

    @Override
    public void destroy() {
        super.destroy();
        DataBaseConnector.close();
        System.out.println("[+] GetCartServlet destroyed");
    }

    @Override
    public String getServletInfo() {
        return "Get Cart Servlet";
    }

    // Response POJO class
    private static class ResponseModel {
        private boolean success;
        private String message;
        private String error;
        private List<CartItem> cartItems;

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public void setError(String error) {
            this.error = error;
        }

        public void setCartItems(List<CartItem> cartItems) {
            this.cartItems = cartItems;
        }
    }
}