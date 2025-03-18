package com.apt.services;

import java.util.ArrayList;
import java.util.List;

import com.apt.model.Product;


public interface ProductService {
    public List<Product> getAllProducts();
    public ArrayList<Product> getProductsByCategories(String categoryName);
}
