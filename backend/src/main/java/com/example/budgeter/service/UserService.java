package com.example.budgeter.service;

import com.example.budgeter.dto.UserDto;
import com.example.budgeter.dto.UserUpdateRequest;
import com.example.budgeter.entity.User;
import com.example.budgeter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  private UserDto toDto(User user) {
    return new UserDto(
      user.getId(),
      user.getName(),
      user.getMail(),
      user.getNickname(),
      user.getDateofbirth(),
      user.getRole()
    );
  }

  public UserDto getUser(String mail) {
    var user = userRepository.findByMail(mail).orElseThrow(() -> new RuntimeException("User does not exist"));
    return this.toDto(user);
  }

  public void updateUser(UserUpdateRequest request) {
    User user = userRepository.findByMail(request.mail()).orElseThrow(() -> new RuntimeException("User does not exist"));

    if(request.name() != null) {
      user.setName(request.name());
    }
    if(request.mail() != null) {
      user.setMail(request.mail());
    }
    if(request.nickname() != null) {
      user.setNickname(request.nickname());
    }
    if(request.dateofbirth() != null) {
      user.setDateofbirth(request.dateofbirth());
    }

    userRepository.save(user);
  }
}
