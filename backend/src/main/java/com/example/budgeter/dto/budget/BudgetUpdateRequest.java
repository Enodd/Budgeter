package com.example.budgeter.dto.budget;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BudgetUpdateRequest(
        Integer id,
        String name,
        LocalDate periodStart,
        LocalDate periodEnd,
        BigDecimal totalLimit
) {
}
