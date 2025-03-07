package com.apt.dao;

import java.sql.*;
import java.util.ArrayList;
import com.apt.models.Product;

public class ProductDAOImpl implements ProductDAO {
    private static ProductDAOImpl instance;
    
    public static ProductDAOImpl getInstance() {
        if (instance == null) {
            instance = new ProductDAOImpl();
        }
        return instance;
    }
    
    private Connection getConnection() throws SQLException {
        return DataBaseConnector.getConnection();
    }
    
    @Override
    public int insert(Product product) {
        String sql = "INSERT INTO Products (productID, productName, price, categoryID, productDescription, stockQuantity, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, product.getProductID());
            preparedStatement.setString(2, product.getProductName());
            preparedStatement.setDouble(3, product.getPrice());
            preparedStatement.setString(4, product.getCategoryID());
            preparedStatement.setString(5, product.getProductDescription());
            preparedStatement.setInt(6, product.getStockQuantity());
            preparedStatement.setDate(7, Date.valueOf(product.getCreatedAt()));
            
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    @Override
    public int update(Product product) {
        String sql = "UPDATE Products SET productName=?, price=?, categoryID=?, productDescription=?, stockQuantity=? WHERE productID=?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, product.getProductName());
            preparedStatement.setDouble(2, product.getPrice());
            preparedStatement.setString(3, product.getCategoryID());
            preparedStatement.setString(4, product.getProductDescription());
            preparedStatement.setInt(5, product.getStockQuantity());
           
            preparedStatement.setString(6, product.getProductID());
            
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    @Override
    public int delete(Product product) {
        String sql = "DELETE FROM Products WHERE productID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, product.getProductID());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }
    
    @Override
    public ArrayList<Product> selectAll() {
        ArrayList<Product> products = new ArrayList<>();
        String sql = "SELECT * FROM Products";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                products.add(new Product(
                        resultSet.getString("productID"),
                        resultSet.getString("productName"),
                        resultSet.getDouble("price"),
                        resultSet.getString("categoryID"),
                        resultSet.getString("productDescription"),
                        resultSet.getInt("stockQuantity"),
                        resultSet.getDate("createdAt").toLocalDate()
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }
    
    @Override
    public Product selectById(String id) {
        String sql = "SELECT * FROM Products WHERE productID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return new Product(
                        resultSet.getString("productID"),
                        resultSet.getString("productName"),
                        resultSet.getDouble("price"),
                        resultSet.getString("categoryID"),
                        resultSet.getString("productDescription"),
                        resultSet.getInt("stockQuantity"),
                        resultSet.getDate("createdAt").toLocalDate()
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public ArrayList<Product> selectByCondition(String condition) {
        ArrayList<Product> products = new ArrayList<>();
        String sql = "SELECT * FROM Products WHERE " + condition;
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                products.add(new Product(
                        resultSet.getString("productID"),
                        resultSet.getString("productName"),
                        resultSet.getDouble("price"),
                        resultSet.getString("categoryID"),
                        resultSet.getString("productDescription"),
                        resultSet.getInt("stockQuantity"),
                        resultSet.getDate("createdAt").toLocalDate()
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }
}
