package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Pozajmica;
import com.rekreacija.pac.repositories.PozajmicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PozajmicaService {

    private PozajmicaRepository pozajmicaRepository;

    public PozajmicaService(PozajmicaRepository pozajmicaRepository) { this.pozajmicaRepository = pozajmicaRepository; }

    public List<Pozajmica> getAllPozajmica() {
        List<Pozajmica> result = this.pozajmicaRepository.getAllPozajmica();
        return result;
    }
    public Pozajmica getPozajmicaById(int id) {
        return this.pozajmicaRepository.getPozajmicaById(id);
    }

    public int insertPozajmica(Pozajmica pozajmica) {
        return this.pozajmicaRepository.insertPozajmica(pozajmica);
    }

    public int updatePozajmica(Pozajmica pozajmica, int id) {
        return this.pozajmicaRepository.updatePozajmica(pozajmica, id);
    }
    public int deletePozajmica(int id) {
        return this.pozajmicaRepository.deletePozajmica(id);
    }
}
