package com.example.dat251_greengafl.entities;

import com.example.dat251_greengafl.model.Difficulty;
import com.example.dat251_greengafl.model.FoodCategory;
import jakarta.persistence.*;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @MapsId
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(nullable = false)
    private int selectionCount = 0;

    @Column(nullable = false)
    private double averageCookingTime = 0.0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_profile_category_score", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "score")
    private Map<FoodCategory, Integer> categoryScores = new EnumMap<>(FoodCategory.class);

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_profile_difficulty_score", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "score")
    private Map<Difficulty, Integer> difficultyScores = new EnumMap<>(Difficulty.class);

    public UserProfile() {}

    public Long getUserId() {
        return userId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
        this.userId = user != null ? user.getId() : null;
    }

    public int getSelectionCount() {
        return selectionCount;
    }

    public double getAverageCookingTime() {
        return averageCookingTime;
    }

    public Map<FoodCategory, Integer> getCategoryScores() {
        return categoryScores;
    }

    public Map<Difficulty, Integer> getDifficultyScores() {
        return difficultyScores;
    }

    public void registerSelection(Integer cookingTime, Difficulty difficulty, Iterable<FoodCategory> categories) {
        selectionCount++;
        if (cookingTime != null) {
            averageCookingTime += (cookingTime - averageCookingTime) / selectionCount;
        }
        if (difficulty != null) {
            difficultyScores.merge(difficulty, 1, Integer::sum);
        }
        if (categories != null) {
            for (FoodCategory category : categories) {
                if (category != null) {
                    categoryScores.merge(category, 1, Integer::sum);
                }
            }
        }
    }
}
