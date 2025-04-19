package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Korisnik;
import com.rekreacija.pac.repositories.KorisnikRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final KorisnikRepository korisnikRepository;

    public CustomUserDetailsService(KorisnikRepository korisnikRepository) {
        this.korisnikRepository = korisnikRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return korisnikRepository.getAllKorisnik().stream()
                .filter(k -> k.username.equalsIgnoreCase(username))
                .findFirst()
                .map(k -> User.builder()
                        .username(k.username)
                        .password(k.password)
                        .roles(getRoleFromTypeId(k.type_id))
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Korisnik nije pronađen: " + username));
    }
    private String getRoleFromTypeId(Integer typeId) {
        return switch (typeId) {
            case 1 -> "REGULAR";
            case 2 -> "OWNER";
            case 3 -> "ADMIN";
            default -> "REGULAR";
        };
    }
}

