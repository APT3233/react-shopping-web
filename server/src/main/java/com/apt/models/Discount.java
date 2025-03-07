package com.apt.models;

import java.time.LocalDate;

public class Discount {
	private String discountID;
	private String code;
	private String discountDescription;
	private String discountValue;
	private LocalDate startDate;
	private LocalDate endDate;
	private boolean isActive;

	public Discount() {
		super();
	}

	public Discount(String discountID, String code, String discountDescription, String discountValue,
			LocalDate startDate, LocalDate endDate, boolean isActive) {
		super();
		this.discountID = discountID;
		this.code = code;
		this.discountDescription = discountDescription;
		this.discountValue = discountValue;
		this.startDate = startDate;
		this.endDate = endDate;
		this.isActive = isActive;
	}

	public String getDiscountID() {
		return discountID;
	}

	public void setDiscountID(String discountID) {
		this.discountID = discountID;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDiscountDescription() {
		return discountDescription;
	}

	public void setDiscountDescription(String discountDescription) {
		this.discountDescription = discountDescription;
	}

	public String getDiscountValue() {
		return discountValue;
	}

	public void setDiscountValue(String discountValue) {
		this.discountValue = discountValue;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

}
