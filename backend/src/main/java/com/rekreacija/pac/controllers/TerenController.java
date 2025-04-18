package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Teren;
import com.rekreacija.pac.services.TerenService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teren")
@CrossOrigin("*")
public class TerenController {

    private TerenService terenService;

    public TerenController(TerenService terenService) { this.terenService = terenService; }

    @GetMapping()
    public List<Teren> getAllTeren(){
        return this.terenService.getAllteren();
    }

    @GetMapping("/{id}")
    public Teren getTerenById(@PathVariable("id") int id){
        return this.terenService.getTerenById(id);
    }

    @PostMapping()
    public int insertTeren(@RequestBody Teren teren){
        return this.terenService.insertTeren(teren);
    }

    @PutMapping("/{id}")
    public int updateTeren(@RequestBody Teren teren, @PathVariable("id") int id){
        return this.terenService.updateTeren(teren, id);
    }

    @DeleteMapping("/{id}")
    public int deleteTeren(@PathVariable("id") int id){
        return this.terenService.deleteTeren(id);
    }
}
