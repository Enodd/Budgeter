package com.example.budgeter.service;

import com.example.budgeter.entity.Transaction;
import com.example.budgeter.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public Transaction getTransaction(int transactionId) {
        return transactionRepository
                .findById(transactionId)
                .orElseThrow(() -> new Error("Transaction data not found"));
    }
}
