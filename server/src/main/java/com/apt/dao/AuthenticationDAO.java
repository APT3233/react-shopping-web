package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.apt.utils.HashUtils;;

public class AuthenticationDAO {

    public AuthenticationDAO() {
    }

    public int signIn(String email, String password) {
        String sql = "SELECT password, role FROM user WHERE email = ?";

        try (Connection conn = DataBaseConnector.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, email);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                String storedHash = rs.getString("password");
                String role = rs.getString("role");
                System.out.println("Passwd: " + storedHash);
                if (HashUtils.verifyPassword(password, storedHash))
                    return "admin".equals(role) ? 2 : 1;

            } else
                return -1;

        } catch (SQLException e) {
            System.err.println("Error during sign-in: " + e.getMessage());
            e.printStackTrace();
            return -1;
        }
        return -1;
    }

    public int signUp(String fullname, String email, String password) {
        String insertUserSql = "INSERT INTO user (email, password, role) VALUES (?, ?, 'user')";
        String insertProfileSql = "INSERT INTO user_profile (user_id, name) VALUES (?, ?)";
        String checkEmailSql = "SELECT COUNT(*) FROM user WHERE email = ?";

        try (Connection conn = DataBaseConnector.getConnection()) {
            conn.setAutoCommit(false);

            try (PreparedStatement checkStmt = conn.prepareStatement(checkEmailSql)) {
                checkStmt.setString(1, email);
                ResultSet rs = checkStmt.executeQuery();
                if (rs.next() && rs.getInt(1) > 0) {
                    conn.rollback();
                    return -1;
                }
            }

            int userId;
            try (PreparedStatement userStmt = conn.prepareStatement(insertUserSql,
                    PreparedStatement.RETURN_GENERATED_KEYS)) {
                userStmt.setString(1, email);
                userStmt.setString(2, HashUtils.hashPassword(password));
                int rowsAffected = userStmt.executeUpdate();
                if (rowsAffected == 0) {
                    conn.rollback();
                    return -1;
                }

                ResultSet generatedKeys = userStmt.getGeneratedKeys();
                if (generatedKeys.next()) {
                    userId = generatedKeys.getInt(1);
                } else {
                    conn.rollback();
                    return -1;
                }
            }

            try (PreparedStatement profileStmt = conn.prepareStatement(insertProfileSql)) {
                profileStmt.setInt(1, userId);
                profileStmt.setString(2, fullname);
                int rowsAffected = profileStmt.executeUpdate();
                if (rowsAffected == 0) {
                    conn.rollback();
                    return -1;
                }
            }

            conn.commit();
            return 1;

        } catch (SQLException e) {
            System.err.println("[-] Error during sign-up: " + e.getMessage());
            e.printStackTrace();
            try (Connection conn = DataBaseConnector.getConnection()) {
                conn.rollback();
            } catch (SQLException rollbackEx) {
                rollbackEx.printStackTrace();
            }
            return -1;
        }
    }
}