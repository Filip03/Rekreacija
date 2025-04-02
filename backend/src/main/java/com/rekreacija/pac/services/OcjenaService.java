package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Ocjena;
import com.rekreacija.pac.repositories.OcjenaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OcjenaService {

    private OcjenaRepository ocjenaRepository;

    public OcjenaService(OcjenaRepository ocjenaRepository) { this.ocjenaRepository = ocjenaRepository; }

    public List<Ocjena> getAllOcjena(){
        List<Ocjena> result = this.ocjenaRepository.getAllOcjena();
        return result;
    }
    public Ocjena getOcjenaById(int id){
        Ocjena result = this.ocjenaRepository.getOcjenaById(id);
        return result;
    }
    public int insertOcjena(Ocjena o){
        int result = this.ocjenaRepository.insertOcjena(o);
        return result;
    }
    public int updateOcjena(Ocjena o, int id) {
        return this.ocjenaRepository.updateOcjena(o, id);
    }
    public int deleteOcjena(int id) {
        return this.ocjenaRepository.deleteOcjena(id);
    }
}
