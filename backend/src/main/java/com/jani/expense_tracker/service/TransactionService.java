package com.jani.expense_tracker.service;

import com.jani.expense_tracker.model.Transaction;
import com.jani.expense_tracker.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import com.jani.expense_tracker.exception.ExpenseNotFoundException;


import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(Long id) {

        return transactionRepository.findById(id)
                .orElseThrow(() ->
                        new ExpenseNotFoundException("Transaction not found with id: " + id)
                );
    }


    public Transaction updateTransaction(Long id, Transaction updatedTransaction) {

    Transaction existingTransaction = transactionRepository .findById(id)
            .orElseThrow(() ->
                    new ExpenseNotFoundException(
                            "Transaction not found with id: " + id
                    )
            );

        existingTransaction.setAmount(updatedTransaction.getAmount());
        existingTransaction.setCategory(updatedTransaction.getCategory());
       existingTransaction.setType(updatedTransaction.getType());
        existingTransaction.setDate(updatedTransaction.getDate());      
        existingTransaction.setName(updatedTransaction.getName());

        return transactionRepository.save(existingTransaction);
    }

    public void deleteTransaction(Long id) {

        Transaction existingTransaction = transactionRepository.findById(id)
                .orElseThrow(() ->
                        new ExpenseNotFoundException(
                                "Transaction not found with id: " + id
                        )
                );

        transactionRepository.delete(existingTransaction);
    }
}