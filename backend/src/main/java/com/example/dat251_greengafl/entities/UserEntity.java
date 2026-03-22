package com.example.dat251_greengafl.entities;

import com.example.dat251_greengafl.model.DietaryRestriction;

import java.util.Set;

public record UserEntity(String username, String email, String password, Set<DietaryRestriction> dietaryRestrictions) {

}
