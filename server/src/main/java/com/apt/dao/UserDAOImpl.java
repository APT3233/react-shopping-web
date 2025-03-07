package com.apt.dao;

import java.sql.*;

import java.util.ArrayList;
import com.apt.models.User;

public class UserDAOImpl implements UserDAO {
	
	// Create a object follow single ton structure
    private static UserDAO instance;

    public static UserDAO getInstance() {
        if (instance == null) {
            instance = new UserDAOImpl();
        }
        return instance;
    }
    // get connection from database
    
    private Connection getConnection() throws SQLException {
        return DataBaseConnector.getConnection();
    }

    @Override
    public int insert(User user) {
        String sql = "INSERT INTO Users (userID, fullName, passwordHash, phone, address, role, createdAt, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, user.getUserID());
            preparedStatement.setString(2, user.getFullName());
            preparedStatement.setString(3, user.getPasswordHash());
            preparedStatement.setString(4, user.getPhone());
            preparedStatement.setString(5, user.getAddress());
            preparedStatement.setString(6, user.getRole());
            preparedStatement.setDate(7, Date.valueOf(user.getCreatedAt()));
            preparedStatement.setString(8, user.getEmail());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public int update(User user) {
        String sql = "UPDATE Users SET fullName = ?, passwordHash = ?, phone = ?, address = ?, role = ?, createdAt = ?, email = ? WHERE userID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, user.getFullName());
            preparedStatement.setString(2, user.getPasswordHash());
            preparedStatement.setString(3, user.getPhone());
            preparedStatement.setString(4, user.getAddress());
            preparedStatement.setString(5, user.getRole());
            preparedStatement.setDate(6, Date.valueOf(user.getCreatedAt()));
            preparedStatement.setString(7, user.getEmail());
            preparedStatement.setString(8, user.getUserID());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public int delete(User user) {
        String sql = "DELETE FROM Users WHERE userID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, user.getUserID());
            return preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public ArrayList<User> selectAll() {
        ArrayList<User> users = new ArrayList<>();
        String sql = "SELECT * FROM Users";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                users.add(new User(
                        resultSet.getString("userID"),
                        resultSet.getString("fullName"),
                        resultSet.getString("passwordHash"),
                        resultSet.getString("phone"),
                        resultSet.getString("address"),
                        resultSet.getString("role"),
                        resultSet.getDate("createdAt").toLocalDate(),
                        resultSet.getString("email")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return users;
    }

    @Override
    public User selectById(String userID) {
        String sql = "SELECT * FROM Users WHERE userID = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, userID);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return new User(
                            resultSet.getString("userID"),
                            resultSet.getString("fullName"),
                            resultSet.getString("passwordHash"),
                            resultSet.getString("phone"),
                            resultSet.getString("address"),
                            resultSet.getString("role"),
                            resultSet.getDate("createdAt").toLocalDate(),
                            resultSet.getString("email")
                    );
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

	@Override
	public ArrayList<User> selectByCondition(String condition) {
		// TODO Auto-generated method stub
		return null;
	}
}
