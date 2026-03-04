package com.example.dat251_greengafl.auth;

import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @GetMapping("/api/me")
  public Map<String, Object> me(@AuthenticationPrincipal OAuth2User user) {
    if (user == null) return Map.of("authenticated", false);

    return Map.of(
        "authenticated", true,
        "sub", user.getAttribute("sub"),
        "email", user.getAttribute("email"),
        "name", user.getAttribute("name")
    );
  }
}