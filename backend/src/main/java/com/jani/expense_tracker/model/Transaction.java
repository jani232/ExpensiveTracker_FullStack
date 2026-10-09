package com.jani.expense_tracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Positive(message = "Amount must be greater than 0")
    private double amount;

    @NotBlank(message = "Type is required")
    private String type;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Date is required")
    private String date;

    @NotBlank (message="Name is required")
    private String name;

    public Transaction() {
    }

    public Transaction(double amount, String type, String category,
                   String description, String date, User user, String name) {
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.date = date;
        this.user = user;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public double getAmount() {
        return amount;
    }

    public String getType() {
        return type;
    }

    public String getCategory() {
        return category;
    }


    public String getDate() {
        return date;
    }

    public String getName() {
        return name;
    }
    
    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public void setDate(String date) {
        this.date = date;
    }



    public void setName(String name) {
        this.name = name;
    }

}