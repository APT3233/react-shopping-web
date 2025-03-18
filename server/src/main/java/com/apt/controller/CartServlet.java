package com.apt.controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;

import com.apt.dao.DataBaseConnector;
import com.apt.model.Order;
import com.apt.services.CartService;
import com.apt.services.impl.CartServiceImpl;

@WebServlet("/add-to-cart")
public class CartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private CartService cartService;

    public CartServlet() {
        super();
        this.cartService = new CartServiceImpl();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);
        JSONObject jsonResponse = new JSONObject();

        try {
            if (session == null || session.getAttribute("user_id") == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                jsonResponse.put("success", false);
                jsonResponse.put("error", "You need to log in to add a product to the cart");
                out.print(jsonResponse.toString());
                return;
            }

            int userId = (int) session.getAttribute("user_id");
            System.out.println("[--] UserID: " + userId);

            StringBuilder requestBody = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                requestBody.append(line);
            }
            JSONObject requestJson = new JSONObject(requestBody.toString());

            int productId = requestJson.getInt("productId");
            int quantity = requestJson.optInt("quantity", 1);
            double price = requestJson.getDouble("price");

            Order order = new Order();
            order.setUserId(userId);
            order.setProductId(productId);
            order.setNumberBuy(quantity);
            order.setPrice(price);
            order.setStatus("unpaid");

            int result = cartService.addToCart(order);

            if (result > 0) {
                response.setStatus(HttpServletResponse.SC_OK); // 200
                jsonResponse.put("success", true);
                jsonResponse.put("message", "Product has been added to the cart");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                jsonResponse.put("success", false);
                jsonResponse.put("error", "Unable to add product to the cart");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            jsonResponse.put("success", false);
            jsonResponse.put("error", "Server error: " + e.getMessage());
        } finally {
            out.print(jsonResponse.toString());
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
}