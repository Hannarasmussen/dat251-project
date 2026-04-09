package com.example.dat251_greengafl;

import com.example.dat251_greengafl.dto.RecipeSummaryDto;
import com.example.dat251_greengafl.model.Difficulty;
import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.model.User;
import com.example.dat251_greengafl.service.FavoriteService;
import com.example.dat251_greengafl.service.RecipeService;
import com.example.dat251_greengafl.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class FavoriteServiceTests {

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @Test
    void testAddAndCheckFavorite() {
        User user = registerUser("fav-svc-u1", "fav-svc-u1@test.com");
        Recipe recipe = registerRecipe("Fav Svc Recipe 1");
        try {
            boolean added = favoriteService.addFavorite(user.getUsername(), recipe.getId());
            assertThat(added).isTrue();
            assertThat(favoriteService.isFavorited(user.getUsername(), recipe.getId())).isTrue();
        } finally {
            userService.deleteById(user.getId());
            recipeService.deleteById(recipe.getId());
        }
    }

    @Test
    void testRemoveFavorite() {
        User user = registerUser("fav-svc-u2", "fav-svc-u2@test.com");
        Recipe recipe = registerRecipe("Fav Svc Recipe 2");
        try {
            favoriteService.addFavorite(user.getUsername(), recipe.getId());
            boolean removed = favoriteService.removeFavorite(user.getUsername(), recipe.getId());
            assertThat(removed).isTrue();
            assertThat(favoriteService.isFavorited(user.getUsername(), recipe.getId())).isFalse();
        } finally {
            userService.deleteById(user.getId());
            recipeService.deleteById(recipe.getId());
        }
    }

    @Test
    void testGetFavorites() {
        User user = registerUser("fav-svc-u3", "fav-svc-u3@test.com");
        Recipe recipe1 = registerRecipe("Fav Svc Recipe 3a");
        Recipe recipe2 = registerRecipe("Fav Svc Recipe 3b");
        try {
            favoriteService.addFavorite(user.getUsername(), recipe1.getId());
            favoriteService.addFavorite(user.getUsername(), recipe2.getId());
            List<RecipeSummaryDto> favorites = favoriteService.getFavorites(user.getUsername());
            assertThat(favorites).hasSize(2);
            assertThat(favorites).extracting("id")
                    .containsExactlyInAnyOrder(recipe1.getId(), recipe2.getId());
        } finally {
            userService.deleteById(user.getId());
            recipeService.deleteById(recipe1.getId());
            recipeService.deleteById(recipe2.getId());
        }
    }

    @Test
    void testGetFavoritesEmptyForNewUser() {
        User user = registerUser("fav-svc-u4", "fav-svc-u4@test.com");
        try {
            List<RecipeSummaryDto> favorites = favoriteService.getFavorites(user.getUsername());
            assertThat(favorites).isEmpty();
        } finally {
            userService.deleteById(user.getId());
        }
    }

    @Test
    void testAddFavoriteUnknownUser() {
        Recipe recipe = registerRecipe("Fav Svc Recipe 5");
        try {
            boolean result = favoriteService.addFavorite("nonexistent-user-xyz", recipe.getId());
            assertThat(result).isFalse();
        } finally {
            recipeService.deleteById(recipe.getId());
        }
    }

    @Test
    void testAddFavoriteUnknownRecipe() {
        User user = registerUser("fav-svc-u6", "fav-svc-u6@test.com");
        try {
            boolean result = favoriteService.addFavorite(user.getUsername(), UUID.randomUUID());
            assertThat(result).isFalse();
        } finally {
            userService.deleteById(user.getId());
        }
    }

    @Test
    void testRemoveFavoriteNotFavorited() {
        User user = registerUser("fav-svc-u7", "fav-svc-u7@test.com");
        Recipe recipe = registerRecipe("Fav Svc Recipe 7");
        try {
            boolean removed = favoriteService.removeFavorite(user.getUsername(), recipe.getId());
            assertThat(removed).isFalse();
        } finally {
            userService.deleteById(user.getId());
            recipeService.deleteById(recipe.getId());
        }
    }

    private User registerUser(String username, String email) {
        User u = new User();
        u.setUsername(username);
        u.setEmail(email);
        u.setPassword("password");
        return userService.register(u);
    }

    private Recipe registerRecipe(String name) {
        Recipe r = new Recipe();
        r.setName(name);
        r.setInstructions("Test instructions");
        r.setCookingTime(30);
        r.setDifficulty(Difficulty.EASY);
        return recipeService.register(r);
    }
}
