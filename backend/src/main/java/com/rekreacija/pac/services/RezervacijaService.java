package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Rezervacija;
import com.rekreacija.pac.repositories.RezervacijaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
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

        List<Rezervacija> all = this.rezervacijaRepository.getAllRezervacija();
        for(Rezervacija r : all) {
            if(r.pitch_id == rez.pitch_id && rez.start_date.isBefore(r.end_date) && rez.end_date.isAfter(r.start_date)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Termin je zauzet!");
            }
        }
        return this.rezervacijaRepository.insertRezervacija(rez);
    }
    public int updateRezervacija(Rezervacija rezervacija, int rezervacija_id) {
        return this.rezervacijaRepository.updateRezervacija(rezervacija, rezervacija_id);
    }
    public int deleteRezervacija(int rezervacija_id) {
        return this.rezervacijaRepository.deleteRezervacija(rezervacija_id);
    }
}
