package com.apt.services.impl;

import java.util.ArrayList;

import com.apt.dao.CategoryDAO;
import com.apt.model.Category;
import com.apt.services.CategoryService;

public class CategoryServiceImpl implements CategoryService {
    private CategoryDAO categoryDAO = new CategoryDAO();
    @Override 
    public ArrayList<Category> getCategoryAvaible(){
        return categoryDAO.selectAll();
    }
}
