package com.example.budgeter.service;

import com.example.budgeter.dto.budget.BudgetCategoryDto;
import com.example.budgeter.dto.budget.BudgetCategoryRequest;
import com.example.budgeter.entity.BudgetCategory;
import com.example.budgeter.repository.BudgetRepository;
import com.example.budgeter.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetCategoryService {
  private final CategoryRepository categoryRepository;
  private final BudgetRepository budgetRepository;

  private BudgetCategoryDto toDto(BudgetCategory bc) {
    return new BudgetCategoryDto(
      bc.getId(),
      bc.getName(),
      bc.getPlannedAmount(),
      bc.getSpentAmount(),
      bc.getLimitAmount(),
      bc.getColor()
    );
  }

  public List<BudgetCategoryDto> getCategories() {
    return categoryRepository
      .findAll()
      .stream()
      .map(this::toDto)
      .toList();
  }

  public BudgetCategoryDto getCategory(int categoryId) {
    var category = categoryRepository
      .findById(categoryId)
      .orElseThrow(() -> new RuntimeException("No such category"));
    return this.toDto(category);
  }

  public void createCategory(BudgetCategoryRequest request) {
    var category = new BudgetCategory();

    category.setName(request.name());
    category.setPlannedAmount(request.plannedAmount());
    category.setSpentAmount(request.spentAmount());
    category.setLimitAmount(request.limitAmount());
    category.setColor(request.color());

    categoryRepository.save(category);
  }

  public void updateCategory(BudgetCategoryDto request) {
    var category = categoryRepository
      .findById(request.id())
      .orElseThrow(() -> new RuntimeException("No category with given id"));


    if(request.name() != null) {
      category.setName(request.name());
    }
    if(request.plannedAmount() != null) {
      category.setPlannedAmount(request.plannedAmount());
    }
    if(request.spentAmount() != null) {
      category.setSpentAmount(request.spentAmount());
    }
    if(request.limitAmount() != null) {
      category.setLimitAmount(request.limitAmount());
    }
    if(request.color() != null) {
      category.setColor(request.color());
    }

    categoryRepository.save(category);
  }

  public void deleteCategory(int id) {
    budgetRepository
      .findAllByBudgetCategoryId(id)
      .ifPresent(budgets -> {
        budgets.forEach(budget -> {
          budget.setBudgetCategory(null);
          budgetRepository.save(budget);
        });
      });

    categoryRepository.deleteById(id);
  }
}
