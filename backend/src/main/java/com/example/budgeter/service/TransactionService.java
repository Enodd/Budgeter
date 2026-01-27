package com.example.budgeter.service;

import com.example.budgeter.dto.transaction.TransactionRequest;
import com.example.budgeter.dto.transaction.TransactionUpdateRequest;
import com.example.budgeter.entity.Transaction;
import com.example.budgeter.repository.CategoryRepository;
import com.example.budgeter.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;

    public List<Transaction> getTransactions(int budgetCategoryId) {
        return transactionRepository
                .findAllByBudgetCategoryId(budgetCategoryId)
                .orElseThrow(() -> new RuntimeException("Transactions not found"));
    }

    public Transaction getTransaction(int transactionId) {
        return transactionRepository
                .findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction data not found"));
    }

    public void addTransaction(TransactionRequest request) {
        var category = categoryRepository
                .findById(request.budgetCategoryId())
                .orElseThrow(() -> new RuntimeException("Given category id does not exist"));
        var transaction = new Transaction();
        transaction.setBudgetCategory(category);
        transaction.setType(request.type());
        transaction.setAmount(request.amount());
        transaction.setTransactionDate(request.transactionDate());
        if (request.description() != null) {
            transaction.setDescription(request.description());
        }

        transactionRepository.save(transaction);
    }

    public void updateTransaction(TransactionUpdateRequest request) {
        var transaction = transactionRepository
                .findAllByBudgetCategoryId(request.budgetCategoryId())
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    public void deleteTransaction(int id) {
        transactionRepository.deleteById(id);
    }
}
