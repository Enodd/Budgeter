package com.example.budgeter.dto;

import com.example.budgeter.enums.Role;

import java.time.LocalDate;

public record UserDto(
  Integer id,
  String name,
  String mail,
  String nickname,
  LocalDate dateofbirth,
  Role role
) {
}
