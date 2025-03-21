package com.apt.controller;

import com.apt.dao.DataBaseConnector;
import com.apt.model.User;
import com.apt.services.AuthenticationService;
import com.apt.services.UserService;
import com.apt.services.impl.AuthenticationServiceImpl;
import com.apt.services.impl.UserServiceImpl;
import com.apt.utils.SmsUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@SuppressWarnings("deprecation")
@WebServlet(urlPatterns = {"/auth/sign-in", "/auth/sign-up", "/auth/forgot-password", "/auth/reset-password"})
public class Authentication extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private AuthenticationService authService;
    private UserService userService;
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days
    private static final long VERIFICATION_CODE_EXPIRY = 180_000; // 3 minutes
    private static final Map<String, String> verificationCodes = new HashMap<>();
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    public Authentication() {
        super();
        this.authService = new AuthenticationServiceImpl();
        this.userService = new UserServiceImpl();
        System.out.println("[+] Authentication Servlet initialized");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getServletPath();
        System.out.println("[+] doGet called with path: " + path);
        if ("/auth/forgot-password".equals(path)) {
            handleForgotPassword(request, response);
        } else {
            System.err.println("[-] Invalid GET path: " + path);
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Endpoint not found");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getServletPath();
        System.out.println("[+] doPost called with path: " + path);
        response.setContentType("application/json;charset=UTF-8");

        switch (path) {
            case "/auth/sign-in":
                handleSignIn(request, response);
                break;
            case "/auth/sign-up":
                handleSignUp(request, response);
                break;
            case "/auth/reset-password": 
                handleResetPassword(request, response);
                break;
            default:
                System.err.println("[-] Invalid POST path: " + path);
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Endpoint not found");
                break;
        }
    }

    @SuppressWarnings("unchecked")
    private void handleResetPassword(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("[+] Handling reset-password request");
        ObjectMapper mapper = new ObjectMapper();

        String jsonBody;
        try (BufferedReader reader = request.getReader()) {
            StringBuilder jsonBuffer = new StringBuilder();
            reader.lines().forEach(jsonBuffer::append);
            jsonBody = jsonBuffer.toString();
            System.out.println("[+] Request body: " + jsonBody);
        } catch (IOException e) {
            System.err.println("[-] Error reading request body: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Invalid request body\"}");
            return;
        }

        Map<String, String> jsonMap;
        try {
            jsonMap = mapper.readValue(jsonBody, Map.class);
            System.out.println("[+] Parsed JSON: " + jsonMap);
        } catch (IOException e) {
            System.err.println("[-] Error parsing JSON: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Invalid JSON format\"}");
            return;
        }

        String email = jsonMap.get("email");
        String password = jsonMap.get("password");
        System.out.println("[+] Email: " + email + ", Password: [HIDDEN]");

        if (email == null || password == null || email.trim().isEmpty() || password.trim().isEmpty()) {
            System.err.println("[-] Missing or empty email/password");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Email and password are required\"}");
            return;
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            System.err.println("[-] Invalid email format: " + email);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Invalid email format\"}");
            return;
        }

        if (!userService.emailExists(email)) {
            System.err.println("[-] Email not found: " + email);
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("{\"error\": \"Email not found\"}");
            return;
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        System.out.println("[+] Attempting to update password for: " + email);
        boolean updated = userService.updatePassword(user);
        if (updated) {
            System.out.println("[+] Password reset successfully for: " + email);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"status\": \"success\", \"message\": \"Password reset successfully\"}");
        } else {
            System.err.println("[-] Failed to reset password for: " + email);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Failed to reset password\"}");
        }
    }

    private void handleForgotPassword(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("[+] Handling forgot-password request");
        String email = request.getParameter("email");
        System.out.println("[+] Email: " + email);

        if (email == null || email.trim().isEmpty()) {
            System.err.println("[-] Email is required but missing or empty");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Email is required\"}");
            return;
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            System.err.println("[-] Invalid email format: " + email);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Invalid email format\"}");
            return;
        }

        if (!userService.emailExists(email)) {
            System.err.println("[-] Email not found: " + email);
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("{\"error\": \"Email not found\"}");
            return;
        }

        System.out.println("[+] Sending verification email to: " + email);
        String key = SmsUtils.sendVerificationEmail(email);
        if (key != null && !key.isEmpty()) {
            verificationCodes.put(email, key);
            System.out.println("[+] Verification code sent: " + key);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(
                    "{\"status\": \"success\", \"message\": \"Verification code sent to your email\", \"key\": \"" + key + "\"}");
        } else {
            System.err.println("[-] Failed to send verification email to: " + email);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Failed to send verification email\"}");
        }
    }

    private void handleSignIn(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("[+] Handling sign-in request");
        String email;
        String password;

        String contentType = request.getContentType();
        System.out.println("[+] Content-Type: " + contentType);
        if (contentType != null && contentType.contains("application/json")) {
            ObjectMapper mapper = new ObjectMapper();
            try (BufferedReader reader = request.getReader()) {
                StringBuilder sb = new StringBuilder();
                reader.lines().forEach(sb::append);
                Map<String, String> jsonMap = mapper.readValue(sb.toString(), Map.class);
                email = jsonMap.get("email");
                password = jsonMap.get("password");
                System.out.println("[+] Parsed JSON - Email: " + email + ", Password: [HIDDEN]");
            } catch (Exception e) {
                System.err.println("[-] Error parsing JSON: " + e.getMessage());
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Invalid JSON format\"}");
                return;
            }
        } else {
            email = request.getParameter("email");
            password = request.getParameter("password");
            System.out.println("[+] Form params - Email: " + email + ", Password: [HIDDEN]");
        }

        if (email == null || password == null || email.trim().isEmpty() || password.trim().isEmpty()) {
            System.err.println("[-] Missing or empty email/password");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Email and password are required\"}");
            return;
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            System.err.println("[-] Invalid email format: " + email);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Invalid email format\"}");
            return;
        }

        System.out.println("[+] Attempting sign-in for: " + email);
        int role = authService.signIn(email, password);
        if (role != -1) {
            int userID = userService.getUserId(email);
            String accessToken = generateAccessToken(email, role);
            HttpSession session = request.getSession();
            session.setAttribute("user_id", userID);
            session.setAttribute("email", email);
            session.setAttribute("role", role);
            session.setAttribute("access_token", accessToken);
            System.out.println("[+] Sign-in successful - UserID: " + userID + ", Role: " + role + ", Token: " + accessToken);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(String.format(
                    "{\"status\": \"success\", \"access_token\": \"%s\", \"role\": %d}",
                    accessToken, role));
        } else {
            System.err.println("[-] Sign-in failed for: " + email);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Invalid email or password\"}");
        }
    }

    private void handleSignUp(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("[+] Handling sign-up request");
        String name;
        String email;
        String password;

        String contentType = request.getContentType();
        System.out.println("[+] Content-Type: " + contentType);
        if (contentType != null && contentType.contains("application/json")) {
            ObjectMapper mapper = new ObjectMapper();
            try (BufferedReader reader = request.getReader()) {
                StringBuilder sb = new StringBuilder();
                reader.lines().forEach(sb::append);
                Map<String, String> jsonMap = mapper.readValue(sb.toString(), Map.class);
                name = jsonMap.get("name");
                email = jsonMap.get("email");
                password = jsonMap.get("password");
                System.out.println("[+] Parsed JSON - Name: " + name + ", Email: " + email + ", Password: [HIDDEN]");
            } catch (Exception e) {
                System.err.println("[-] Error parsing JSON: " + e.getMessage());
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Invalid JSON format\"}");
                return;
            }
        } else {
            name = request.getParameter("name");
            email = request.getParameter("email");
            password = request.getParameter("password");
            System.out.println("[+] Form params - Name: " + name + ", Email: " + email + ", Password: [HIDDEN]");
        }

        if (name == null || email == null || password == null ||
                name.trim().isEmpty() || email.trim().isEmpty() || password.trim().isEmpty()) {
            System.err.println("[-] Missing or empty name/email/password");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Name, email, and password are required\"}");
            return;
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            System.err.println("[-] Invalid email format: " + email);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Invalid email format\"}");
            return;
        }

        System.out.println("[+] Attempting sign-up for: " + email);
        int result = authService.signUp(name, email, password);
        if (result == 1) {
            int userId = userService.getUserId(email);
            String accessToken = generateAccessToken(email, 1);
            HttpSession session = request.getSession(true);
            session.setAttribute("user_id", userId);
            session.setAttribute("email", email);
            session.setAttribute("role", 1);
            session.setAttribute("access_token", accessToken);
            System.out.println("[+] Sign-up successful - UserID: " + userId + ", Token: " + accessToken);
            response.setStatus(HttpServletResponse.SC_CREATED);
            response.getWriter().write(String.format(
                    "{\"status\": \"success\", \"access_token\": \"%s\", \"role\": 1}",
                    accessToken));
        } else {
            System.err.println("[-] Sign-up failed for: " + email);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Email already exists or registration failed\"}");
        }
    }

    private String generateAccessToken(String email, int role) {
        System.out.println("[+] Generating access token for: " + email + ", Role: " + role);
        String token = Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, DataBaseConnector.getSecretKey())
                .compact();
        return token;
    }

    @Override
    public void destroy() {
        System.out.println("[+] Destroying Authentication Servlet");
        try {
            SmsUtils.shutdown();
            DataBaseConnector.close();
            System.out.println("[+] Resources closed successfully");
        } catch (Exception e) {
            System.err.println("[-] Error during servlet destroy: " + e.getMessage());
        }
    }

    @Override
    public String getServletInfo() {
        return "Authentication Servlet";
    }
}