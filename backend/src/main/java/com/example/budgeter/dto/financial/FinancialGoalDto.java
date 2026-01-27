package com.example.budgeter.dto.financial;

import java.math.BigDecimal;
import java.time.LocalDate;

public record FinancialGoalDto(
  Integer id,
  Integer userId,
  String name,
  BigDecimal targetAmount,
  BigDecimal currentAmount,
  LocalDate deadline,
  Integer priority
) {
}
