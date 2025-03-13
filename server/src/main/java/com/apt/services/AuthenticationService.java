package com.apt.services;

public interface AuthenticationService {
    public int signIn(String email, String passwd);
    public int signUp(String name, String email, String passwd);
}
