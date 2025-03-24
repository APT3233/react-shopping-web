package com.apt.model;

import java.sql.Date;

public class UserProfile {
    private int profileId;
    private int userId;
    private String name;
    private String phone;
    private Date dob;
    private String status;
    private String avatar;
    
    public UserProfile() {
    }
    
    public UserProfile(int profileId, int userId, String name, String phone, Date dob, String status, String avatar) {
        this.profileId = profileId;
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.dob = dob;
        this.status = status;
        this.avatar = avatar;
    }

    // Getters and setters
    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}