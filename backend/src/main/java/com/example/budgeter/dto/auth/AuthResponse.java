package com.example.budgeter.dto.auth;

public record AuthResponse(
        String accessToken,
        String email,
        long expiresIn
) {
}
