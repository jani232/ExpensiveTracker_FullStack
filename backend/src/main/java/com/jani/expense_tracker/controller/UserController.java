
package com.jani.expense_tracker.controller;

import com.jani.expense_tracker.model.User;
import com.jani.expense_tracker.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (user.getUsername() == null || user.getUsername().isBlank()
                || user.getEmail() == null || user.getEmail().isBlank()
                || user.getPassword() == null || user.getPassword().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            "Username, email, and password are required."));
        }

        if (userService.emailExists(user.getEmail().trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email is already registered."));
        }

        user.setEmail(user.getEmail().trim());

        User savedUser = userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                        "id", savedUser.getId(),
                        "username", savedUser.getUsername(),
                        "email", savedUser.getEmail(),
                        "message", "Registration successful."
                ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        if (email == null || email.isBlank()
                || password == null || password.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and password are required."));
        }

        return userService.login(email.trim(), password)
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(
                        Map.of(
                                "id", user.getId(),
                                "username", user.getUsername(),
                                "email", user.getEmail(),
                                "message", "Login successful."
                        )
                ))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of(
                                "message", "Invalid email or password."
                        )));
    }
}
