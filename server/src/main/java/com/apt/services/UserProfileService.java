package com.apt.services;

import java.sql.SQLException;
import java.util.List;

import com.apt.model.OrderHistory;
import com.apt.model.OrderStats;
import com.apt.model.UserProfile;

public interface UserProfileService {
    UserProfile getUserProfile(String email) throws SQLException;
    boolean saveUserProfile(UserProfile profile) throws SQLException;
    OrderStats getOrderStats(String email) throws SQLException;
    List<OrderHistory> getOrderHistory(String email) throws SQLException;
}