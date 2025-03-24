package com.apt.model;

import java.sql.Timestamp;

public class OrderHistory {
    private int id;
    private String product;
    private int numberBuy;
    private double price;
    private Timestamp date;
    private String status;
    
    public OrderHistory() {
    }
    
    public OrderHistory(int id, String product, int numberBuy, double price, Timestamp date, String status) {
        this.id = id;
        this.product = product;
        this.numberBuy = numberBuy;
        this.price = price;
        this.date = date;
        this.status = status;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
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

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}