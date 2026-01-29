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
@Table(name = "transactions")
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "budget_category_id")
  private BudgetCategory budgetCategory;

  @NotNull
  @Column(name = "amount", nullable = false, precision = 12, scale = 2)
  private BigDecimal amount;

  @Column(name = "description", length = Integer.MAX_VALUE)
  private String description;

  @NotNull
  @Column(name = "transaction_date", nullable = false)
  private LocalDate transactionDate;

  @Size(max = 20)
  @NotNull
  @Column(name = "type", nullable = false, length = 20)
  private String type;


}