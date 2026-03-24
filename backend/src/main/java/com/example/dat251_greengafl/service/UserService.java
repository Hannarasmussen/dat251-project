package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.entities.UserEntity;
import com.example.dat251_greengafl.model.User;
import com.example.dat251_greengafl.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        return userRepo.findAll().stream()
                .map(this::mapToUser)
                .toList();
    }

    public Optional<User> findById(Long id) {
        return userRepo.findById(id)
                .map(this::mapToUser);
    }

    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username)
                .map(this::mapToUser);
    }

    public boolean authenticate(String username, String raw) {
        if (username == null || raw == null) {
            return false;
        }

        return userRepo.findByUsername(username)
                .map(userEntity -> passwordEncoder.matches(raw, userEntity.getPassword()))
                .orElse(false);
    }

    public User register(User user) {
        UserEntity entity = mapToEntity(user);

        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            entity.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        UserEntity saved = userRepo.save(entity);
        return mapToUser(saved);
    }

    public void deleteById(Long id) {
        userRepo.deleteById(id);
    }

    private User mapToUser(UserEntity entity) {
        User user = new User();
        user.setId(entity.getId());
        user.setUsername(entity.getUsername());
        user.setEmail(entity.getEmail());
        user.setDietaryPreferences(entity.getDietaryPreferences());
        return user;
    }

    private UserEntity mapToEntity(User user) {
        UserEntity entity = new UserEntity();
        entity.setId(user.getId());
        entity.setUsername(user.getUsername());
        entity.setEmail(user.getEmail());
        entity.setPassword(user.getPassword());
        entity.setDietaryPreferences(user.getDietaryPreferences());
        return entity;
    }
}