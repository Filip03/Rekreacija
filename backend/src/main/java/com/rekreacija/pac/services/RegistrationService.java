package com.rekreacija.pac.services;

import com.rekreacija.pac.dto.RegisterRequest;
import com.rekreacija.pac.models.Korisnik;
import com.rekreacija.pac.repositories.KorisnikRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {

    private final KorisnikRepository korisnikRepository;
    private final PasswordEncoder passwordEncoder;

    public RegistrationService(KorisnikRepository korisnikRepository,
                               PasswordEncoder passwordEncoder) {
        this.korisnikRepository = korisnikRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public int register(RegisterRequest request) {
        List<Korisnik> svi = korisnikRepository.getAllKorisnik();
        boolean postoji = svi.stream()
                .anyMatch(k -> k.username.equalsIgnoreCase(request.username()));

        if (postoji) return 1;
        if(!validatePassword(request.password())) return 2;
        if (!isValidEmail(request.email())) {
            return 3; // nevalidan email
        }

        Integer teamId = request.team_id() != null ? request.team_id() : null;

        // Popunjavanje novog korisnika
        Korisnik korisnik = new Korisnik(
                0, // ID se generiše u bazi
                request.type_id(),
                request.team_id(),
                new java.sql.Date(System.currentTimeMillis()), // trenutni datum
                request.phone_number(),
                passwordEncoder.encode(request.password()),
                request.email(),
                request.username(),
                request.surname(),
                request.name()
        );

        int rezultat = korisnikRepository.insertKorisnik(korisnik);
        return 0;
    }

    private boolean validatePassword(String password) {
        if (password.length() < 8 || !password.matches(".*\\d.*")) {
            return false;
        }else {
            return true;
        }
    }
    private boolean isValidEmail(String email) {
        String regex = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
        return email.matches(regex);
    }

}
