package com.example.dat251_greengafl.auth;

import com.example.dat251_greengafl.security.JwtService;
import com.example.dat251_greengafl.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String JWT_COOKIE = "jwt";

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest, HttpServletResponse response) {
        if (request == null || request.username() == null || request.password() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "username and password are required"));
        }

        if (!userService.authenticate(request.username(), request.password())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "invalid credentials"));
        }

        String token = jwtService.generateToken(request.username());

        ResponseCookie cookie = ResponseCookie.from(JWT_COOKIE, token)
                .httpOnly(true)
                .secure(httpRequest.isSecure())
                .path("/")
                .sameSite("Lax")
                .maxAge(Duration.ofHours(24))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(Map.of("authenticated", true, "username", request.username()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest httpRequest, HttpServletResponse response) {
        ResponseCookie clearCookie = ResponseCookie.from(JWT_COOKIE, "")
                .httpOnly(true)
                .secure(httpRequest.isSecure())
                .path("/")
                .sameSite("Lax")
                .maxAge(Duration.ZERO)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, clearCookie.toString());
        return ResponseEntity.ok(Map.of("success", true));
    }

    public record LoginRequest(String username, String password) {}


    @GetMapping("/me")
    public Map<String, Object> me(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) return Map.of("authenticated", false);

        return Map.of(
                "authenticated", true,
                "sub", user.getAttribute("sub"),
                "email", user.getAttribute("email"),
                "name", user.getAttribute("name")
        );
    }

    //in case we need to see current status of login (dev)
    @GetMapping("/status")
    public Map<String, Object> status(Authentication authentication) {
        boolean authenticated = authentication != null
                && authentication.isAuthenticated();

        if (!authenticated) {
            return Map.of("authenticated", false);
        }

        return Map.of(
                "authenticated", true,
                "username", authentication.getName()
        );
    }
}