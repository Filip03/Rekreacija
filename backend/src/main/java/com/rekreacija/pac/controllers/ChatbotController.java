package com.rekreacija.pac.controllers;


import com.rekreacija.pac.services.ChatGptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

//@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatbotController {

    @Autowired
    private ChatGptService chatGptService;

    @PostMapping
    public Mono<Map<String, String>> chat(@RequestBody Map<String, String> payload) {
        String question = payload.get("message");

        try {
            String faq = Files.readString(Paths.get("src/main/resources/description.txt"));
            String tereni = Files.readString(Paths.get("src/main/resources/tereni.json"));

            String prompt = """
                Ti si pomoćnik korisnicima sajta za rezervaciju sportskih terena.
                Tereni koje imamo su iz stvarnog svijeta, svi se nalaze u Podgorici i adrese u json-u su tačne.
                Ako korisnik postavi pitanje o najbližim terenima, koristi adrese iz json fajla i pokušaj da zaključiš koji su tereni najbliži lokaciji koju je korisnik naveo (npr. "Blok 5", " preko Morače", "Zabjelo").
                Prvo pogledaj da li se area iz json fajla poklapa sa adresom koju korisnik navodi, ako ne sam zakljuci koja je najbliza adresa trazenoj lokaciji.
                Ako korisnik nije naveo tip terena (kosarka, tenis, fudbal) gledaj da nadjes po 1 najblizi teren za sva tri sporta. Za svaki teren navedi koji je tip (fudbal, tenis, kosarka).
                Ako je naveo tip terena, onda vrati maksimalno 3 najbliza terena (ako navedena lokacija nije blizu nijednog terena, vrati 1 najblizi)
                Tipovi terena oznaceni su kolonom type: 1-fudbal; 2-kosarka; 3-tenis.
                Kada vracas podatke vrati name, description, adress, contact.
                Za svaki teren na kraju dodaj i Link: /reservation/id, pri cemu je id zapravo id iz json fajla za taj teren.
                Ako pitanje nije o lokaciji, već o sajtu, koristi opis sajta (descrption.txt).

                PODACI O TERENIMA:
                %s

                PODACI O SAJTU:
                %s

                PITANJE KORISNIKA:
                %s
                """.formatted(tereni, faq, question);

            return chatGptService.askChatGpt(prompt)
                    .map(reply -> Map.of("response", reply));

        } catch (Exception e) {
            return Mono.just(Map.of("reply", "Greška prilikom obrade upita."));
        }
    }
}
