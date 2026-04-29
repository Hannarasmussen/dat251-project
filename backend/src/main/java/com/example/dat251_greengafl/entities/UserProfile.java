package com.example.dat251_greengafl.entities;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    private Long userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ElementCollection
    @CollectionTable(name = "user_profile_category_scores", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "category")
    @Column(name = "score")
    private Map<String, Integer> categoryScores = new HashMap<>();

    @ElementCollection
    @CollectionTable(name = "user_profile_recipe_scores", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "recipe_id")
    @Column(name = "score")
    private Map<String, Integer> recipeScores = new HashMap<>();

    @Version
    private Long version;

    public void bumpCategory(String category) {
        if (category != null && !category.isBlank()) {
            categoryScores.merge(category, 1, Integer::sum);
        }
    }

    public void bumpRecipe(String recipeId) {
        if (recipeId != null && !recipeId.isBlank()) {
            recipeScores.merge(recipeId, 1, Integer::sum);
        }
    }


}
