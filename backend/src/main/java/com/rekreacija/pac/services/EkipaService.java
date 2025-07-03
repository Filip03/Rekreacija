package com.rekreacija.pac.services;

import com.rekreacija.pac.models.Ekipa;
import com.rekreacija.pac.models.Korisnik;
import com.rekreacija.pac.models.KreirajEkipuRequest;
import com.rekreacija.pac.repositories.EkipaRepository;
import com.rekreacija.pac.repositories.KorisnikRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class EkipaService {

    private EkipaRepository ekipaRepository;
    private KorisnikRepository korisnikRepository;
    public EkipaService(KorisnikRepository korisnikRepository,EkipaRepository ekipaRepository) {
        this.ekipaRepository = ekipaRepository;
        this.korisnikRepository = korisnikRepository;
    }

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

    public Ekipa kreirajEkipuSveobuhvatno(KreirajEkipuRequest request) throws Exception {
        // 1. Kreiraj objekat Ekipa
        Ekipa novaEkipa = new Ekipa(0, new BigDecimal(0.0), request.getName(), request.getCreator_id());

        // 2. Ubaci ekipu u bazu i dobij njen ID
        int novaEkipaId = ekipaRepository.insertEkipaIVratiId(novaEkipa);
        if (novaEkipaId == -1) {
            throw new Exception("Nije moguće kreirati ekipu u bazi.");
        }
        novaEkipa.id = novaEkipaId;

        // 3. Ažuriraj svakog člana iz liste
        if (request.getClanoviIds() != null && !request.getClanoviIds().isEmpty()) {
            for (Integer korisnikId : request.getClanoviIds()) {
                Korisnik k = korisnikRepository.getKorisnik(korisnikId);
                if (k != null) {
                    k.team_id = novaEkipaId;
                    korisnikRepository.updateKorinsik(k, korisnikId);
                }
            }
        }

        return novaEkipa;
    }
}
