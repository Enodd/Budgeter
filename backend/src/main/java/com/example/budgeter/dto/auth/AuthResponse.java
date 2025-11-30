package com.example.budgeter.dto.auth;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        String email,
        long expiresIn
) {
}
