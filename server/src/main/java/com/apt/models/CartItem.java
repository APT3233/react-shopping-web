package com.apt.models;

import java.time.LocalDate;

public class CartItem {
	private String cartItemID;
	private String cartID;
	private String productID;
	private int quantity;
	private LocalDate Added;

	public CartItem(String cartItemID, String cartID, String productID, int quantity, LocalDate added) {
		
		this.cartItemID = cartItemID;
		this.cartID = cartID;
		this.productID = productID;
		this.quantity = quantity;
		Added = added;
	}

	public String getCartID() {
		return cartID;
	}

	public void setCartID(String cartID) {
		this.cartID = cartID;
	}

	public CartItem() {
		super();
	}

	public String getCartItemID() {
		return cartItemID;
	}

	public void setCartItemID(String cartItemID) {
		this.cartItemID = cartItemID;
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

	public LocalDate getAdded() {
		return Added;
	}

	public void setAdded(LocalDate added) {
		Added = added;
	}

}
