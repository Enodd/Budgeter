package com.example.budgeter.controller;

import com.example.budgeter.dto.transaction.TransactionRequest;
import com.example.budgeter.entity.Transaction;
import com.example.budgeter.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Transaction>> getTransactions() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Transaction> getTransactionById(@RequestParam int id) {
        return ResponseEntity.ok(null);
    }

    @PostMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Transaction> createTransaction(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody TransactionRequest transaction
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updateTransaction() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteTransaction(@RequestParam int id) {
        return ResponseEntity.noContent().build();
    }
}
