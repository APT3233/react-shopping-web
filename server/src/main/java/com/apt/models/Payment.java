package com.apt.models;

import java.time.LocalDate;

public class Payment {
	private String payementID;
	private String oderID;
	private boolean paymentStatus;
	private String paymentMethod;
	private LocalDate paymentDate;

	public String getPayementID() {
		return payementID;
	}

	public void setPayementID(String payementID) {
		this.payementID = payementID;
	}

	public String getOderID() {
		return oderID;
	}

	public void setOderID(String oderID) {
		this.oderID = oderID;
	}

	public boolean isPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(boolean paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

}
