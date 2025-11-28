package com.example.budgeter.dto.auth;

public class AuthResponse {

    public int status;
    public String message = null;

    public AuthResponse(int status) {
        this.status = status;
    }

    public AuthResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
