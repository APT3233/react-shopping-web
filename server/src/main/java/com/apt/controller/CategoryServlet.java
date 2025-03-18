package com.apt.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.annotation.WebServlet;

import com.apt.dao.DataBaseConnector;
import com.apt.model.Category;
import com.apt.services.CategoryService;
import com.apt.services.impl.CategoryServiceImpl;
import com.google.gson.Gson;

@WebServlet("/categories")
public class CategoryServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private CategoryService categoryService;

    public CategoryServlet() {
        super();
        categoryService = new CategoryServiceImpl();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try (PrintWriter out = response.getWriter()) {
            ArrayList<Category> categories = categoryService.getCategoryAvaible();

            Gson gson = new Gson();
            String json = gson.toJson(new ResponseWrapper(true, categories, null));

            response.setStatus(HttpServletResponse.SC_OK); // 200
            out.print(json);
            out.flush();
        } catch (Exception e) {
            try (PrintWriter out = response.getWriter()) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
                String json = new Gson().toJson(new ResponseWrapper(false, null, "Server error: " + e.getMessage()));
                out.print(json);
                out.flush();
            }
        }
    }

    @Override
    public void destroy() {
        super.destroy();
        DataBaseConnector.close();
    }

    @Override
    public String getServletInfo() {
        return "Category Servlet";
    }

    private static class ResponseWrapper {
        private boolean success;
        private ArrayList<Category> data;
        private String error;

        public ResponseWrapper(boolean success, ArrayList<Category> data, String error) {
            this.success = success;
            this.data = data;
            this.error = error;
        }
    }

}