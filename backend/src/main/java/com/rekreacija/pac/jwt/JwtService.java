package com.rekreacija.pac.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    public static final long DEFAULT_EXPIRATION_TIME = 1000 * 60 * 60; // 1h
    public static final long REMEMBER_ME_EXPIRATION_TIME = 1000L * 60 * 60 * 24 * 7; // 1 sat
    private static final String SECRET_KEY = "supersecretkeysupersecretkey123456"; // min 256-bit za HS256

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username, int user_id, int type_id, long expirationMillis) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user_id);
        claims.put("typeId", type_id);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Long extractUserId(String token) {
        return extractAllClaims(token).get("userId", Long.class);
    }

    public Long extractTypeId(String token) {
        return extractAllClaims(token).get("typeId", Long.class);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}

