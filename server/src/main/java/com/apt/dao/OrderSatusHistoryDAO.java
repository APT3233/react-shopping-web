package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.OrderStatusHistory;

public interface OrderSatusHistoryDAO extends DAOInterface<OrderStatusHistory> {

	@Override
	default int insert(OrderStatusHistory t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(OrderStatusHistory t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(OrderStatusHistory t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<OrderStatusHistory> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default OrderStatusHistory selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<OrderStatusHistory> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}

}
