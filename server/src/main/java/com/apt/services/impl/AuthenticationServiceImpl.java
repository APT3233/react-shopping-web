package com.apt.services.impl;

import com.apt.dao.AuthenticationDAO;
import com.apt.services.AuthenticationService;

public class AuthenticationServiceImpl implements AuthenticationService{

    private AuthenticationDAO auth = new AuthenticationDAO();

    @Override
    public int signIn(String email, String passwd){
        return auth.signIn(email, passwd);
    }

    @Override
    public int signUp(String name, String email, String passwd){
        return auth.signUp(name, email, passwd);
    }
}
