package com.apt.models;

import java.time.LocalDate;

public class User {
	private String userID;
	private String fullName;
	private String passwordHash;
	private String phone;
	private String address;
	private String role;
	private LocalDate createdAt;
	private String email;

	public User(String userID, String fullName, String passwordHash, String phone, String address, String role,
			LocalDate createdAt, String email) {
		super();
		this.userID = userID;
		this.fullName = fullName;
		this.passwordHash = passwordHash;
		this.phone = phone;
		this.address = address;
		this.role = role;
		this.createdAt = createdAt;
		this.email = email;
	}

	public User() {
		super();
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPasswordHash() {
		return passwordHash;
	}

	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
