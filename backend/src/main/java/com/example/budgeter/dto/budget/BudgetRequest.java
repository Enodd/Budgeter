package com.example.budgeter.dto.budget;

import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BudgetRequest(
    String name,
    LocalDate periodStart,
    @Nullable LocalDate periodEnd,
    BigDecimal totalLimit
) {
}
