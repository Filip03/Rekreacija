package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Ekipa;
import com.rekreacija.pac.repositories.EkipaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EkipaService {

    private EkipaRepository ekipaRepository;
    public EkipaService(EkipaRepository ekipaRepository) {this.ekipaRepository = ekipaRepository;}

    public List<Ekipa> getAllEkipa(){
        List<Ekipa> ekipa = this.ekipaRepository.getAllEkipa();
        return ekipa;
    }

    public Ekipa getEkipaByID(int id){
        Ekipa result = this.ekipaRepository.getEkipaByID(id);
        return result;
    }

    public int insertEkipa(Ekipa ekipa) {
        int result = this.ekipaRepository.insertEkipa(ekipa);
        return result;
    }

    public int updateEkipa(Ekipa ekipa, int ekipa_id){
        int result = this.ekipaRepository.updateEkipa(ekipa, ekipa_id);
        return result;
    }

    public int deleteEkipa(int ekipa_id){
        int result = this.ekipaRepository.deleteEkipa(ekipa_id);
        return result;
    }
}
