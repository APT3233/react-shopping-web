package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.model.User;
import com.apt.dao.Interface.DAOInterface;

public class UserDAO implements DAOInterface<User> {

    public UserDAO() {
    }

    public int getUserId(String email) {
        String sql = "SELECT user_id FROM user WHERE email = ?";
        int userId = -1;

        try (Connection conn = DataBaseConnector.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, email);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    userId = rs.getInt("user_id");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return userId;
    }

    @Override
    public int insert(User user) {
        String sql = "INSERT INTO user (email, password, role) VALUES (?, ?, ?)";
        try (Connection conn = DataBaseConnector.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, user.getEmail());
            pstmt.setString(2, user.getPassword());
            pstmt.setString(3, user.getRole());
            return pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public int update(User user) {
        String sql = "UPDATE user SET password = ? WHERE email = ?";
        try (Connection conn = DataBaseConnector.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, user.getPassword());
            pstmt.setString(2, user.getEmail()); 
            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected;
        } catch (SQLException e) {
            System.err.println("[-] SQL Error: " + e.getMessage());
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public int delete(User user) {
        String sql = "DELETE FROM user WHERE email = ?";
        try (Connection conn = DataBaseConnector.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, user.getEmail());
            return pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public ArrayList<User> selectAll() {
        String sql = "SELECT user_id, email, password, role FROM user";
        ArrayList<User> result = new ArrayList<>();

        try (Connection conn = DataBaseConnector.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql);
                ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                User user = new User(
                        rs.getInt("user_id"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("role"));
                result.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    @Override
    public User selectById(String id) throws NumberFormatException, SQLException {
        String sql = "SELECT user_id, email, password, role FROM user WHERE user_id = ?";
        try (Connection conn = DataBaseConnector.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, Integer.parseInt(id));
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return new User(
                            rs.getInt("user_id"),
                            rs.getString("email"),
                            rs.getString("password"),
                            rs.getString("role"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ArrayList<User> selectByCondition(String condition) {
        String sql = "SELECT user_id, email, password, role FROM user WHERE email = ?";
        ArrayList<User> result = new ArrayList<>();

        try (Connection conn = DataBaseConnector.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, condition);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    User user = new User(
                            rs.getInt("user_id"),
                            rs.getString("email"),
                            rs.getString("password"),
                            rs.getString("role"));
                    result.add(user);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }
}