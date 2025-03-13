package com.apt.config;

import com.apt.dao.DataBaseConnector;
import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class AppShutdownListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("✅ App Initial...");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        DataBaseConnector.close();
        System.out.println("✅ Close current listener: " + new java.util.Date());

        try {
            AbandonedConnectionCleanupThread.checkedShutdown();
            System.out.println("✅ Đã dừng AbandonedConnectionCleanupThread tại: " + new java.util.Date());
        } catch (Exception e) {
            System.err.println("❌ Lỗi khi dừng AbandonedConnectionCleanupThread: " + e.getMessage());
            e.printStackTrace();
        }
    }
}