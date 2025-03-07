package com.apt.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;

import java.awt.RenderingHints.Key;
import java.io.UnsupportedEncodingException;
import java.util.Date;

public class JwtUtils {
    private static final String SECRET_KEY = "your_secret_key_your_secret_key_";
    private static final long EXPIRATION_TIME = 86400000; // 1 ngày

    private static Key getSigningKey() {
        try {
			return (Key) Keys.hmacShaKeyFor(SECRET_KEY.getBytes("UTF-8"));
		} catch (WeakKeyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
    }

    @SuppressWarnings("deprecation")
	public static String generateToken(String email, String role) {
        if (email == null || email.isEmpty() || role == null || role.isEmpty()) {
            throw new IllegalArgumentException("Email và role không được để trống.");
        }
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith((java.security.Key) getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public static Jws<Claims> parseToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKeyResolver((SigningKeyResolver) getSigningKey())
                    .build()
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            System.out.println("Token đã hết hạn.");
        } catch (SignatureException e) {
            System.out.println("Chữ ký token không hợp lệ.");
        } catch (MalformedJwtException e) {
            System.out.println("Định dạng token không hợp lệ.");
        } catch (UnsupportedJwtException e) {
            System.out.println("Loại token không được hỗ trợ.");
        } catch (IllegalArgumentException e) {
            System.out.println("Tham số không hợp lệ.");
        }
        return null;
    }
}