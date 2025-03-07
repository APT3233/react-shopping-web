package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.Payment;

public interface PaymentDAO extends DAOInterface<Payment>{

	@Override
	default int insert(Payment payment) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(Payment payment) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(Payment payment) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<Payment> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default Payment selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<Payment> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}

}
