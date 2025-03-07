package com.apt.dao;

import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.Category;

public interface CategoryDAO extends DAOInterface<Category> {
	
	public int insert(Category category);
	public int update(Category category);
	public int delete(Category category);
	public ArrayList<Category> selectAll();
    public Category selectById(String id) throws NumberFormatException, SQLException;
    public ArrayList<Category> selectByCondition(String condition);
}
