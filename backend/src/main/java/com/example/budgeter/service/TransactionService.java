package com.example.budgeter.service;

import com.example.budgeter.dto.budget.BudgetCategoryDto;
import com.example.budgeter.dto.transaction.TransactionDto;
import com.example.budgeter.dto.transaction.TransactionRequest;
import com.example.budgeter.dto.transaction.TransactionUpdateRequest;
import com.example.budgeter.entity.Transaction;
import com.example.budgeter.repository.CategoryRepository;
import com.example.budgeter.repository.TransactionRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
  private final TransactionRepository transactionRepository;
  private final CategoryRepository categoryRepository;


  private TransactionDto toDto(Transaction t) {
    var bc = t.getBudgetCategory();
    return new TransactionDto(
      t.getId(),
      t.getAmount(),
      t.getDescription(),
      t.getTransactionDate(),
      t.getType(),
      new BudgetCategoryDto(
        bc.getId(),
        bc.getName(),
        bc.getPlannedAmount(),
        bc.getSpentAmount(),
        bc.getLimitAmount(),
        bc.getColor()
      )
    );
  }

  public List<TransactionDto> getTransactions(int userId) {
    return transactionRepository
      .findAllByUserId(userId)
      .orElseThrow(() -> new RuntimeException("Transactions not found"))
      .stream()
      .map(this::toDto)
      .toList();
  }

  public TransactionDto getTransaction(int transactionId) {
    var transaction = transactionRepository
      .findById(transactionId)
      .orElseThrow(() -> new RuntimeException("Transaction data not found"));

    return this.toDto(transaction);
  }

  public TransactionDto addTransaction(TransactionRequest request) {
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
    return this.toDto(transaction);
  }

  public TransactionDto updateTransaction(TransactionUpdateRequest request) {
    var transaction = transactionRepository
      .findById(request.id())
      .orElseThrow(() -> new RuntimeException("Transaction not found"));

    if (request.amount() != null) {
      transaction.setAmount(request.amount());
    }

    if (request.description() != null) {
      transaction.setDescription(request.description());
    }

    if (request.transactionDate() != null) {
      transaction.setTransactionDate(request.transactionDate());
    }

    if (request.type() != null) {
      transaction.setType(request.type());
    }

    if (request.budgetCategoryId() != null) {
      var budgetCategory = categoryRepository
        .findById(request.budgetCategoryId())
        .orElseThrow(() -> new RuntimeException("Budget category not found"));
      transaction.setBudgetCategory(budgetCategory);
    }

    var updatedTransaction = transactionRepository.save(transaction);
    return this.toDto(updatedTransaction);
  }

  public void deleteTransaction(int id) {
    transactionRepository.deleteById(id);
  }
}
