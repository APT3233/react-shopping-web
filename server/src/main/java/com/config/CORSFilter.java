package com.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class CORSFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Bạn có thể thêm các cấu hình ban đầu tại đây nếu cần
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.setHeader("Access-Control-Allow-Origin", CORSConfig.ALLOW_ORIGIN);
        httpResponse.setHeader("Access-Control-Allow-Methods", CORSConfig.ALLOW_METHODS);
        httpResponse.setHeader("Access-Control-Allow-Headers", CORSConfig.ALLOW_HEADERS);

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        
    }
}
