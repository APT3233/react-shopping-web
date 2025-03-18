package com.apt.model;

public class Product {
    private int productId;
    private int categoryId;
    private String name;
    private double price;
    private int quantity;
    private double discount;
    private Float rating;
    private Float reviews;
    private String description;
    private String imgLink;

    // Constructor mặc định
    public Product() {}

    // Constructor đầy đủ
    public Product(int productId, int categoryId, String name, double price, int quantity,
                   double discount, Float rating, Float reviews, String description, String imgLink) {
        this.productId = productId;
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

    // Getters và Setters
    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }
    public int getCategoryId() { return categoryId; }
    public void setCategoryId(int categoryId) { this.categoryId = categoryId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getDiscount() { return discount; }
    public void setDiscount(double discount) { this.discount = discount; }
    public Float getRating() { return rating; }
    public void setRating(Float rating) { this.rating = rating; }
    public Float getReviews() { return reviews; }
    public void setReviews(Float reviews) { this.reviews = reviews; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImgLink() { return imgLink; }
    public void setImgLink(String imgLink) { this.imgLink = imgLink; }
}