package com.apt.model;



public class ShippingAddress {

	private String addressID;
	private String userID;
	private String country;
	private String district;
	private String ward;
	private String street;
	private int houseNumber;
	private boolean isDefault;
	private String recipientName;

	public ShippingAddress(String addressID, String userID, String country, String district, String ward, String street,
			int houseNumber, boolean isDefault, String recipientName) {
		super();
		this.addressID = addressID;
		this.userID = userID;
		this.country = country;
		this.district = district;
		this.ward = ward;
		this.street = street;
		this.houseNumber = houseNumber;
		this.isDefault = isDefault;
		this.recipientName = recipientName;
	}

	public ShippingAddress() {
		super();
	}

	public String getAddressID() {
		return addressID;
	}

	public void setAddressID(String addressID) {
		this.addressID = addressID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getWard() {
		return ward;
	}

	public void setWard(String ward) {
		this.ward = ward;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(int houseNumber) {
		this.houseNumber = houseNumber;
	}

	public boolean isDefault() {
		return isDefault;
	}

	public void setDefault(boolean isDefault) {
		this.isDefault = isDefault;
	}

	public String getRecipientName() {
		return recipientName;
	}

	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}

}
