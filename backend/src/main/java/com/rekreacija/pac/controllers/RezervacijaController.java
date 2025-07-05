package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Rezervacija;
import com.rekreacija.pac.services.RezervacijaService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/rezervacija")
@CrossOrigin("*")
public class RezervacijaController {

    private RezervacijaService rezervacijaService;

    public RezervacijaController(RezervacijaService rezervacijaService) { this.rezervacijaService = rezervacijaService; }

    @GetMapping()
    public List<Rezervacija> getAllRezervacija() {
        return this.rezervacijaService.getAllRezervacija();
    }

    @GetMapping("/{id}")
    public Rezervacija getRezervacijaById(@PathVariable("id") int rezervacija_id) {
        return this.rezervacijaService.getRezervacijaById(rezervacija_id);
    }

    @GetMapping("/user_id/{id}")
    public List<Rezervacija> getRezervacijaByUserId(@PathVariable("id") int id) {
        return this.rezervacijaService.getRezervacijaByUserId(id);
    }

    @PostMapping()
    public int insertRezervacija(@RequestBody Rezervacija rez) {
        return this.rezervacijaService.insertRezervacija(rez);
    }

    @PutMapping("/{id}")
    public int updateRezervacija(@RequestBody Rezervacija rez, @PathVariable("id") int id) {
        return this.rezervacijaService.updateRezervacija(rez, id);
    }
    @DeleteMapping("/{id}")
    public int deleteRezervacija(@PathVariable("id") int id) {
        return this.rezervacijaService.deleteRezervacija(id);
    }


}
