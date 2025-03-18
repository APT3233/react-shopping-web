package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.dao.Interface.DAOInterface;
import com.apt.model.Order;
import java.sql.ResultSet;


public class CartDAO implements DAOInterface<Order> {

    @Override
    public int insert(Order order) {
        String sql = "INSERT INTO `order` (user_id, product_id, number_buy, price, status) VALUES (?, ?, ?, ?, 'unpaid')";
        int result = -1; 

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, order.getUserId());      // user_id
            pstmt.setInt(2, order.getProductId());   // product_id
            pstmt.setInt(3, order.getNumberBuy());   // number_buy
            pstmt.setDouble(4, order.getPrice());    // price

            result = pstmt.executeUpdate(); 
        } catch (SQLException e) {
            e.printStackTrace(); 
        }

        return result;
    }

    @Override
    public int update(Order order) {
        String sql = "UPDATE `order` SET user_id = ?, product_id = ?, number_buy = ?, price = ?, status = ?, address = ? WHERE order_id = ?";
        int result = -1;

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, order.getUserId());
            pstmt.setInt(2, order.getProductId());
            pstmt.setInt(3, order.getNumberBuy());
            pstmt.setDouble(4, order.getPrice());
            pstmt.setString(5, order.getStatus());
            pstmt.setString(6, order.getAddress());
            pstmt.setInt(7, order.getOrderId());

            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    @Override
    public int delete(Order order) {
        String sql = "DELETE FROM `order` WHERE order_id = ?";
        int result = -1;

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, order.getOrderId());

            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    @Override
    public ArrayList<Order> selectAll() {
        String sql = "SELECT * FROM `order`";
        ArrayList<Order> orders = new ArrayList<>();

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                Order order = new Order(
                    rs.getInt("order_id"),
                    rs.getInt("user_id"),
                    rs.getInt("product_id"),
                    rs.getInt("number_buy"),
                    rs.getDouble("price"),
                    rs.getString("status"),
                    rs.getString("address"),
                    rs.getTimestamp("date")
                );
                orders.add(order);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return orders;
    }

    @Override
    public Order selectById(String id) throws NumberFormatException, SQLException {
        String sql = "SELECT * FROM `order` WHERE order_id = ?";
        Order order = null;

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            int orderId = Integer.parseInt(id); 
            pstmt.setInt(1, orderId);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    order = new Order(
                        rs.getInt("order_id"),
                        rs.getInt("user_id"),
                        rs.getInt("product_id"),
                        rs.getInt("number_buy"),
                        rs.getDouble("price"),
                        rs.getString("status"),
                        rs.getString("address"),
                        rs.getTimestamp("date")
                    );
                }
            }
        } catch (SQLException e) {
            throw e; 
        } catch (NumberFormatException e) {
            throw e;
        }

        return order;
    }

    @Override
    public ArrayList<Order> selectByCondition(String condition) {
        String sql = "SELECT * FROM `order` WHERE " + condition;
        ArrayList<Order> orders = new ArrayList<>();

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                Order order = new Order(
                    rs.getInt("order_id"),
                    rs.getInt("user_id"),
                    rs.getInt("product_id"),
                    rs.getInt("number_buy"),
                    rs.getDouble("price"),
                    rs.getString("status"),
                    rs.getString("address"),
                    rs.getTimestamp("date")
                );
                orders.add(order);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return orders;
    }
}