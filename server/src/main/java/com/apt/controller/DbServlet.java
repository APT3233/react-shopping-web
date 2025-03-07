package com.apt.controller;

import com.apt.services.TestService;
import com.apt.services.TestService.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet("/user")
public class DbServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public DbServlet() {
        super();
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        TestService testService = new TestService();
        JSONArray userJsonArray = new JSONArray();

        try {
            List<User> users = testService.getAllUsers();
            if (users == null || users.isEmpty()) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("message", "Không có người dùng trong cơ sở dữ liệu");
                PrintWriter out = response.getWriter();
                out.print(jsonResponse.toString());
                return;
            }

            for (User user : users) {
                JSONObject userJson = new JSONObject();
                userJson.put("user_id", user.getUserId());
                userJson.put("email", user.getEmail());
                userJson.put("password", user.getPassword());
                userJson.put("role", user.getRole());
                userJsonArray.put(userJson);
            }

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            try (PrintWriter out = response.getWriter()) {
                out.print(userJsonArray.toString());
                out.flush();
            }

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            try (PrintWriter out = response.getWriter()) {
                JSONObject errorResponse = new JSONObject();
                errorResponse.put("error", "Error when query");
                errorResponse.put("message", e.getMessage());
                out.print(errorResponse.toString());
                out.flush();
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
            e.printStackTrace();
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
        return "Db test";
    }
}
