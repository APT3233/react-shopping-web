package com.apt.model;

public class CartItem {
    private int orderId;
    private int userId;
    private int productId;
    private String productName; 
    private String productImage;
    private int numberBuy;
    private double price;
    private String status;
    private String date;
    private int quantity;    
    public CartItem() {
    }
    
    public CartItem(int orderId, int userId, int productId, String productName, String productImage, 
                   int numberBuy, double price, String status, String date, int quanity) {
        this.orderId = orderId;
        this.userId = userId;
        this.productId = productId;
        this.productName = productName;
        this.productImage = productImage;
        this.numberBuy = numberBuy;
        this.price = price;
        this.status = status;
        this.date = date;
        this.quantity = quanity;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setQuanity(int quanity) {
      this.quantity = quanity;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }
    
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public int getNumberBuy() {
        return numberBuy;
    }

    public void setNumberBuy(int numberBuy) {
        this.numberBuy = numberBuy;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getQuanity() {
      return quantity;
    }
}