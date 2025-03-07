package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.Inventory;

public interface InventoryDAO extends DAOInterface<Inventory> {

	@Override
	default int insert(Inventory t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(Inventory t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(Inventory t) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<Inventory> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default Inventory selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<Inventory> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}

}
