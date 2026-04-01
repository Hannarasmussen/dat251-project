package com.example.dat251_greengafl.controller;

import com.example.dat251_greengafl.dto.RecipeCatalogItem;
import com.example.dat251_greengafl.service.RecipeCatalogService;
import java.io.IOException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/recipes")
public class PublicRecipeController {

  private final RecipeCatalogService recipeCatalogService;

  public PublicRecipeController(RecipeCatalogService recipeCatalogService) {
    this.recipeCatalogService = recipeCatalogService;
  }

  @GetMapping
  public ResponseEntity<List<RecipeCatalogItem>> findAll() throws IOException {
    return ResponseEntity.ok(recipeCatalogService.findAll());
  }
}
