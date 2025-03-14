package com.apt.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DataBaseConnector {
    private static HikariDataSource dataSource;
    private static String SECRET_KEY;

    static {
        try {
            Properties properties = new Properties();
            try (InputStream input = DataBaseConnector.class.getClassLoader().getResourceAsStream("application.properties")) {
                if (input == null) {
                    throw new RuntimeException("Không tìm thấy file application.properties trong classpath.");
                }
                properties.load(input);
            }

            SECRET_KEY = properties.getProperty("SECRET_KEY");
            if (SECRET_KEY == null || SECRET_KEY.isEmpty()) {
                throw new RuntimeException("SECRET_KEY không được cấu hình trong application.properties!");
            }

            // Set thuộc tính thủ công
            HikariConfig config = new HikariConfig();
            config.setDriverClassName(properties.getProperty("driverClassName"));

            // Thêm allowPublicKeyRetrieval=true vào JDBC URL
            String jdbcUrl = properties.getProperty("jdbcUrl");
            if (jdbcUrl != null && !jdbcUrl.contains("allowPublicKeyRetrieval=true")) {
                jdbcUrl += (jdbcUrl.contains("?") ? "&" : "?") + "allowPublicKeyRetrieval=true";
            }
            config.setJdbcUrl(jdbcUrl);

            config.setUsername(properties.getProperty("username"));
            config.setPassword(properties.getProperty("password"));
            config.setMaximumPoolSize(Integer.parseInt(properties.getProperty("maximumPoolSize", "10")));
            config.setMinimumIdle(Integer.parseInt(properties.getProperty("minimumIdle", "5")));
            config.setIdleTimeout(Long.parseLong(properties.getProperty("idleTimeout", "30000")));
            config.setConnectionTimeout(Long.parseLong(properties.getProperty("connectionTimeout", "30000")));
            config.setValidationTimeout(Long.parseLong(properties.getProperty("validationTimeout", "5000")));
            config.setLeakDetectionThreshold(Long.parseLong(properties.getProperty("leakDetectionThreshold", "2000")));

            // Load driver
            Class.forName(properties.getProperty("driverClassName"));
            System.out.println("✅ JDBC Driver loaded!");

            // Khởi tạo HikariDataSource
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

    public static String getSecretKey() {
        return SECRET_KEY;
    }

    public static void close() {
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
            System.out.println("✅ Đã đóng HikariDataSource!");
        }
    }
}