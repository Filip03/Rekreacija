package com.rekreacija.pac.controllers;

import com.rekreacija.pac.models.Tip;
import com.rekreacija.pac.services.TipService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tip")
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
