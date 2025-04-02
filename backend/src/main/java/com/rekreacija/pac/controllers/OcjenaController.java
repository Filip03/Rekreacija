package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Ocjena;
import com.rekreacija.pac.services.OcjenaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ocjena")
public class OcjenaController {

    private OcjenaService ocjenaService;

    public OcjenaController(OcjenaService ocjenaService) { this.ocjenaService = ocjenaService; }

    @GetMapping()
    public List<Ocjena> getAllOcjena(){
        List<Ocjena> result = this.ocjenaService.getAllOcjena();
        return result;
    }
    @GetMapping("/{id}")
    public Ocjena getOcjenaById(@PathVariable("id") int id){
        Ocjena result = this.ocjenaService.getOcjenaById(id);
        return result;
    }
    @PostMapping()
    public int insertOcjena(@RequestBody Ocjena ocjena){
        int result = this.ocjenaService.insertOcjena(ocjena);
        return result;
    }
    @PutMapping("/{id}")
    public int updateOcjena(@RequestBody Ocjena ocjena, @PathVariable("id") int id){
        int result = this.ocjenaService.updateOcjena(ocjena, id);
        return result;
    }

    @PutMapping("/{id}")
    public int deleteOcjena(@PathVariable("id") int id){
        int result = this.ocjenaService.deleteOcjena(id);
        return result;
    }
}
