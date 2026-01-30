package com.example.budgeter.controller;

import com.example.budgeter.dto.financial.FinancialGoalDto;
import com.example.budgeter.dto.financial.FinancialGoalRequest;
import com.example.budgeter.repository.UserRepository;
import com.example.budgeter.service.FinancialGoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/finantial_goals")
@RequiredArgsConstructor
public class FinancialGoalController {

  private final FinancialGoalService financialGoalService;
  private final UserRepository userRepository;

  @GetMapping()
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<FinancialGoalDto>> getGoals(
    @AuthenticationPrincipal UserDetails userDetails
  ) {
    System.out.println("Does it work?" + userDetails.getUsername() + userDetails.getPassword());
    var user = userRepository.findByMail(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("user not found"));
    return ResponseEntity.ok(financialGoalService.getGoalsForUser(user.getId()));
  }

  @GetMapping(params = "id")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<FinancialGoalDto> getGoal(int id) {
    return ResponseEntity.ok(financialGoalService.getGoal(id));
  }

  @PostMapping()
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<FinancialGoalDto> createGoal(@RequestBody FinancialGoalRequest request) {
    return ResponseEntity.ok(
      financialGoalService.createGoal(request)
    );
  }

  @PutMapping()
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<FinancialGoalDto> updateGoal(@RequestBody FinancialGoalDto request) {
    System.out.println("Request: "+request);
    return ResponseEntity.ok(
      financialGoalService.updateGoal(request)
    );
  }

  @DeleteMapping(params = "id")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Void> deleteGoal(@RequestParam int id) {
    financialGoalService.deleteGoal(id);
    return ResponseEntity.noContent().build();
  }
}
