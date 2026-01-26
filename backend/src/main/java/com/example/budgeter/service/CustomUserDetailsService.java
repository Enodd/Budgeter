package com.example.budgeter.service;

import com.example.budgeter.entity.User;
import com.example.budgeter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        User user = userRepository.findByMail(mail)
                .orElseThrow(() -> new UsernameNotFoundException("User does not exist"));

        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getMail())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .build();
    }
}
