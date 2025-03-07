package com.apt.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.apt.models.Category;

public class CategoryDAOImpl implements CategoryDAO {
    private static final Logger LOGGER = Logger.getLogger(CategoryDAOImpl.class.getName());
    private static CategoryDAOImpl instance;

    public static CategoryDAOImpl getInstance() {
        if (instance == null) {
            instance = new CategoryDAOImpl();
        }
        return instance;
    }

    private Connection getConnection() throws SQLException {
        return DataBaseConnector.getConnection();
    }

    @Override
    public int insert(Category category) {
        String sql = "INSERT INTO Categories (CategoryID, CategoryName, CategoryDescription) VALUES (?, ?, ?)";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, category.getCategoryID());
            preparedStatement.setString(2, category.getCategoryName());
            preparedStatement.setString(3, category.getCategoryDescription());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error inserting category", e);
            return 0;
        }
    }

    @Override
    public int update(Category category) {
        String sql = "UPDATE Categories SET CategoryName = ?, CategoryDescription = ? WHERE CategoryID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, category.getCategoryName());
            preparedStatement.setString(2, category.getCategoryDescription());
            preparedStatement.setString(3, category.getCategoryID());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating category", e);
            return 0;
        }
    }

    @Override
    public int delete(Category category) {
        String sql = "DELETE FROM Categories WHERE CategoryID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, category.getCategoryID());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error deleting category", e);
            return 0;
        }
    }

    @Override
    public ArrayList<Category> selectAll() {
        ArrayList<Category> categories = new ArrayList<>();
        String sql = "SELECT * FROM Categories";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                categories.add(new Category(
                        resultSet.getString("CategoryID"),
                        resultSet.getString("CategoryName"),
                        resultSet.getString("CategoryDescription")
                ));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error selecting all categories", e);
        }
        return categories;
    }

    @Override
    public Category selectById(String id) {
        String sql = "SELECT * FROM Categories WHERE CategoryID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, id);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return new Category(
                            resultSet.getString("CategoryID"),
                            resultSet.getString("CategoryName"),
                            resultSet.getString("CategoryDescription")
                    );
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error selecting category by ID", e);
        }
        return null;
    }

	@Override
	public ArrayList<Category> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}
}
