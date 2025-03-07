package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

public interface OrderDetailDAO extends DAOInterface<OrderDetailDAO> {

	@Override
	default int insert(OrderDetailDAO orderDetailDAO) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(OrderDetailDAO orderDetailDAO) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(OrderDetailDAO orderDetailDAO) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<OrderDetailDAO> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default OrderDetailDAO selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<OrderDetailDAO> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}

}
