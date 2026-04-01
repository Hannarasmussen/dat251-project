package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.dto.RecipeCatalogItem;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class RecipeCatalogService {

  private final ObjectMapper objectMapper;

  public RecipeCatalogService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public List<RecipeCatalogItem> findAll() throws IOException {
    ClassPathResource resource = new ClassPathResource("recipes.json");

    try (InputStream inputStream = resource.getInputStream()) {
      return objectMapper.readValue(inputStream, new TypeReference<>() {});
    }
  }
}
