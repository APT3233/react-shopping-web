package com.apt.services.impl;

import com.apt.dao.UserDAO;
import com.apt.model.User;
import com.apt.services.UserService;
import com.apt.utils.HashUtils;

public class UserServiceImpl implements UserService {
    private UserDAO userDao = new UserDAO();
    

    @Override
    public int getUserId(String email) {
        return userDao.getUserId(email);
    }

    @Override
    public boolean emailExists(String email) {
        return !userDao.selectByCondition(email).isEmpty();
    }

    @Override
    public boolean updatePassword(User user){
        if(user == null){
            return false;
        }
        System.out.println("[+] New Passwd: "+user.getPassword());
        user.setPassword(HashUtils.hashPassword(user.getPassword()));
        return userDao.update(user) != 0;
    }

}
