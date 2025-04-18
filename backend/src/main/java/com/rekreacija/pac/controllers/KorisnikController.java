package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Korisnik;
import com.rekreacija.pac.services.KorisnikService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/korisnik")
@CrossOrigin("*")
public class KorisnikController {

    private KorisnikService korisnikService;
    public KorisnikController(KorisnikService korisnikService) { this.korisnikService = korisnikService; }

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
