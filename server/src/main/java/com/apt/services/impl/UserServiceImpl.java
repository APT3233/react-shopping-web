package com.apt.services.impl;

import com.apt.dao.UserDAO;
import com.apt.services.UserService;

public class UserServiceImpl implements UserService{
    private UserDAO userDao = new UserDAO();

    @Override
    public int getUserId(String email) {
        return userDao.getUserId(email);
    }
    
}
