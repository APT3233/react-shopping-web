package com.apt.model;

public class OrderDetail {
	private String orderID;
	private String orderDetailID;
	private String productID;
	private int quantity;
	private double unitPrice;

	public OrderDetail() {
		super();
	}

	public OrderDetail(String orderID, String orderDetailID, String productID, int quantity, double unitPrice) {
		super();
		this.orderID = orderID;
		this.orderDetailID = orderDetailID;
		this.productID = productID;
		this.quantity = quantity;
		this.unitPrice = unitPrice;
	}

	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}

	public String getOrderDetailID() {
		return orderDetailID;
	}

	public void setOrderDetailID(String orderDetailID) {
		this.orderDetailID = orderDetailID;
	}

	public String getProductID() {
		return productID;
	}

	public void setProductID(String productID) {
		this.productID = productID;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}

}
