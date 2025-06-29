## Projekat iz Softverskog inzenjerstva - Rekreacija++

## Rok da zavrsimo sve svoje taskove, tj aplikaciju je 5. jul

## BACKEND!!!

- Makao sam application.poperties sa git-a zbog nekog security policy jer tamo cuvam API KEY za OpenAI
- Kod vas chatbot nece raditi jer nemate API KEY, tkd cu vam pokazat kako chatbot radi nedje kad se sretnemo

## Raspored TASKOVA

- Taskovi su podijeljeni svima, kao po dogovoru, Luka i Aleksa da zavrsite frontend, ja cu chatbota, backend i Admin stranicu.
- Rok da zavrsimo sve svoje taskove, tj aplikaciju je 5. jul kako bismo imali vremena da je citavu testiramo i finisiramo mobilnu aplikaciju
- Mobilnu aplikaciju necemo dirati dok sve ne zavrsimo
- Merge request slati tek kada je stranica citava gotova i funkcionalna

## Backend

- Sto se backenda tice, sve sto vam bude trebalo, posaljite mi poruku, ja cu to dodati
- U jwt tokenu ce se cuvati: username, user_id i type_id

- ## Baza
  
- Baza je popunjena podacima:
      - kreirani su svi korisnici, od vlasnika terena do nasih naloga
      - svi vlasnici imaju lozinku Upravnik123!
      - Lukin nalog: username: Sekula; password: Luka123!
      - Aleksin nalog: username: Tovi; password: Aleksa123!
      - dodao sam i sve terene, za fudbal. kosarku i tenis
      - dodao sam i 2 obavjestenja da se moze testirati radi li sve kako treba
      - ostale kolone su prazne jer su to podaci koji se trebaju unositi kroz aplikaciju

## Mobilna aplikacija

- prije pokretanja u android studio, mora se uraditi ng build --configuration=dev-mobile kako bi komunikacija sa backendom radila, tj zahtjevi se slali na http://10.0.2.2:8080
- nakon toga npx cap sync; npx cap run android ili npx cap open android
- mobilna aplikacija mora da se pokrene preko emulatora, na telefonu preko usb nece raditi backend
- da bi se "vratilo" na web apk, mora se uraditi ng build --configuration=development, da bi se zahtjevi slali na http://localhost:8080

## Frontend

- U servisima mora da se koristi environment.ts prilikom upucivanja zahtjeva backendu (obratiti paznju da se importuje environment fajl, a ne environment.development)
- Citava aplikacija treba biti na srpskom
- Drzati se sadasnje teme: dominantne boje: zelena, bijela; sekundarne: plava, zuta
- Voditi racuna da UI svuda bude isti u smislu:
    - dugmad treba da imaju border od 1px, cija je boja identicna boji dugmeta, tj pozadine
    - sva dugmad treba da imaju hover effects: da se boja malo zatamni, da se dugme malo uveca (transform: scale(1.05)), cursor tipa pointer
    - glavna dugmad (zavisi od stranice do stranice - glavno dugme na stranici je npr. Zakazite termin sa Pocetne stranice) treba na hover da se invertuje:
      - boja teksta postaje boja dugmeta a boja dugmeta postaje boja teksta
    - glavni divovi (koji su okvir za neku formu ili holderi za neki sadrzaj) treba da imaju border-radius od 20px i box-shadow: 0 2px 8px (rgba: 0, 0, 0, 0.7)
    - font treba na svim stranicama da bude isti (pogledati koji se trenutno font koristi na pocetnoj stranici i about stranici)
    - gledati da UI bude interaktivan, najlakse postici sa hover effects sa transform: scale ili transform: translate
- VODITI RACUNA O RESPONSIVE DESIGN !!!!!
    - posto nam je mobilna aplikacija bukv samo prevod web aplikacije, neophodno je da dizajn bude responsive, kada pravite stranice kroz DevTools gledajte kako ona izgleda na telefonu
    - najbolje koristiti relativne vrijednosti tipa % ili vh/vw, a ako treba apsolutna vrijednosti tipa px, obezbijediti kroz @media(max-width: 600px) da ta apsolutna vrijednost bude proporcijalna za telefone
