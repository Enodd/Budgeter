package com.example.budgeter.dto.budget;

import com.example.budgeter.dto.transaction.TransactionDto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BudgetWithTransactions {
  public Integer id;
  public String name;
  public LocalDate periodStart;
  public LocalDate periodEnd;
  public BigDecimal totalLimit;
  public List<TransactionDto> transactions;

  public BudgetWithTransactions(
    BudgetDto budget
  ) {
    this.id = budget.id();
    this.name = budget.name();
    this.periodStart = budget.periodStart();
    this.periodEnd = budget.periodEnd();
    this.totalLimit = budget.totalLimit();
    this.transactions = new ArrayList<>();
  }

  public BudgetWithTransactions appendTransactions(List<TransactionDto> transactions) {
    this.transactions = transactions;
    return this;
  }
}
