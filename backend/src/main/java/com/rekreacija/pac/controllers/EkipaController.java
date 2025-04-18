package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Ekipa;
import com.rekreacija.pac.services.EkipaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ekipa")
@CrossOrigin("*")
public class EkipaController {

    private EkipaService ekipaService;
    public EkipaController(EkipaService ekipaService) {this.ekipaService = ekipaService;}

    @GetMapping()
    public List<Ekipa> getAllEkipa() {
        List<Ekipa> result = this.ekipaService.getAllEkipa();
        return result;
    }

    @GetMapping("/{id}")
    public Ekipa getEkipaByID(@PathVariable("id") int id ) {
        Ekipa result = this.ekipaService.getEkipaByID(id);
        return result;
    }

    @PostMapping()
    public int insertEkipa(@RequestBody Ekipa ekipa){
        int result = this.ekipaService.insertEkipa(ekipa);
        return result;
    }

    @PutMapping("/{id}")
    public int updateEkipa(@PathVariable("id") int id, @RequestBody Ekipa ekipa){
        int result = this.ekipaService.updateEkipa(ekipa, id);
        return result;
    }

    @DeleteMapping("{id}")
    public int delteEkipa(@PathVariable("id") int id){
        int result = this.ekipaService.deleteEkipa(id);
        return result;
    }
}
