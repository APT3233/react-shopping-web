package com.apt.model;

import java.sql.Timestamp;

public class Order {
    private int orderId;
    private int userId;
    private int productId;
    private int numberBuy;
    private double price;
    private String status; 
    private String address;
    private Timestamp date;

    public Order() {}

    public Order(int orderId, int userId, int productId, int numberBuy, double price, String status, String address, Timestamp date) {
        this.orderId = orderId;
        this.userId = userId;
        this.productId = productId;
        this.numberBuy = numberBuy;
        this.price = price;
        this.status = status;
        this.address = address;
        this.date = date;
    }

    // Getter & Setter
    public int getOrderId() { return orderId; }
    public void setOrderId(int orderId) { this.orderId = orderId; }
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }
    public int getNumberBuy() { return numberBuy; }
    public void setNumberBuy(int numberBuy) { this.numberBuy = numberBuy; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public Timestamp getDate() { return date; }
    public void setDate(Timestamp date) { this.date = date; }
}