package com.example.dat251_greengafl.controller;

import com.example.dat251_greengafl.entities.UserEntity;
import com.example.dat251_greengafl.model.User;
import com.example.dat251_greengafl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public User create(@RequestBody UserEntity user) {
        User u = new User();
        u.setUsername(user.getUsername());
        u.setEmail(user.getEmail());
        u.setPassword(user.getPassword());
        u.setDietaryPreferences(user.getDietaryPreferences());
        return userService.register(u);
    }

    @PutMapping
    public User update(@RequestBody User user) {
        return userService.register(user);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }
}