package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Teren;
import com.rekreacija.pac.repositories.TerenRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerenService {

    private TerenRepository terenRepository;

    public TerenService(TerenRepository terenRepository) { this.terenRepository = terenRepository; }

    public List<Teren> getAllteren(){
        return this.terenRepository.getAllTeren();
    }

    public Teren getTerenById(int id){
        return this.terenRepository.getTerenById(id);
    }

    public int insertTeren(Teren teren){
        return this.terenRepository.insertTeren(teren);
    }

    public int updateTeren(Teren teren, int id){
        return this.terenRepository.updateTeren(teren, id);
    }

    public int deleteTeren(int id){
        return this.terenRepository.deleteTeren(id);
    }
}
