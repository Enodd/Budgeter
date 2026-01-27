package com.example.budgeter;

import com.example.budgeter.dto.financial.FinancialGoalDto;
import com.example.budgeter.dto.financial.FinancialGoalRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface FinancialGoalControllerInterface {
  ResponseEntity<List<FinancialGoalDto>> getGoals(int userId);
  ResponseEntity<FinancialGoalDto> getGoal(int goalId);
  ResponseEntity<Void> createGoal(@RequestBody FinancialGoalRequest request);
  ResponseEntity<Void> updateGoal(@RequestBody FinancialGoalDto request);
  ResponseEntity<Void> deleteGoal(int id);
}
