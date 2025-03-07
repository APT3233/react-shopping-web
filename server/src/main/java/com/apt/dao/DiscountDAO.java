package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.Discount;

public interface DiscountDAO extends DAOInterface<Discount> {
	@Override
	default int insert(Discount discount) {
		return 0;
	}

	@Override
	default int update(Discount discount) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(Discount discount) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<Discount> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default Discount selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<Discount> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}

}
