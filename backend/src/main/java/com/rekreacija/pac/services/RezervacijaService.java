package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Rezervacija;
import com.rekreacija.pac.repositories.RezervacijaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RezervacijaService {

    private RezervacijaRepository rezervacijaRepository;

    public RezervacijaService(RezervacijaRepository rezervacijaRepository) { this.rezervacijaRepository = rezervacijaRepository; }

    public List<Rezervacija> getAllRezervacija(){
        return this.rezervacijaRepository.getAllRezervacija();
    }
    public Rezervacija getRezervacijaById(int id) {
        return this.rezervacijaRepository.getRezervacijaById(id);
    }
    public List<Rezervacija> getRezervacijaByUserId(int id) { return this.rezervacijaRepository.getRezervacijaByUserId(id); }
    public int insertRezervacija(Rezervacija rez) {
        return this.rezervacijaRepository.insertRezervacija(rez);
    }
    public int updateRezervacija(Rezervacija rezervacija, int rezervacija_id) {
        return this.rezervacijaRepository.updateRezervacija(rezervacija, rezervacija_id);
    }
    public int deleteRezervacija(int rezervacija_id) {
        return this.rezervacijaRepository.deleteRezervacija(rezervacija_id);
    }
}
