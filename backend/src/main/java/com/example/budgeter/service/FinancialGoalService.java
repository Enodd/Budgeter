package com.example.budgeter.service;

import com.example.budgeter.dto.financial.FinancialGoalDto;
import com.example.budgeter.dto.financial.FinancialGoalRequest;
import com.example.budgeter.entity.FinancialGoal;
import com.example.budgeter.repository.FinancialGoalRepository;
import com.example.budgeter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinancialGoalService {
  private final FinancialGoalRepository financialGoalRepository;
  private final UserRepository userRepository;

  private FinancialGoalDto toDto(FinancialGoal fg) {
    return new FinancialGoalDto(
      fg.getId(),
      fg.getUser().getId(),
      fg.getName(),
      fg.getTargetAmount(),
      fg.getCurrentAmount(),
      fg.getDeadline(),
      fg.getPriority()
    );
  }

  public List<FinancialGoalDto> getGoalsForUser(int userId) {
    var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("No such user"));

    return financialGoalRepository
      .findAllByUser(user)
      .orElseThrow(() -> new RuntimeException("No goals"))
      .stream()
      .map(this::toDto)
      .toList();
  }

  public FinancialGoalDto getGoal(int id) {
    return this.toDto(
      financialGoalRepository
        .findById(id)
        .orElseThrow(() -> new RuntimeException("No goals"))
    );
  }

  public FinancialGoalDto createGoal(FinancialGoalRequest request) {
    var goal = new FinancialGoal();
    System.out.println("====================");
    System.out.println(goal);
    System.out.println(request);
    var user = userRepository.findById(request.userId()).orElseThrow(() -> new RuntimeException("No such user"));
    goal.setUser(user);
    goal.setName(request.name());
    goal.setTargetAmount(request.targetAmount());
    goal.setCurrentAmount(request.currentAmount());
    goal.setDeadline(request.deadline());
    goal.setPriority(request.priority());

    var createdGoal = financialGoalRepository.save(goal);
    return this.toDto(createdGoal);
  }

  public FinancialGoalDto updateGoal(FinancialGoalDto request) {
    var goal = financialGoalRepository.findById(request.id()).orElseThrow(() -> new RuntimeException("No such goal"));

    if (request.name() != null) {
      goal.setName(request.name());
    }
    if (request.targetAmount() != null) {
      goal.setTargetAmount(request.targetAmount());
    }
    if (request.currentAmount() != null) {
      goal.setCurrentAmount(request.currentAmount());
    }
    if (request.deadline() != null) {
      goal.setDeadline(request.deadline());
    }
    if (request.priority() != null) {
      goal.setPriority(request.priority());
    }
    var updatedGoal = financialGoalRepository.save(goal);
    return this.toDto(updatedGoal);
  }

  public void deleteGoal(int goalId) {
    financialGoalRepository.deleteById(goalId);
  }
}
