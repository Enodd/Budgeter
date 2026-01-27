package com.example.budgeter.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "recurring_transactions")
public class RecurringTransaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "budget_category_id")
  private BudgetCategory budgetCategory;

  @NotNull
  @Column(name = "amount", nullable = false, precision = 12, scale = 2)
  private BigDecimal amount;

  @Size(max = 20)
  @NotNull
  @Column(name = "frequency", nullable = false, length = 20)
  private String frequency;

  @Column(name = "next_occurrence")
  private LocalDate nextOccurrence;

  @Column(name = "description", length = Integer.MAX_VALUE)
  private String description;


}