package com.apt.models;

import java.time.LocalDate;

public class ShoppingCart {
	private String cartID;
	private String userID;
	private String sessionID;
	private LocalDate createdAt;
	private LocalDate updatedAt;
	public ShoppingCart() {
		super();
	}
	public ShoppingCart(String cartID, String userID, String sessionID, LocalDate createdAt, LocalDate updatedAt) {
		super();
		this.cartID = cartID;
		this.userID = userID;
		this.sessionID = sessionID;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	public String getCartID() {
		return cartID;
	}
	public void setCartID(String cartID) {
		this.cartID = cartID;
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getSessionID() {
		return sessionID;
	}
	public void setSessionID(String sessionID) {
		this.sessionID = sessionID;
	}
	public LocalDate getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDate getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(LocalDate updatedAt) {
		this.updatedAt = updatedAt;
	}
	
}
