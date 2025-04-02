package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Obavjestenja;
import com.rekreacija.pac.repositories.ObavjestenjaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObavjestenjaService {

    private ObavjestenjaRepository obavjestenjaRepository;

    public ObavjestenjaService(ObavjestenjaRepository obavjestenjaRepository) {
        this.obavjestenjaRepository = obavjestenjaRepository;
    }

    public List<Obavjestenja> getAllObavjesetnja(){
        List<Obavjestenja> result = this.obavjestenjaRepository.getAllObavestenja();
        return result;
    }

    public Obavjestenja getObavjestenjaById(int id){
        Obavjestenja result = this.obavjestenjaRepository.getObavestenjaById(id);
        return result;
    }

    public int insertObavjestenja(Obavjestenja o){
        int result = this.obavjestenjaRepository.insertObavjestenja(o);
        return result;
    }

    public int updateObavjestenja(Obavjestenja o, int id){
        int result = this.obavjestenjaRepository.updateObavjestenja(o, id);
        return result;
    }

    public int deleteObavjestenja(int id){
        int result = this.obavjestenjaRepository.deleteObavjestenja(id);
        return result;
    }
}
