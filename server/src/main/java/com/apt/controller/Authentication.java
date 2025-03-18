package com.apt.controller;

import com.apt.dao.DataBaseConnector;
import com.apt.services.AuthenticationService;
import com.apt.services.UserService;
import com.apt.services.impl.AuthenticationServiceImpl;
import com.apt.services.impl.UserServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.Date;

import jakarta.servlet.annotation.WebServlet;

@SuppressWarnings("deprecation")
@WebServlet(urlPatterns = { "/auth/sign-in", "/auth/sign-up" })
public class Authentication extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private AuthenticationService authService;
    private UserService userService;
    private static final long EXPIRATION_TIME = 864_000_000;

    public Authentication() {
        super();
        this.authService = new AuthenticationServiceImpl();
        this.userService = new UserServiceImpl();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getServletPath();
        response.setContentType("application/json;charset=UTF-8");

        if ("/auth/sign-in".equals(path)) {
            handleSignIn(request, response);
        } else if ("/auth/sign-up".equals(path)) {
            handleSignUp(request, response);
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Endpoint not found");
        }
    }

    private void handleSignIn(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String email;
        String password;

        String contentType = request.getContentType();
        if (contentType != null && contentType.contains("application/json")) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                StringBuilder sb = new StringBuilder();
                request.getReader().lines().forEach(sb::append);
                String jsonBody = sb.toString();

                @SuppressWarnings("unchecked")
                java.util.Map<String, String> jsonMap = mapper.readValue(jsonBody, java.util.Map.class);
                email = jsonMap.get("email");
                password = jsonMap.get("password");
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Invalid JSON format\"}");
                return;
            }
        } else {
            email = request.getParameter("email");
            password = request.getParameter("password");
        }

        System.out.println("[-] email: " + email + "\n[-] Pass: " + password);

        if (email == null || password == null || email.trim().isEmpty() || password.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Email and password are required\"}");
            return;
        }

        int role = authService.signIn(email, password);
        System.out.println("Role: " + role);
        if (role != -1) {
            int userID = userService.getUserId(email);
            String accessToken = generateAccessToken(email, role);
            HttpSession session = request.getSession();
            session.setAttribute("user_id", userID);
            session.setAttribute("email", email);
            session.setAttribute("role", role);
            session.setAttribute("access_token", accessToken);

            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(String.format(
                    "{\"status\": \"success\", \"access_token\": \"%s\", \"role\": %d}",
                    accessToken, role));
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Invalid email or password\"}");
        }
    }

    private void handleSignUp(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String name;
        String email;
        String password;

        String contentType = request.getContentType();
        if (contentType != null && contentType.contains("application/json")) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                StringBuilder sb = new StringBuilder();
                request.getReader().lines().forEach(sb::append);
                String jsonBody = sb.toString();

                @SuppressWarnings("unchecked")
                java.util.Map<String, String> jsonMap = mapper.readValue(jsonBody, java.util.Map.class);
                name = jsonMap.get("name");
                email = jsonMap.get("email");
                password = jsonMap.get("password");
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Invalid JSON format\"}");
                return;
            }
        } else {
            name = request.getParameter("name");
            email = request.getParameter("email");
            password = request.getParameter("password");
        }

        System.out.println("[-] Name: " + name + "\n[-] Email: " + email + "\n[-] Pass: " + password);

        if (name == null || email == null || password == null ||
                name.trim().isEmpty() || email.trim().isEmpty() || password.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Name, email, and password are required\"}");
            return;
        }

        int result = authService.signUp(name, email, password);

        if (result == 1) {
            int userId = userService.getUserId(email); 
            String accessToken = generateAccessToken(email, 1); 

            HttpSession session = request.getSession(true); 
            session.setAttribute("user_id", userId);
            session.setAttribute("email", email);
            session.setAttribute("role", 1);
            session.setAttribute("access_token", accessToken);

            response.setStatus(HttpServletResponse.SC_CREATED);
            response.getWriter().write(String.format(
                    "{\"status\": \"success\", \"access_token\": \"%s\", \"role\": 1}",
                    accessToken));
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Email already exists or registration failed\"}");
        }
    }

    private String generateAccessToken(String email, int role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, DataBaseConnector.getSecretKey())
                .compact();
    }

    @Override
    public void destroy() {
        super.destroy();
        DataBaseConnector.close();
    }

    @Override
    public String getServletInfo() {
        return "Authentication Servlet";
    }
}