package com.example.dat251_greengafl.api;

import com.example.dat251_greengafl.model.Difficulty;
import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.model.User;
import com.example.dat251_greengafl.service.FavoriteService;
import com.example.dat251_greengafl.service.RecipeService;
import com.example.dat251_greengafl.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class FavoriteControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private FavoriteService favoriteService;

    @Test
    void favorites_requires_auth() throws Exception {
        mvc.perform(get("/api/favorites"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "fav-ctrl-u1")
    void get_favorites_returns_empty_for_new_user() throws Exception {
        User user = registerUser("fav-ctrl-u1", "fav-ctrl-u1@test.com");
        try {
            mvc.perform(get("/api/favorites"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$.length()").value(0));
        } finally {
            userService.deleteById(user.getId());
        }
    }

    @Test
    @WithMockUser(username = "fav-ctrl-u2")
    void add_favorite_returns_created() throws Exception {
        User user = registerUser("fav-ctrl-u2", "fav-ctrl-u2@test.com");
        Recipe recipe = registerRecipe("Fav Ctrl Recipe 2");
        try {
            mvc.perform(post("/api/favorites/" + recipe.getId()))
                    .andExpect(status().isCreated());
        } finally {
            userService.deleteById(user.getId());
            recipeService.deleteById(recipe.getId());
        }
    }

    @Test
    @WithMockUser(username = "fav-ctrl-u3")
    void add_favorite_for_unknown_recipe_returns_not_found() throws Exception {
        User user = registerUser("fav-ctrl-u3", "fav-ctrl-u3@test.com");
        try {
            mvc.perform(post("/api/favorites/00000000-0000-0000-0000-000000000000"))
                    .andExpect(status().isNotFound());
        } finally {
            userService.deleteById(user.getId());
        }
    }

    @Test
    @WithMockUser(username = "fav-ctrl-u4")
    void remove_favorite_returns_no_content() throws Exception {
        User user = registerUser("fav-ctrl-u4", "fav-ctrl-u4@test.com");
        Recipe recipe = registerRecipe("Fav Ctrl Recipe 4");
        try {
            favoriteService.addFavorite(user.getUsername(), recipe.getId());
            mvc.perform(delete("/api/favorites/" + recipe.getId()))
                    .andExpect(status().isNoContent());
        } finally {
            userService.deleteById(user.getId());
            recipeService.deleteById(recipe.getId());
        }
    }

    @Test
    @WithMockUser(username = "fav-ctrl-u5")
    void remove_favorite_not_favorited_returns_not_found() throws Exception {
        User user = registerUser("fav-ctrl-u5", "fav-ctrl-u5@test.com");
        Recipe recipe = registerRecipe("Fav Ctrl Recipe 5");
        try {
            mvc.perform(delete("/api/favorites/" + recipe.getId()))
                    .andExpect(status().isNotFound());
        } finally {
            userService.deleteById(user.getId());
            recipeService.deleteById(recipe.getId());
        }
    }

    @Test
    @WithMockUser(username = "fav-ctrl-u6")
    void is_favorited_returns_false_before_add() throws Exception {
        User user = registerUser("fav-ctrl-u6", "fav-ctrl-u6@test.com");
        Recipe recipe = registerRecipe("Fav Ctrl Recipe 6");
        try {
            mvc.perform(get("/api/favorites/" + recipe.getId()))
                    .andExpect(status().isOk())
                    .andExpect(content().string("false"));
        } finally {
            userService.deleteById(user.getId());
            recipeService.deleteById(recipe.getId());
        }
    }

    @Test
    @WithMockUser(username = "fav-ctrl-u7")
    void is_favorited_returns_true_after_add() throws Exception {
        User user = registerUser("fav-ctrl-u7", "fav-ctrl-u7@test.com");
        Recipe recipe = registerRecipe("Fav Ctrl Recipe 7");
        try {
            favoriteService.addFavorite(user.getUsername(), recipe.getId());
            mvc.perform(get("/api/favorites/" + recipe.getId()))
                    .andExpect(status().isOk())
                    .andExpect(content().string("true"));
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
