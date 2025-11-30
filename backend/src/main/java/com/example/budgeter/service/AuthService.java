package com.example.budgeter.service;

import com.example.budgeter.dto.auth.AuthResponse;
import com.example.budgeter.dto.auth.LoginRequest;
import com.example.budgeter.dto.auth.RegisterRequest;
import com.example.budgeter.entity.User;
import com.example.budgeter.enums.Role;
import com.example.budgeter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

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
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return new AuthResponse(accessToken, refreshToken, user.getMail(), accessTokenExpiration);
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

        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        user.setRefreshtoken(refreshToken);
        user.setRefreshtokenexpirydate(LocalDateTime.now().plusDays(7));

        return new AuthResponse(accessToken, refreshToken, user.getMail(), accessTokenExpiration / 1000);
    }

    public AuthResponse refreshToken(String refreshToken) {
        String mail = jwtService.extractUsername(refreshToken);
        User user = userRepository
                .findByMail(mail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!refreshToken.equals(user.getRefreshtoken())) {
            throw new RuntimeException("Refresh token does not match");
        }

        if (user.getRefreshtokenexpirydate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh token expired");
        }

        UserDetails userDetails = this.buildUserDetails(user);

        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            throw new RuntimeException("Token is invalid");
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);
        String newRefreshToken = jwtService.generateRefreshToken(userDetails);

        return  new AuthResponse(newAccessToken, newRefreshToken, user.getMail(), accessTokenExpiration / 1000);
    }

    private UserDetails buildUserDetails(User user) {
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getMail())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .build();
    }
}
