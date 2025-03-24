package com.apt.controller;

import com.apt.model.Product;
import com.apt.services.ProductService;
import com.apt.services.impl.ProductServiceImpl;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/products")
public class ProductServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private ProductService productService;

    public ProductServlet() {
        super();
        this.productService = new ProductServiceImpl();
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String categories = request.getParameter("categories");

        try (PrintWriter out = response.getWriter()) {
            ArrayList<Product> products = productService.getProductsByCategories(categories);

            Gson gson = new Gson();
            String json = gson.toJson(products);
            
            response.setStatus(HttpServletResponse.SC_OK);
            out.print(json);
            out.flush();
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            try (PrintWriter out = response.getWriter()) {
                out.print("{\"error\": \"Server error: " + e.getMessage() + "\"}");
                out.flush();
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Product Servlet to fetch and display products from database in JSON format";
    }
}
