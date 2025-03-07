package com.apt.model;

public class Product {

    private int productId;
    private int categoryId;
    private String name;
    private double price;
    private int quantity;
    private double discount;
    private float rating;
    private float reviews;
    private String description;
    private String imgLink;

    public Product() {
    }

    public Product(int categoryId, String name, double price, int quantity, 
                   double discount, float rating, float reviews, String description, String imgLink) {
        this.categoryId = categoryId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.rating = rating;
        this.reviews = reviews;
        this.description = description;
        this.imgLink = imgLink;
    }

    public int getProductId() {
        return productId;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }
    public int getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public double getDiscount() {
        return discount;
    }
    public void setDiscount(double discount) {
        this.discount = discount;
    }
    public float getRating() {
        return rating;
    }
    public void setRating(float rating) {
        this.rating = rating;
    }
    public float getReviews() {
        return reviews;
    }
    public void setReviews(float reviews) {
        this.reviews = reviews;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getImgLink() {
        return imgLink;
    }
    public void setImgLink(String imgLink) {
        this.imgLink = imgLink;
    }
}
