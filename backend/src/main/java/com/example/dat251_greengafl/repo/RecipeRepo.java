package com.example.dat251_greengafl.repo;

import com.example.dat251_greengafl.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RecipeRepo extends JpaRepository<Recipe, UUID> {
    Optional<Recipe> findByTitle(String title);
}
