package com.example.budgeter.dto.budget;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BudgetUpdateRequest(
        String name,
        LocalDate periodStart,
        LocalDate periodEnd,
        BigDecimal totalLimit
) {
}
