package com.example.budgeter.controller;

import com.example.budgeter.dto.UserDto;
import com.example.budgeter.dto.UserUpdateRequest;
import com.example.budgeter.service.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDto> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        String mail = userDetails.getUsername();
        return ResponseEntity.ok(userService.getUser(mail));
    }

    @PutMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updateUser(
      @RequestBody UserUpdateRequest request
      ) {
        userService.updateUser(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
