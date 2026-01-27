package com.example.budgeter.controller;

import com.example.budgeter.dto.budget.BudgetCategoryDto;
import com.example.budgeter.dto.budget.BudgetCategoryRequest;
import com.example.budgeter.repository.BudgetRepository;
import com.example.budgeter.service.BudgetCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/budget/category")
@RequiredArgsConstructor
public class BudgetCategoryController {
  private final BudgetCategoryService budgetCategoryService;
  private final BudgetRepository budgetRepository;

  @GetMapping("/")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<BudgetCategoryDto>> getCategories() {
    var categories = budgetCategoryService.getCategories();
    return ResponseEntity.ok(categories);
  }
//
  @GetMapping(params = "id")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<BudgetCategoryDto> getCategoryById(@RequestParam int id) {
    return ResponseEntity.ok(budgetCategoryService.getCategory(id));
  }

  @PostMapping("/")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Void> createCategory(
    @RequestBody BudgetCategoryRequest request
  ) {
    budgetCategoryService.createCategory(request);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PutMapping("/")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Void> updateCategory(@RequestBody BudgetCategoryDto budgetCategoryRequest) {
    budgetCategoryService.updateCategory(budgetCategoryRequest);
    return ResponseEntity.status(HttpStatus.OK).build();
  }

  @DeleteMapping("/")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Void> deleteCategory(@RequestParam int id) {
    budgetCategoryService.deleteCategory(id);
    return ResponseEntity.noContent().build();
  }
}
