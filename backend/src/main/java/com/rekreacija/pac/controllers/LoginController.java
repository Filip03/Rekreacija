package com.rekreacija.pac.controllers;

import com.rekreacija.pac.jwt.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public LoginController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping()
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authRequest = new UsernamePasswordAuthenticationToken(
                    loginRequest.username(), loginRequest.password()
            );

            Authentication authResponse = authenticationManager.authenticate(authRequest);

            long expiration = loginRequest.rememberMe()
                    ? JwtService.REMEMBER_ME_EXPIRATION_TIME
                    : JwtService.DEFAULT_EXPIRATION_TIME;

            String jwt = jwtService.generateToken(loginRequest.username(), expiration);

            return ResponseEntity.ok(jwt);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    public record LoginRequest(String username, String password, boolean rememberMe) {
    }
}
