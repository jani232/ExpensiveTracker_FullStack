package com.jani.expense_tracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String date;

    public User() {
    }

    public User(String username, String email, String password, String date) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getDate() {
        return date;
    }

}
