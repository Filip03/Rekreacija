package com.rekreacija.pac.controllers;

import com.rekreacija.pac.dto.RegisterRequest;
import com.rekreacija.pac.services.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping()
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        boolean ok = registrationService.register(request);
        if (ok) {
            return ResponseEntity.ok("Uspješna registracija!");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Korisnik sa ovim username-om već postoji.");
        }
    }
}

