package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Tip;
import com.rekreacija.pac.services.TipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tip")
@CrossOrigin("*")
public class TipController {

    private TipService tipService;

    public TipController(TipService tipService) { this.tipService = tipService; }

    @GetMapping()
    public List<Tip> getAllTips(){
        return this.tipService.getAllTip();
    }

    @GetMapping("/{id}")
    public Tip getTipById(@PathVariable("id") int id){
        return this.tipService.getTipById(id);
    }
}
