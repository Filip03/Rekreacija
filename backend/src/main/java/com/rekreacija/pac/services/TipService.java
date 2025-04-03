package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Tip;
import com.rekreacija.pac.repositories.TipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipService {

    private TipRepository tipRepository;

    public TipService(TipRepository tipRepository) { this.tipRepository = tipRepository; }

    public List<Tip> getAllTip(){
        return this.tipRepository.getAllTip();
    }
    public Tip getTipById(int id){
        return this.tipRepository.getTipById(id);
    }
}
