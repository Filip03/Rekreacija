package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Obavjestenja;
import com.rekreacija.pac.services.ObavjestenjaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/obavjestenje")
public class ObavjestenjaController {

    private ObavjestenjaService obavjestenjaService;

    public ObavjestenjaController(ObavjestenjaService obavjestenjaService) { this.obavjestenjaService=obavjestenjaService;}

    @GetMapping()
    public List<Obavjestenja> getAllObavjestenja(){
        List<Obavjestenja> result = this.obavjestenjaService.getAllObavjesetnja();
        return result;
    }
    @GetMapping("/{id}")
    public Obavjestenja getObavestenjaById(@PathVariable("id") int id){
        Obavjestenja result = this.obavjestenjaService.getObavjestenjaById(id);
        return result;
    }

    @PostMapping()
    public int insertObavjestenja(@RequestBody Obavjestenja o){
        int result = this.obavjestenjaService.insertObavjestenja(o);
        return result;
    }

    @PutMapping("/{id}")
    public int updateObavjestenja(@RequestBody Obavjestenja o, @PathVariable("id") int id){
        int result = this.obavjestenjaService.updateObavjestenja(o, id);
        return result;
    }
    @DeleteMapping("/{id}")
    public int deleteObavjestenja(@PathVariable("id") int id){
        int result = this.obavjestenjaService.deleteObavjestenja(id);
        return result;
    }
}
