package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.Order;

public interface OrderDAO extends DAOInterface<Order> {

	@Override
	default int insert(Order t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(Order t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(Order t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<Order> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default Order selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<Order> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}

}
