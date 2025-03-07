package com.apt.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DataBaseConnector {
    private static HikariDataSource dataSource;

    static {
        try {
            Properties properties = new Properties();
            try (InputStream input = DataBaseConnector.class.getClassLoader().getResourceAsStream("db.properties")) {
                if (input == null) {
                    throw new RuntimeException("Không tìm thấy file db.properties trong classpath.");
                }
                properties.load(input);
            }

            Class.forName(properties.getProperty("driverClassName"));
            System.out.println("✅ JDBC Driver loaded!");

            HikariConfig config = new HikariConfig(properties);
            dataSource = new HikariDataSource(config);
            System.out.println("✅ HikariDataSource khởi tạo thành công!");

        } catch (Exception e) {
            System.err.println("❌ Lỗi khi khởi tạo HikariDataSource: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        if (dataSource == null) {
            throw new SQLException("HikariDataSource chưa được khởi tạo!");
        }
        return dataSource.getConnection();
    }

    public static void close() {
        if (dataSource != null) {
            dataSource.close();
            System.out.println("✅ Đã đóng kết nối!");
        }
    }
}
