package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.User;

public interface UserDAO extends DAOInterface<User> {

	@Override
	default int insert(User user) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(User user) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(User user) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<User> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default User selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<User> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
