package com.example.dat251_greengafl.api;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProtectedController {

  @GetMapping("/api/protected")
  public Map<String, Object> protectedPing() {
    return Map.of("ok", true);
  }
}