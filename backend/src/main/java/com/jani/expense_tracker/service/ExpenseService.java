package com.jani.expense_tracker.service;

import com.jani.expense_tracker.model.Expense;
import com.jani.expense_tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import com.jani.expense_tracker.exception.ExpenseNotFoundException;


import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {

        return expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ExpenseNotFoundException("Expense not found with id: " + id)
                );
    }


    public Expense updateExpense(Long id, Expense updatedExpense) {

    Expense existingExpense = expenseRepository.findById(id)
            .orElseThrow(() ->
                    new ExpenseNotFoundException(
                            "Expense not found with id: " + id
                    )
            );

        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setDescription(updatedExpense.getDescription());

        return expenseRepository.save(existingExpense);
    }

    public void deleteExpense(Long id) {

        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ExpenseNotFoundException(
                                "Expense not found with id: " + id
                        )
                );

        expenseRepository.delete(existingExpense);
    }
}