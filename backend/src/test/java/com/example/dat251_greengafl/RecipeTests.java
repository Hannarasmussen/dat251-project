package com.example.dat251_greengafl;

import com.example.dat251_greengafl.model.Recipe;
import com.example.dat251_greengafl.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
public class RecipeTests {
    @Autowired
    private RecipeService recipeService;

    @Test
    void testCreateRecipe(){
        Recipe r = new Recipe();
        r.setTitle("Hamburger");
        r.setDescription("Bread and ham");
        r.setInstructions("Cook and serve");
        Recipe saved = recipeService.register(r);
        assertThat(saved).isNotNull();
        assertThat(saved.getTitle()).isEqualTo("Hamburger");
        assertThat(saved.getDescription()).isEqualTo("Bread and ham");
        assertThat(saved.getInstructions()).isEqualTo("Cook and serve");
        recipeService.deleteById(r.getId());
    }

    @Test
    void testDeleteRecipe(){
        Recipe r = new Recipe();
        r.setTitle("Hamburger");
        r.setDescription("Bread and ham");
        r.setInstructions("Cook and serve");
        Recipe saved = recipeService.register(r);
        recipeService.deleteById(r.getId());
        assertThat(recipeService.findById(saved.getId())).isEmpty();
    }

    @Test
    void testNoDuplicateRecipeTitle(){
        Recipe r1 = new Recipe();
        r1.setTitle("Best dish");
        Recipe r2 = new Recipe();
        r1.setTitle("Best dish");
        recipeService.register(r1);
        assertThatThrownBy(() -> recipeService.register(r2)).isInstanceOf(DataIntegrityViolationException.class);
    }
}
