package com.apt.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.apt.dao.DataBaseConnector;
import com.apt.model.OrderHistory;
import com.apt.model.OrderStats;
import com.apt.model.UserProfile;
import com.apt.services.UserProfileService;
import com.apt.services.UserService;
import com.apt.services.impl.UserProfileServiceImpl;
import com.apt.services.impl.UserServiceImpl;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet(urlPatterns = {"/user/profile", "/user/profile/update"})
public class UserProfileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserService userService;
    private UserProfileService userProfileService;
    private Gson gson;
    
    public UserProfileServlet() throws SQLException {
        super();
        this.userService = new UserServiceImpl();
        this.userProfileService = new UserProfileServiceImpl();
        this.gson = new Gson();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        JsonObject responseJson = new JsonObject();
        
        try {
            String email = request.getParameter("email");
            
            if (email == null || email.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                responseJson.addProperty("success", false);
                responseJson.addProperty("error", "Email parameter is required");
                out.print(gson.toJson(responseJson));
                return;
            }
            
            int userId = userService.getUserId(email);
            if (userId <= 0) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                responseJson.addProperty("success", false);
                responseJson.addProperty("error", "User not found");
                out.print(gson.toJson(responseJson));
                return;
            }
            
            // Get user profile
            UserProfile profile = userProfileService.getUserProfile(email);
            
            // Get order statistics
            OrderStats orderStats = userProfileService.getOrderStats(email);
            
            // Get order history
            List<OrderHistory> orderHistory = userProfileService.getOrderHistory(email);
            
            // Build response
            JsonObject dataUser = new JsonObject();
            if (profile != null) {
                dataUser.addProperty("name", profile.getName());
                dataUser.addProperty("email", email);
                dataUser.addProperty("phone", profile.getPhone());
                dataUser.addProperty("dob", profile.getDob() != null ? profile.getDob().toString() : "");
                dataUser.addProperty("avatar", profile.getAvatar());
            } else {
                dataUser.addProperty("email", email);
            }
            
            JsonObject orderStatsJson = new JsonObject();
            orderStatsJson.addProperty("total", orderStats.getTotal());
            orderStatsJson.addProperty("paid", orderStats.getPaid());
            orderStatsJson.addProperty("unpaid", orderStats.getUnpaid());
            
            responseJson.addProperty("success", true);
            responseJson.add("dataUser", dataUser);
            responseJson.add("orderStats", orderStatsJson);
            responseJson.add("orders", gson.toJsonTree(orderHistory));
            
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            responseJson.addProperty("success", false);
            responseJson.addProperty("error", "Server error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            out.print(gson.toJson(responseJson));
            out.flush();
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        
        JsonObject responseJson = new JsonObject();
        
        try {
            // Read request body
            StringBuilder buffer = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                buffer.append(line);
            }
            
            // Parse JSON
            JsonObject requestJson = gson.fromJson(buffer.toString(), JsonObject.class);
            
            // Extract email and profile data
            String email = requestJson.get("email").getAsString();
            String name = requestJson.get("name").getAsString();
            String phone = requestJson.has("phone") ? requestJson.get("phone").getAsString() : null;
            String dobString = requestJson.has("dob") ? requestJson.get("dob").getAsString() : null;
            String avatar = requestJson.has("avatar") ? requestJson.get("avatar").getAsString() : null;
            
            int userId = userService.getUserId(email);
            if (userId <= 0) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                responseJson.addProperty("success", false);
                responseJson.addProperty("error", "User not found");
                out.print(gson.toJson(responseJson));
                return;
            }
            
            // Create UserProfile object
            UserProfile profile = new UserProfile();
            profile.setUserId(userId);
            profile.setName(name);
            profile.setPhone(phone);
            profile.setStatus("online"); // Default status
            profile.setAvatar(avatar);
            
            // Parse date if provided
            if (dobString != null && !dobString.isEmpty()) {
                try {
                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                    java.util.Date parsed = format.parse(dobString);
                    profile.setDob(new Date(parsed.getTime()));
                } catch (ParseException e) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    responseJson.addProperty("success", false);
                    responseJson.addProperty("error", "Invalid date format. Use yyyy-MM-dd");
                    out.print(gson.toJson(responseJson));
                    return;
                }
            }
            
            // Save profile
            boolean saved = userProfileService.saveUserProfile(profile);
            
            if (saved) {
                responseJson.addProperty("success", true);
                responseJson.addProperty("message", "Profile updated successfully");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                responseJson.addProperty("success", false);
                responseJson.addProperty("error", "Failed to update profile");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            responseJson.addProperty("success", false);
            responseJson.addProperty("error", "Server error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            out.print(gson.toJson(responseJson));
            out.flush();
        }
    }
    
    @Override
    public void destroy() {
        super.destroy();
        DataBaseConnector.close();
    }
}