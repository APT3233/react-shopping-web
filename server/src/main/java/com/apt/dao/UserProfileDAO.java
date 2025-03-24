package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.apt.model.OrderHistory;
import com.apt.model.OrderStats;
import com.apt.model.UserProfile;

public class UserProfileDAO {
    
    private Connection getConnection() throws SQLException {
        return DataBaseConnector.getConnection();
    }
    

    public UserProfile getUserProfile(int userId) throws SQLException {
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT profile_id, user_id, name, phone, dob, status, avatar " +
                 "FROM user_profile WHERE user_id = ?")) {
            
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    UserProfile profile = new UserProfile();
                    profile.setProfileId(rs.getInt("profile_id"));
                    profile.setUserId(rs.getInt("user_id"));
                    profile.setName(rs.getString("name"));
                    profile.setPhone(rs.getString("phone"));
                    profile.setDob(rs.getDate("dob"));
                    profile.setStatus(rs.getString("status"));
                    profile.setAvatar(rs.getString("avatar"));
                    return profile;
                }
            }
        }
        return null;
    }
    

    public boolean saveUserProfile(UserProfile profile) throws SQLException {
        // Check if profile exists
        UserProfile existingProfile = getUserProfile(profile.getUserId());
        
        if (existingProfile != null) {
            try (Connection conn = getConnection();
                 PreparedStatement ps = conn.prepareStatement(
                     "UPDATE user_profile SET name = ?, phone = ?, dob = ?, status = ?, avatar = ? " +
                     "WHERE user_id = ?")) {
                
                ps.setString(1, profile.getName());
                ps.setString(2, profile.getPhone());
                ps.setDate(3, profile.getDob());
                ps.setString(4, profile.getStatus());
                ps.setString(5, profile.getAvatar());
                ps.setInt(6, profile.getUserId());
                
                return ps.executeUpdate() > 0;
            }
        } else {
            try (Connection conn = getConnection();
                 PreparedStatement ps = conn.prepareStatement(
                     "INSERT INTO user_profile (user_id, name, phone, dob, status, avatar) " +
                     "VALUES (?, ?, ?, ?, ?, ?)")) {
                
                ps.setInt(1, profile.getUserId());
                ps.setString(2, profile.getName());
                ps.setString(3, profile.getPhone());
                ps.setDate(4, profile.getDob());
                ps.setString(5, profile.getStatus());
                ps.setString(6, profile.getAvatar());
                
                return ps.executeUpdate() > 0;
            }
        }
    }
    
    /**
     * Get order statistics for user
     */
    public OrderStats getOrderStats(int userId) throws SQLException {
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT COUNT(*) as total, " +
                 "SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid, " +
                 "SUM(CASE WHEN status = 'unpaid' THEN 1 ELSE 0 END) as unpaid " +
                 "FROM `order` WHERE user_id = ?")) {
            
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    OrderStats stats = new OrderStats();
                    stats.setTotal(rs.getInt("total"));
                    stats.setPaid(rs.getInt("paid"));
                    stats.setUnpaid(rs.getInt("unpaid"));
                    return stats;
                }
            }
        }
        return new OrderStats(0, 0, 0);
    }
    
    /**
     * Get order history for user
     */
    public List<OrderHistory> getOrderHistory(int userId) throws SQLException {
        List<OrderHistory> orders = new ArrayList<>();
        
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT o.order_id, p.name as product_name, o.number_buy, o.price, o.date, o.status " +
                 "FROM `order` o " +
                 "JOIN product p ON o.product_id = p.product_id " +
                 "WHERE o.user_id = ? " +
                 "ORDER BY o.date DESC")) {
            
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    OrderHistory order = new OrderHistory();
                    order.setId(rs.getInt("order_id"));
                    order.setProduct(rs.getString("product_name"));
                    order.setNumberBuy(rs.getInt("number_buy"));
                    order.setPrice(rs.getDouble("price"));
                    order.setDate(rs.getTimestamp("date"));
                    order.setStatus(rs.getString("status").equalsIgnoreCase("paid") ? "Paid" : "Unpaid");
                    
                    orders.add(order);
                }
            }
        }
        
        return orders;
    }
}