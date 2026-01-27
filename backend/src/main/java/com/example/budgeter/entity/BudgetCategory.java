package com.example.budgeter.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "budget_categories")
public class BudgetCategory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 40)
  @NotNull
  @Column(name = "name", nullable = false, length = 40)
  private String name;

  @Column(name = "planned_amount", precision = 12, scale = 2)
  private BigDecimal plannedAmount;

  @ColumnDefault("0")
  @Column(name = "spent_amount", precision = 12, scale = 2)
  private BigDecimal spentAmount;

  @Column(name = "limit_amount", precision = 12, scale = 2)
  private BigDecimal limitAmount;

  @Size(max = 7)
  @Column(name = "color", length = 7)
  private String color;


}