package com.apt.model;

import java.time.LocalDate;

public class Order {
	private String orderID;
	private String userID;
	private LocalDate orderDate;
	private double totalAmount;
	private String status;
	private String discountID;
	private String shoppingAddressID;

	public Order() {
		super();
	}

	public Order(String orderID, String userID, LocalDate orderDate, double totalAmount, String status,
			String discountID, String shoppingAddressID) {
		super();
		this.orderID = orderID;
		this.userID = userID;
		this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.status = status;
		this.discountID = discountID;
		this.shoppingAddressID = shoppingAddressID;
	}

	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public LocalDate getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDiscountID() {
		return discountID;
	}

	public void setDiscountID(String discountID) {
		this.discountID = discountID;
	}

	public String getShoppingAddressID() {
		return shoppingAddressID;
	}

	public void setShoppingAddressID(String shoppingAddressID) {
		this.shoppingAddressID = shoppingAddressID;
	}

}
