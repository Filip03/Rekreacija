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

    public boolean register(RegisterRequest request) {
        // Provjera postoji li već korisnik sa tim username-om
        List<Korisnik> svi = korisnikRepository.getAllKorisnik();
        boolean postoji = svi.stream()
                .anyMatch(k -> k.username.equalsIgnoreCase(request.username()));

        if (postoji) return false;
        validatePassword(request.password());

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
        return rezultat > 0;
    }

    private void validatePassword(String password) {
        if (password.length() < 8) {
            throw new IllegalArgumentException("Lozinka mora imati najmanje 8 karaktera.");
        }

        if (!password.matches(".*\\d.*")) {
            throw new IllegalArgumentException("Lozinka mora sadržavati barem jednu cifru.");
        }

    }
}
