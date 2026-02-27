package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.model.User;
import com.example.dat251_greengafl.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }
    public List<User> findAll(){
        return userRepo.findAll();
    }

    public Optional<User> findById(UUID id){
        return userRepo.findById(id);
    }

    public Optional<User> findByUsername(String username){
        return userRepo.findByUsername(username);
    }

    public User register(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public void deleteById(UUID id){
        userRepo.deleteById(id);
    }
}
