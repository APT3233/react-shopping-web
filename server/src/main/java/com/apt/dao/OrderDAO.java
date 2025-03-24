package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.apt.model.CartItem;
import com.apt.model.Order;

public class OrderDAO {

    private Connection getConnection() throws SQLException {
        return DataBaseConnector.getConnection();
    }

    public int addOrder(Order order) throws SQLException {
        try (Connection conn = getConnection()) {
            String checkSql = "SELECT order_id FROM `order` WHERE user_id = ? AND product_id = ? AND status = 'unpaid'";
            try (PreparedStatement checkPs = conn.prepareStatement(checkSql)) {
                checkPs.setInt(1, order.getUserId());
                checkPs.setInt(2, order.getProductId());
                try (ResultSet rs = checkPs.executeQuery()) {
                    if (rs.next()) {
                        return -1; // Product already exists
                    }
                }
            }

            String insertSql = "INSERT INTO `order` (user_id, product_id, number_buy, price, status) VALUES (?, ?, ?, ?, ?)";
            try (PreparedStatement insertPs = conn.prepareStatement(insertSql)) {
                insertPs.setInt(1, order.getUserId());
                insertPs.setInt(2, order.getProductId());
                insertPs.setInt(3, 1);
                insertPs.setDouble(4, order.getPrice());
                insertPs.setString(5, order.getStatus());

                return insertPs.executeUpdate();
            }
        }
    }

    public List<CartItem> getCartItems(int userId) throws SQLException {
        List<CartItem> cartItems = new ArrayList<>();

        try (Connection conn = getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "SELECT o.order_id, o.user_id, o.product_id, p.name AS product_name, p.quantity, " +
                                "p.img_link AS product_image, o.number_buy, o.price, o.status, o.date " +
                                "FROM `order` o " +
                                "JOIN `product` p ON o.product_id = p.product_id " +
                                "WHERE o.user_id = ? AND o.status = 'unpaid' " +
                                "ORDER BY o.date DESC")) {

            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    CartItem item = new CartItem();
                    item.setOrderId(rs.getInt("order_id"));
                    item.setUserId(rs.getInt("user_id"));
                    item.setProductId(rs.getInt("product_id"));
                    item.setProductName(rs.getString("product_name"));
                    item.setProductImage(rs.getString("product_image"));
                    item.setNumberBuy(rs.getInt("number_buy"));
                    item.setPrice(rs.getDouble("price"));
                    item.setStatus(rs.getString("status"));
                    item.setDate(rs.getString("date"));
                    item.setQuanity(rs.getInt("quantity"));

                    cartItems.add(item);
                }
            }
            return cartItems;
        }
    }

    /**
     * Clear all unpaid orders (all users' carts)
     * 
     * @return Number of records deleted
     */
    public int clearAllCarts() throws SQLException {
        try (Connection conn = getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "DELETE FROM `order` WHERE status = 'unpaid'")) {
            return ps.executeUpdate();
        }
    }

    /**
     * Clear all unpaid orders for a specific user (user's cart)
     * 
     * @param userId The ID of the user whose cart needs to be cleared
     * @return Number of records deleted
     */
    public int clearUserCart(int userId) throws SQLException {
        try (Connection conn = getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "DELETE FROM `order` WHERE user_id = ? AND status = 'unpaid'")) {
            ps.setInt(1, userId);
            return ps.executeUpdate();
        }
    }

    /**
     * Update orders with new numberBuy values and change status to paid
     * 
     * @param address   Delivery address
     * @param cartItems List of cart items with orderIds and numberBuy values
     * @return Number of orders successfully updated
     */
    public int updateOrders(String address, List<CartItem> cartItems) throws SQLException {
        if (cartItems == null || cartItems.isEmpty()) {
            return 0;
        }

        int updatedCount = 0;

        try (Connection conn = getConnection();
                PreparedStatement ps = conn.prepareStatement(
                        "UPDATE `order` SET number_buy = ?, status = 'paid', address = ? WHERE order_id = ? AND status = 'unpaid'")) {

            conn.setAutoCommit(false);

            for (CartItem item : cartItems) {
                ps.setInt(1, item.getNumberBuy());
                ps.setString(2, address);
                ps.setInt(3, item.getOrderId());
                ps.addBatch(); 
            }

            int[] results = ps.executeBatch();
            for (int result : results) {
                updatedCount += (result > 0 ? 1 : 0); 
            }

            conn.commit();
            return updatedCount;

        } catch (SQLException e) {
            try (Connection conn = getConnection()) {
                if (conn != null && !conn.isClosed()) {
                    conn.rollback();
                }
            } catch (SQLException rollbackEx) {
                System.err.println(rollbackEx);
            }
            throw e; 
        }
    }

}