package com.example.budgeter.dto.transaction;

import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(
        String name,
        BigDecimal amount,
        @Nullable String description,
        LocalDate transactionDate,
        String type,
        Integer budgetCategoryId
) {
}
