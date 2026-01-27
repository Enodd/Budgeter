package com.example.budgeter.controller;

import com.example.budgeter.FinancialGoalControllerInterface;
import com.example.budgeter.dto.financial.FinancialGoalDto;
import com.example.budgeter.dto.financial.FinancialGoalRequest;
import com.example.budgeter.service.FinancialGoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/finantial_goals")
@RequiredArgsConstructor
public class FinancialGoalController implements FinancialGoalControllerInterface {

  private final FinancialGoalService financialGoalService;

  @GetMapping("/")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<FinancialGoalDto>> getGoals(int userId) {
    return ResponseEntity.ok(financialGoalService.getGoalsForUser(userId));
  }

  @GetMapping(params = "id")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<FinancialGoalDto> getGoal(int goalId) {
    return ResponseEntity.ok(financialGoalService.getGoal(goalId));
  }

  @PostMapping("/")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Void> createGoal(FinancialGoalRequest request) {
    financialGoalService.createGoal(request);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PutMapping("/")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Void> updateGoal(FinancialGoalDto request) {
    financialGoalService.updateGoal(request);
    return ResponseEntity.status(HttpStatus.OK).build();
  }

  @DeleteMapping("/")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Void> deleteGoal(int id) {
    financialGoalService.deleteGoal(id);
    return ResponseEntity.noContent().build();
  }
}
