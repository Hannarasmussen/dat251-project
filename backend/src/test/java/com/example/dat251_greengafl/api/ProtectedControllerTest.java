package com.example.dat251_greengafl.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ProtectedControllerTest {

  @Autowired MockMvc mvc;

  @Test
  void protected_requires_auth() throws Exception {
    mvc.perform(get("/api/protected"))
        .andExpect(status().is3xxRedirection()); // redirect til /login
  }

  @Test
  void protected_allows_when_authenticated() throws Exception {
    mvc.perform(get("/api/protected")
            .with(SecurityMockMvcRequestPostProcessors.oauth2Login()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.ok").value(true));
  }
}