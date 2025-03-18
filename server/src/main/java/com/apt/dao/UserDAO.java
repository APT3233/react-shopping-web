package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {

    public UserDAO() {}

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
}
