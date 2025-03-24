package com.apt.services.impl;

import java.sql.SQLException;
import java.util.List;

import com.apt.dao.UserProfileDAO;
import com.apt.model.OrderHistory;
import com.apt.model.OrderStats;
import com.apt.model.UserProfile;
import com.apt.services.UserProfileService;
import com.apt.services.UserService;

public class UserProfileServiceImpl implements UserProfileService {
    private UserProfileDAO userProfileDAO;
    private UserService userService;
    
    public UserProfileServiceImpl() {
        this.userProfileDAO = new UserProfileDAO();
        this.userService = new UserServiceImpl();
    }
    
    @Override
    public UserProfile getUserProfile(String email) throws SQLException {
        int userId = userService.getUserId(email);
        if (userId > 0) {
            return userProfileDAO.getUserProfile(userId);
        }
        return null;
    }
    
    @Override
    public boolean saveUserProfile(UserProfile profile) throws SQLException {
        if (profile == null || profile.getUserId() <= 0) {
            return false;
        }
        return userProfileDAO.saveUserProfile(profile);
    }
    
    @Override
    public OrderStats getOrderStats(String email) throws SQLException {
        int userId = userService.getUserId(email);
        if (userId > 0) {
            return userProfileDAO.getOrderStats(userId);
        }
        return new OrderStats(0, 0, 0);
    }
    
    @Override
    public List<OrderHistory> getOrderHistory(String email) throws SQLException {
        int userId = userService.getUserId(email);
        if (userId > 0) {
            return userProfileDAO.getOrderHistory(userId);
        }
        return List.of();
    }
}