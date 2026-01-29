package com.example.budgeter.controller;

import com.example.budgeter.dto.transaction.TransactionDto;
import com.example.budgeter.dto.transaction.TransactionRequest;
import com.example.budgeter.dto.transaction.TransactionUpdateRequest;
import com.example.budgeter.entity.Transaction;
import com.example.budgeter.repository.UserRepository;
import com.example.budgeter.service.TransactionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final UserRepository userRepository;

    @GetMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<TransactionDto>> getTransactions(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        var mail = userDetails.getUsername();
        var user = userRepository
                .findByMail(mail)
                .orElseThrow(() -> new RuntimeException("User does not exist"));
        var transactions = transactionService.getTransactions(user.getId());
        return ResponseEntity.ok(transactions);
    }

    @GetMapping(params = "id")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TransactionDto> getTransactionById(@RequestParam int id) {
        return ResponseEntity.ok(transactionService.getTransaction(id));
    }

    @PostMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TransactionDto> createTransaction(
        @RequestBody TransactionRequest transaction
    ) {
        return ResponseEntity.ok(transactionService.addTransaction(transaction));
    }

    @PutMapping("/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TransactionDto> updateTransaction(@RequestBody TransactionUpdateRequest transactionRequest) {
        return ResponseEntity.ok(transactionService.updateTransaction(transactionRequest));
    }

    @DeleteMapping(params = "id")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteTransaction(@RequestParam int id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
