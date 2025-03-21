package com.apt.services;

import com.apt.model.User;

public interface UserService {
    public int getUserId(String email);
    boolean emailExists(String email);
    boolean updatePassword(User newUser);
}
