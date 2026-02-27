package com.example.dat251_greengafl.repo;

import com.example.dat251_greengafl.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> {
    User findByEmail(String email);
    Optional<User> findByUsername(String username);
}
