package com.example.budgeter.controller;

import com.example.budgeter.dto.budget.BudgetRequest;
import com.example.budgeter.dto.budget.BudgetUpdateRequest;
import com.example.budgeter.entity.Budget;
import com.example.budgeter.service.AuthService;
import com.example.budgeter.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetsController {

    private final BudgetService budgetService;

    @GetMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Budget>> getAllBudgets(@AuthenticationPrincipal UserDetails userDetails) {
        String mail = userDetails.getUsername();

        return ResponseEntity.ok(budgetService.getAllBudgets(mail));
    }

    @GetMapping(params = "id")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Budget> getBudget(@RequestParam int id) {
        return ResponseEntity.ok(budgetService.getBudget(id));
    }

    @PostMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> createBudget(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody BudgetRequest budgetRequest
    ) {
        String mail = userDetails.getUsername();

        budgetService.addBudget(mail, budgetRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updateBudget(@RequestBody BudgetUpdateRequest budgetRequest) {
        budgetService.updateBudget(budgetRequest);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteBudget(@RequestParam int id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }
}
