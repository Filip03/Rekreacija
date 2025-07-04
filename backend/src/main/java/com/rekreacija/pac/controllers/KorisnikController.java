package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Korisnik;
import com.rekreacija.pac.models.KorisnikProfilDTO;
import com.rekreacija.pac.models.KorisnikUpdateDTO;
import com.rekreacija.pac.services.KorisnikService;
import io.jsonwebtoken.Jwt;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.rekreacija.pac.jwt.JwtService;

import java.util.List;

class UpdateProfileResponse {
    public String noviToken;

    public UpdateProfileResponse(String token) {
        this.noviToken = token;
    }

    public String getNoviToken() {
        return noviToken;
    }
}

@RestController
@RequestMapping("/api/korisnik")
@CrossOrigin("*")
public class KorisnikController {

    private KorisnikService korisnikService;
    private final JwtService jwtService;

    public KorisnikController(KorisnikService korisnikService, JwtService jwtService) {
        this.korisnikService = korisnikService;
        this.jwtService = jwtService;
    }

    @GetMapping()
    public List<Korisnik> getAllKorisnik(){
        List<Korisnik> result = this.korisnikService.getAllKorinsik();
        return result;
    }
    @GetMapping("/{id}")
    public Korisnik getKorisnikById(@PathVariable("id") int id){
        Korisnik result = this.korisnikService.getKorisnikById(id);
        return result;
    }

    @GetMapping("/profil")
    public ResponseEntity<KorisnikProfilDTO> getMyProfile(Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = authentication.getName();

        Korisnik korisnik = this.korisnikService.getKorisnikByUsername(username);
        if(korisnik==null){
            return ResponseEntity.notFound().build();
        }
        KorisnikProfilDTO profileData = new KorisnikProfilDTO(
                korisnik.name,
                korisnik.surname,
                korisnik.email,
                korisnik.username,
                korisnik.phone_number,
                korisnik.date_of_registration
        );

        return ResponseEntity.ok(profileData);
    }

    @GetMapping("/korisnicko-ime/{username}")
    public Korisnik getKorisnikByUsername(@PathVariable("username") String username){
        Korisnik  result = this.korisnikService.getKorisnikByUsername(username);
        return result;
    }

    @PutMapping("/profil/update")
    public ResponseEntity<?> updateMyProfile(@RequestBody KorisnikUpdateDTO updateData, Authentication authentication) {
        String currentUsername = authentication.getName();
        Korisnik currentUser = this.korisnikService.getKorisnikByUsername(currentUsername);

        if (currentUser == null) {
            return ResponseEntity.status(404).body("Korisnik nije pronađen.");
        }

        int result = this.korisnikService.updateProfile(currentUser.id, updateData.username, updateData.phone_number);

        if (result > 0) {
            String noviToken = jwtService.generateToken(
                    updateData.username,
                    currentUser.id,
                    currentUser.type_id,
                    JwtService.DEFAULT_EXPIRATION_TIME
            );
            return ResponseEntity.ok(new UpdateProfileResponse(noviToken));
        } else {
            return ResponseEntity.badRequest().body("Ažuriranje nije uspelo.");
        }
    }

    @PostMapping()
    public int insertKorisnik(@RequestBody Korisnik korisnik){
        int result = this.korisnikService.insertKorisnik(korisnik);
        return result;
    }

    @PutMapping("/{id}")
    public int updateKorisnik(@RequestBody Korisnik korisnik, @PathVariable("id") int id){
        int result = this.korisnikService.updateKorisnik(korisnik, id);
        return result;
    }

    @DeleteMapping("/{id}")
    public int deleteKorisnik(@PathVariable("id") int id){
        int result = this.korisnikService.deleteKorisnik(id);
        return result;
    }
}
