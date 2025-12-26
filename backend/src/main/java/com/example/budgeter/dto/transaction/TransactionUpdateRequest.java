package com.example.budgeter.dto.transaction;

import jakarta.annotation.Nullable;
import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionUpdateRequest(
    String name,
    BigDecimal amount,
    String description,
    LocalDate transactionDate,
    String type,
    Integer budgetCategoryId
) {}
