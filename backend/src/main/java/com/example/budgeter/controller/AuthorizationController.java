package com.example.budgeter.controller;

import com.example.budgeter.dto.auth.AuthResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthorizationController {

    @PostMapping("/login")
    public AuthResponse login() {
        return new AuthResponse(200, "Good");
    }
}
