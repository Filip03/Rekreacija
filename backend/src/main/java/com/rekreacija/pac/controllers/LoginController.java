package com.rekreacija.pac.controllers;

import com.rekreacija.pac.jwt.JwtService;
import com.rekreacija.pac.models.Korisnik;
import com.rekreacija.pac.repositories.KorisnikRepository;
import com.rekreacija.pac.services.KorisnikService;
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

            Korisnik k = KorisnikRepository.getKorisnikByUsername(loginRequest.username());
            int k_id = k.id;
            int k_type_id = k.type_id;

            long expiration = loginRequest.rememberMe()
                    ? JwtService.REMEMBER_ME_EXPIRATION_TIME
                    : JwtService.DEFAULT_EXPIRATION_TIME;

            String jwt = jwtService.generateToken(loginRequest.username(), k_id, k_type_id, expiration);

            return ResponseEntity.ok(jwt);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    public record LoginRequest(String username, String password, boolean rememberMe) {
    }
}
