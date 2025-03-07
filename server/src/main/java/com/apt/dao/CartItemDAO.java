package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.CartItem;

public interface CartItemDAO extends DAOInterface<CartItem>{
	public int insert(CartItem cartItem );
	public int update( CartItem cartItem );
	public int delete(CartItem cartItem  );
	public ArrayList<CartItem> selectAll();
    public CartItem  selectById(String id) throws NumberFormatException, SQLException;
    public ArrayList<CartItem> selectByCondition(String condition);
}
