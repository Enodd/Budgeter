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
@Table(name = "budgets")
public class Budget {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 40)
  @NotNull
  @Column(name = "name", nullable = false, length = 40)
  private String name;

  @NotNull
  @Column(name = "period_start", nullable = false)
  private LocalDate periodStart;

  @NotNull
  @Column(name = "period_end", nullable = false)
  private LocalDate periodEnd;

  @Column(name = "total_limit", precision = 12, scale = 2)
  private BigDecimal totalLimit;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "budget_category_id")
  private BudgetCategory budgetCategory;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_user")
  private User idUser;


}