package com.apt.model;

import java.time.LocalDate;

public class Review {
	private String reviewID;
	private String productID;
	private String userID;
	private LocalDate createdAt; // created Date
	private int rating; // 1-5 start for quality
	private String comment;

	public Review() {
		super();
	}

	public Review(String reviewID, String productID, String userID, LocalDate createdAt, int rating, String comment) {
		super();
		this.reviewID = reviewID;
		this.productID = productID;
		this.userID = userID;
		this.createdAt = createdAt;
		this.rating = rating;
		this.comment = comment;
	}

	public String getReviewID() {
		return reviewID;
	}

	public void setReviewID(String reviewID) {
		this.reviewID = reviewID;
	}

	public String getProductID() {
		return productID;
	}

	public void setProductID(String productID) {
		this.productID = productID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

}
