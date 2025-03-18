package com.apt.services.impl;

import com.apt.dao.ProductDAO;
import com.apt.model.Product;
import com.apt.services.ProductService;

import java.util.ArrayList;
import java.util.List;

public class ProductServiceImpl implements ProductService {

    private ProductDAO productDAO = new ProductDAO();

    @Override
    public List<Product> getAllProducts() {
        return productDAO.selectAll();
    }

    @Override
    public ArrayList<Product> getProductsByCategories(String categoryName){
        return productDAO.getProductsByCategories(categoryName);
    }
}
