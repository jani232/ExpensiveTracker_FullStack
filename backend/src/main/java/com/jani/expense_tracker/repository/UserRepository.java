
package com.jani.expense_tracker.repository;

import com.jani.expense_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    //Optional<User> represents a user that may or may not exist, so we can handle missing accounts safely.
     Optional<User> findByEmail(String email);

     //checks whether an email is already registered. We'll need this for registration.
    boolean existsByEmail(String email);
}
