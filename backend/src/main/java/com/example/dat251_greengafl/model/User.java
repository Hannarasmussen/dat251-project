package com.example.dat251_greengafl.model;

import java.util.Set;

public class User {

    private Long id; // match med UserEntity
    private String username;
    private String email;
    private String password;
    private Set<DietaryPreference> dietaryPreferences;

    public User() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getPassword(){
        return password;
    }

    public Set<DietaryPreference> getDietaryPreferences() {
        return dietaryPreferences;
    }

    public void setDietaryPreferences(Set<DietaryPreference> dietaryPreferences) {
        this.dietaryPreferences = dietaryPreferences;
    }
}