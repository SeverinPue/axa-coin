package com.ch.axa.its.axacoin.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "jlzHvujBstQsnr4D/Ad3PzOejkvyb5tzGUl9N0NcU12fgimuW/iTTxMSt7lIKAYLPzIaBwtEw/+IXg7eZY+bDS44mVfV7/JxyCTH/WkLPYb50jlQ4BB5oPyvluXcLEXtsf9rxAToP6/9Jb2GIyWj821VgSTs+KoCJo2rIJqxkyd6aWOuwuq7PwoBqCbfA1SejSlDbVU0QxX8auTG7/vQBkzJsEuMx22JUI4hZ74JGptqqrZgZIYnd+Fo5VPHlNpRyqDetNMyQXohyrhm2IEQN7hW7o1xxlwTpSJ+b1b/lL6XHIV0roTRC81coY5+bbIJweah1ciLPvN5R2VQ78mwDL1uu3XWzTuVecaF3JcqwXM=";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }


    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails) {

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
