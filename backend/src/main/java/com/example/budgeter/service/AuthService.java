package com.example.budgeter.service;

import com.example.budgeter.dto.auth.AuthResponse;
import com.example.budgeter.dto.auth.LoginRequest;
import com.example.budgeter.dto.auth.RegisterRequest;
import com.example.budgeter.entity.User;
import com.example.budgeter.enums.Role;
import com.example.budgeter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.TreeSet;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByMail(request.mail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setMail(request.mail());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setName(request.name());
        user.setDateofbirth(request.dateOfBirth());
        user.setRole(Role.USER);

        userRepository.save(user);

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getMail())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .build();
        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(token, user.getMail());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.mail(),
                        request.password()
                )
        );
        User user = userRepository.findByMail(request.mail())
                .orElseThrow();

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getMail())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .build();

        String jwtToken = jwtService.generateToken(userDetails);

        return new AuthResponse(jwtToken, user.getMail());
    }
}
