package com.apt.dao;

import java.util.ArrayList;

import com.apt.models.Product;

public interface ProductDAO extends DAOInterface<Product>{

	@Override
	 int insert(Product product) ;

	@Override
	 int update(Product product) ;

	@Override
	int delete(Product product) ;

	@Override
	ArrayList<Product> selectAll();

	@Override
 Product selectById(String id) ;
	@Override
	ArrayList<Product> selectByCondition(String condition);

}
