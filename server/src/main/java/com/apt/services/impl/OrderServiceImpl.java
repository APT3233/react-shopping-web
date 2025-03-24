package com.apt.services.impl;

import java.sql.SQLException;
import java.util.List;

import com.apt.dao.OrderDAO;
import com.apt.model.CartItem;
import com.apt.model.Order;
import com.apt.services.OrderService;

public class OrderServiceImpl implements OrderService {
    private OrderDAO orderDAO;

    public OrderServiceImpl() {
        this.orderDAO = new OrderDAO();
    }

    @Override
    public int addToOrder(Order order) throws SQLException {
        return orderDAO.addOrder(order);
    }

    @Override
    public List<CartItem> getCartItems(int userId) throws SQLException {
        return orderDAO.getCartItems(userId);
    }

    @Override
    public boolean clearAllCarts() throws SQLException {
        return orderDAO.clearAllCarts() == 1;
    }

    @Override
    public boolean clearUserCart(int user_id) throws SQLException {
        return orderDAO.clearUserCart(user_id) == 1;
    }

    @Override
    public boolean updateOrders(String address, List<CartItem> cartItems) throws SQLException {
        return orderDAO.updateOrders(address, cartItems) > 0;
    }
}