package com.apt.models;

import java.time.LocalDate;

public class Inventory {
	private String invetoryID;
	private String productID;
	private int quantity;
	private String type;
	private LocalDate DateAdded;

	public Inventory() {
		super();
	}

	public Inventory(String invetoryID, String productID, int quantity, String type, LocalDate dateAdded) {
		super();
		this.invetoryID = invetoryID;
		this.productID = productID;
		this.quantity = quantity;
		this.type = type;
		DateAdded = dateAdded;
	}

	public String getInvetoryID() {
		return invetoryID;
	}

	public void setInvetoryID(String invetoryID) {
		this.invetoryID = invetoryID;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDate getDateAdded() {
		return DateAdded;
	}

	public void setDateAdded(LocalDate dateAdded) {
		DateAdded = dateAdded;
	}

}
