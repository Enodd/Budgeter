package com.example.budgeter.dto.budget;

import java.math.BigDecimal;

public record BudgetCategoryDto(
  Integer id,
  String name,
  BigDecimal plannedAmount,
  BigDecimal spentAmount,
  BigDecimal limitAmount,
  String color
) {
}
