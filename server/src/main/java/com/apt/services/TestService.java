package com.apt.services;

import com.apt.dao.DataBaseConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TestService {

    public static class User {
        private int userId;
        private String email;
        private String password;
        private String role;

        public User(int userId, String email, String password, String role) {
            this.userId = userId;
            this.email = email;
            this.password = password;
            this.role = role;
        }

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        @Override
        public String toString() {
            return "User{id=" + userId + ", email='" + email + "', password='" + password + "', role='" + role + "'}";
        }
    }

    public List<User> getAllUsers() {
        List<User> userList = new ArrayList<>();
        String query = "SELECT user_id, email, password, role FROM user";

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                int userId = resultSet.getInt("user_id");
                String email = resultSet.getString("email");
                String password = resultSet.getString("password");
                String role = resultSet.getString("role");

                User user = new User(userId, email, password, role);
                userList.add(user);
            }
        } catch (SQLException e) {
            System.err.println("❌ Lỗi khi truy vấn dữ liệu: " + e.getMessage());
            e.printStackTrace();
        }

        return userList;
    }
}
