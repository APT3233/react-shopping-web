package com.apt.services;

import java.sql.SQLException;
import java.util.List;

import com.apt.model.CartItem;
import com.apt.model.Order;

public interface OrderService {
    int addToOrder(Order order) throws SQLException;
    List<CartItem> getCartItems(int userId) throws SQLException;
    boolean clearAllCarts() throws SQLException;
    boolean clearUserCart(int user_id) throws SQLException;
    boolean updateOrders(String address, List<CartItem> cartItems) throws SQLException;
}