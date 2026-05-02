package com.example.dat251_greengafl.entities;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    private Long id;

    @OneToOne(optional = false)
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;

    @ElementCollection
    @CollectionTable(
        name = "user_profile_category_scores",
        joinColumns = @JoinColumn(name = "user_profile_id")
    )
    @MapKeyColumn(name = "category")
    @Column(name = "score")
    private Map<String, Integer> categoryScores = new HashMap<>();

    @ElementCollection
    @CollectionTable(
        name = "user_profile_recipe_scores",
        joinColumns = @JoinColumn(name = "user_profile_id")
    )
    @MapKeyColumn(name = "recipe_id")
    @Column(name = "score")
    private Map<String, Integer> recipeScores = new HashMap<>();

    public Long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Map<String, Integer> getCategoryScores() {
        return categoryScores;
    }

    public void setCategoryScores(Map<String, Integer> categoryScores) {
        this.categoryScores = categoryScores;
    }

    public Map<String, Integer> getRecipeScores() {
        return recipeScores;
    }

    public void setRecipeScores(Map<String, Integer> recipeScores) {
        this.recipeScores = recipeScores;
    }

    public void choseCategory(String category) {
        if (category == null || category.isBlank()) return;
        categoryScores.put(
            category,
            categoryScores.getOrDefault(category, 0) + 1
        );
    }

    public void choseRecipe(String recipeId) {
        if (recipeId == null || recipeId.isBlank()) return;
        recipeScores.put(recipeId, recipeScores.getOrDefault(recipeId, 0) + 1);
    }
}
