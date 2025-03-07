package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.ShippingAddress;

public interface ShippingAddressDAO extends DAOInterface<ShippingAddress>{

	@Override
	default int insert(ShippingAddress shippingAddress) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(ShippingAddress shippingAddress) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(ShippingAddress shippingAddress) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<ShippingAddress> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ShippingAddress selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<ShippingAddress> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}

}
