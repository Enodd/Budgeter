package com.example.budgeter.dto.transaction;

import jakarta.annotation.Nullable;
import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionPutRequest(
    @Nullable String name,
    @Nullable BigDecimal amount,
    @Nullable String description,
    @Nullable LocalDate transactionDate,
    @Nullable String type,
    @Nullable Integer budgetCategoryId
) {}
