package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Korisnik;
import com.rekreacija.pac.repositories.KorisnikRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KorisnikService {

    private KorisnikRepository korisnikRepository;

    public KorisnikService(KorisnikRepository korisnikRepository) { this.korisnikRepository = korisnikRepository; }

    public List<Korisnik> getAllKorinsik(){
        List<Korisnik> korisnikList = this.korisnikRepository.getAllKorisnik();
        return korisnikList;
    }

    public Korisnik getKorisnikById(int id){
        Korisnik result = this.korisnikRepository.getKorisnik(id);
        return result;
    }

    public Korisnik getKorisnikByUsername(String username){
        Korisnik result = this.korisnikRepository.getKorisnikByUsername(username);
        return result;
    }

    public int insertKorisnik(Korisnik korisnik){
        int result = this.korisnikRepository.insertKorisnik(korisnik);
        return result;
    }

    public int updateKorisnik(Korisnik korisnik, int id){
        int result = this.korisnikRepository.updateKorinsik(korisnik, id);
        return result;
    }

    public int deleteKorisnik(int id){
        int result = this.korisnikRepository.deleteKorisnik(id);
        return result;
    }

    public int updateProfile(int korisnik_id, String new_username, String new_phone_number){
        return this.korisnikRepository.updateProfile(korisnik_id, new_username, new_phone_number);
    }
}
