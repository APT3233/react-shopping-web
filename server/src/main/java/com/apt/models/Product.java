package com.apt.models;

import java.time.LocalDate;

public class Product {
	private String productID;
	private String productName;

	private double price;
	private String categoryID;
	private String productDescription;
	private int stockQuantity;
	private LocalDate createdAt;
	
	
	public Product() {
		super();
	}
	public Product(String productID, String productName, double price, String categoryID, String productDescription,
			int stockQuantity, LocalDate createdAt) {
		super();
		this.productID = productID;
		this.productName = productName;
		this.price = price;
		this.categoryID = categoryID;
		this.productDescription = productDescription;
		this.stockQuantity = stockQuantity;
		this.createdAt = createdAt;
	}
	public String getProductID() {
		return productID;
	}
	public void setProductID(String productID) {
		this.productID = productID;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(String categoryID) {
		this.categoryID = categoryID;
	}
	public String getProductDescription() {
		return productDescription;
	}
	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}
	public int getStockQuantity() {
		return stockQuantity;
	}
	public void setStockQuantity(int stockQuantity) {
		this.stockQuantity = stockQuantity;
	}
	public LocalDate getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}
	
	
}
