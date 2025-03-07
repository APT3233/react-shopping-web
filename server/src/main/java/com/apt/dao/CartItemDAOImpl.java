package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.models.CartItem;

public class CartItemDAOImpl implements CartItemDAO {
    private static CartItemDAOImpl instance;

    public static CartItemDAOImpl getInstance() {
        if (instance == null) {
            instance = new CartItemDAOImpl();
        }
        return instance;
    }

    private Connection getConnection() throws SQLException {
        return DataBaseConnector.getConnection();
    }

    @Override
    public int insert(CartItem cartItem) {
        String sql = "INSERT INTO CartItems (CartItemID, CartID, ProductID, Quantity, AddedAt) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, cartItem.getCartItemID());
            preparedStatement.setString(2, cartItem.getCartID());
            preparedStatement.setString(3, cartItem.getProductID());
            preparedStatement.setInt(4, cartItem.getQuantity());
            preparedStatement.setDate(5, java.sql.Date.valueOf(cartItem.getAdded()));

            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public int update(CartItem cartItem) {
        String sql = "UPDATE CartItems SET Quantity = ? WHERE CartItemID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, cartItem.getQuantity());
            preparedStatement.setString(2, cartItem.getCartItemID());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public int delete(CartItem cartItem) {
        String sql = "DELETE FROM CartItems WHERE CartItemID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, cartItem.getCartItemID());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public ArrayList<CartItem> selectAll() {
        ArrayList<CartItem> cartItems = new ArrayList<>();
        String sql = "SELECT * FROM CartItems";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                cartItems.add(new CartItem(
                        resultSet.getString("CartItemID"),
                        resultSet.getString("CartID"),
                        resultSet.getString("ProductID"),
                        resultSet.getInt("Quantity"),
                        resultSet.getDate("AddedAt").toLocalDate()
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return cartItems;
    }

    @Override
    public CartItem selectById(String id) {
        String sql = "SELECT * FROM CartItems WHERE CartItemID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, id);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return new CartItem(
                            resultSet.getString("CartItemID"),
                            resultSet.getString("CartID"),
                            resultSet.getString("ProductID"),
                            resultSet.getInt("Quantity"),
                            resultSet.getDate("AddedAt").toLocalDate()
                    );
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ArrayList<CartItem> selectByCondition(String condition) {
        ArrayList<CartItem> cartItems = new ArrayList<>();
        String sql = "SELECT * FROM CartItems WHERE " + condition;
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                cartItems.add(new CartItem(
                        resultSet.getString("CartItemID"),
                        resultSet.getString("CartID"),
                        resultSet.getString("ProductID"),
                        resultSet.getInt("Quantity"),
                        resultSet.getDate("AddedAt").toLocalDate()
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return cartItems;
    }
}