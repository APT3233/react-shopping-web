package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.apt.dao.Interface.DAOInterface;
import com.apt.model.Category;


public class CategoryDAO implements DAOInterface<Category> {

    @Override
    public int insert(Category t) {
        String sql = "INSERT INTO `category` (name, description) VALUES (?, ?)";
        int result = 0;

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, t.getName());
            pstmt.setString(2, t.getDescription());

            result = pstmt.executeUpdate(); // Returns number of affected rows (1 if success)
        } catch (SQLException e) {
            e.printStackTrace(); // Should use logging in production
        }

        return result;
    }

    @Override
    public int update(Category t) {
        String sql = "UPDATE `category` SET name = ?, description = ? WHERE category_id = ?";
        int result = 0;

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, t.getName());
            pstmt.setString(2, t.getDescription());
            pstmt.setInt(3, t.getCategoryId());

            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    @Override
    public int delete(Category t) {
        String sql = "DELETE FROM `category` WHERE category_id = ?";
        int result = 0;

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, t.getCategoryId());

            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    @Override
    public ArrayList<Category> selectAll() {
        String sql = "SELECT * FROM `category`";
        ArrayList<Category> categories = new ArrayList<>();

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                Category category = new Category(
                    rs.getInt("category_id"),
                    rs.getString("name"),
                    rs.getString("description")
                );
                categories.add(category);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return categories;
    }

    @Override
    public Category selectById(String id) throws NumberFormatException, SQLException {
        String sql = "SELECT * FROM `category` WHERE category_id = ?";
        Category category = null;

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            int categoryId = Integer.parseInt(id); // Convert String id to int
            pstmt.setInt(1, categoryId);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    category = new Category(
                        rs.getInt("category_id"),
                        rs.getString("name"),
                        rs.getString("description")
                    );
                }
            }
        } catch (SQLException e) {
            throw e; // Re-throw SQLException as required by interface
        } catch (NumberFormatException e) {
            throw e; // Re-throw NumberFormatException if id is invalid
        }

        return category;
    }

    @Override
    public ArrayList<Category> selectByCondition(String condition) {
        String sql = "SELECT * FROM `category` WHERE " + condition;
        ArrayList<Category> categories = new ArrayList<>();

        try (Connection connection = DataBaseConnector.getConnection();
             PreparedStatement pstmt = connection.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                Category category = new Category(
                    rs.getInt("category_id"),
                    rs.getString("name"),
                    rs.getString("description")
                );
                categories.add(category);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return categories;
    }
}