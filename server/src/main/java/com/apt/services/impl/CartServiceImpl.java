package com.apt.services.impl;

import com.apt.dao.CartDAO;
import com.apt.model.Order;
import com.apt.services.CartService;

public class CartServiceImpl implements CartService {
    private CartDAO cartDAO = new CartDAO();

    @Override
    public int addToCart(Order order) {
        return cartDAO.insert(order);
    }
    
}
