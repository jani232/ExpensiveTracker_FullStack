package com.jani.expense_tracker.controller;

import com.jani.expense_tracker.model.ApiResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/test")
    public String test() {
        return "Expense Tracker API is working!";
    }

    @GetMapping("/api/message")
    public String message() {
        return "Welcome to my full-stack Expense Tracker!";
    }

    @GetMapping("/api/test1")
    public ApiResponse test1() {

        return new ApiResponse(
                "Expense Tracker API is working!",
                "success"
        );
    }


}