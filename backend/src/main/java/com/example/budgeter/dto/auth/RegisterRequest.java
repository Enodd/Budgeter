package com.example.budgeter.dto.auth;

import java.time.LocalDate;

public record RegisterRequest(
        String mail,
        String password,
        String name,
        LocalDate dateOfBirth
) {
}
