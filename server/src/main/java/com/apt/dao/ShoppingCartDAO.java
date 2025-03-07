package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.ShoppingCart;

public interface ShoppingCartDAO extends DAOInterface<ShoppingCart>{

	@Override
	default int insert(ShoppingCart cart) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(ShoppingCart cart) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(ShoppingCart cart) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<ShoppingCart> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ShoppingCart selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<ShoppingCart> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}

}
