package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.Review;

public interface ReviewDAO extends DAOInterface<Review> {

	@Override
	default int insert(Review review) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int update(Review review) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default int delete(Review review) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	default ArrayList<Review> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default Review selectById(String id) throws NumberFormatException, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	default ArrayList<Review> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
