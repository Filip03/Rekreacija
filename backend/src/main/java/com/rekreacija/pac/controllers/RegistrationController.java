package com.rekreacija.pac.controllers;

import com.rekreacija.pac.dto.RegisterRequest;
import com.rekreacija.pac.services.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/register")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping()
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        int ok = registrationService.register(request);
        if (ok==2) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Lozinka mora imati najmanje 8 karaktera i 1 cifru!");
        } else if(ok==1){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Korisnik sa ovim username-om već postoji.");
        }else if(ok==3){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email nije validan!");
        }
        else{
            return ResponseEntity.status(HttpStatus.OK).body("Uspjesna registracija!");
        }
    }
}

