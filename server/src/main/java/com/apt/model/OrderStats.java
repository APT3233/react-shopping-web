package com.apt.model;

public class OrderStats {
    private int total;
    private int paid;
    private int unpaid;
    
    public OrderStats() {
    }
    
    public OrderStats(int total, int paid, int unpaid) {
        this.total = total;
        this.paid = paid;
        this.unpaid = unpaid;
    }

    // Getters and setters
    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPaid() {
        return paid;
    }

    public void setPaid(int paid) {
        this.paid = paid;
    }

    public int getUnpaid() {
        return unpaid;
    }

    public void setUnpaid(int unpaid) {
        this.unpaid = unpaid;
    }
}