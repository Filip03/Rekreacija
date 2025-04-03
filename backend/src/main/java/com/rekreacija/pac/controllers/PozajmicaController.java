package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Pozajmica;
import com.rekreacija.pac.services.PozajmicaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pozajmica")
public class PozajmicaController {

    private PozajmicaService pozajmicaService;

    public PozajmicaController(PozajmicaService pozajmicaService) { this.pozajmicaService = pozajmicaService; }

    @GetMapping()
    public List<Pozajmica> getAllPozajmica(){
        return this.pozajmicaService.getAllPozajmica();
    }

    @GetMapping("/{id}")
    public Pozajmica getPozajmicaById(@PathVariable("id") int id) {
        return this.pozajmicaService.getPozajmicaById(id);
    }

    @PostMapping()
    public int insertPozajmica(@RequestBody Pozajmica pozajmica) {
        return this.pozajmicaService.insertPozajmica(pozajmica);
    }

    @PutMapping("/{id}")
    public int updatePozajmica(@RequestBody Pozajmica pozajmica, @PathVariable("id") int id) {
        return this.pozajmicaService.updatePozajmica(pozajmica, id);
    }

    @DeleteMapping("/{id}")
    public int deletePozajmica(@PathVariable("id") int id) {
        return this.pozajmicaService.deletePozajmica(id);
    }
}
