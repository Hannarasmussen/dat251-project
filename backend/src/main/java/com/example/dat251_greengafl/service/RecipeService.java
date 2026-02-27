package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.repo.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepo recipeRepo;

    public List<Recipe> findAll(){
        return recipeRepo.findAll();
    }

    public Optional<Recipe> findById(UUID id){
        return recipeRepo.findById(id);
    }

    public Optional<Recipe> findByTitle(String title){
        return recipeRepo.findByTitle(title);
    }

    public Recipe register(Recipe recipe){
        return recipeRepo.save(recipe);
    }

    public void deleteById(UUID id){
        recipeRepo.deleteById(id);
    }
}
