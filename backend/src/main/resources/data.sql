
INSERT INTO ekipa (id, name, rating) VALUES
                                         (1, 'Stari Aerodrom', NULL),
                                         (2, 'Zabjelo', NULL),
                                         (3, 'City Kvart', NULL);

-- TERENI (futsal, košarka, tenis u Podgorici)
INSERT INTO teren (id, name, adress, contact, type, description, rating, owner_id) VALUES
                                                                                       (1, 'Morača - Futsal teren', 'Bulevar Revolucije bb', '067123456', 1, 'Futsal teren sa veštačkom travom, osvetljenjem i svlačionicama.', 4.5, 1),
                                                                                       (2, 'Tološi - Košarkaški teren', 'Ulica V Proleterske', '067987654', 2, 'Otvoreni košarkaški teren sa reflektorima.', 4.2, 1),
                                                                                       (3, 'Teniski tereni Ljubović', 'Ljubović bb', '068222333', 3, 'Dva teniska terena sa tartan podlogom.', 4.7, 1);

-- REZERVACIJE
INSERT INTO rezervacija (id, status, start_date, end_date, pitch_id, user_id) VALUES
                                                                                  (1, 'zauzeto', '2025-05-10 18:00:00', '2025-05-10 19:00:00', 1, 1),
                                                                                  (2, 'zauzeto', '2025-05-11 20:00:00', '2025-05-11 21:00:00', 2, 1),
                                                                                  (3, 'slobodno', '2025-05-12 17:00:00', '2025-05-12 18:00:00', 3, NULL);

-- POZAJMICE
INSERT INTO pozajmica (id, user_id, reservation_id, rating) VALUES
                                                                (1, 1, 1, NULL),
                                                                (2, 1, 2, NULL);

-- OGLASI / OBAVJESTENJA
INSERT INTO obavjestenja (id, user_id, pitch_id, title, description, date, type) VALUES
                                                                                     (1, 1, 1, 'Tražimo jednog igrača za futsal', 'Fali nam jedan igrač za večerašnji meč u 18h, javite se!', '2025-05-06', 0),
                                                                                     (2, 1, 2, 'Košarka 2 na 2!', 'Ekipa iz City Kvarta traži protivnike za friendly 2v2.', '2025-05-07', 1);

-- OCJENE (ekipa)
INSERT INTO ocjena (id, fair_play, intensity, quality, team_id) VALUES
                                                                    (1, 4, 5, 5, 1),
                                                                    (2, 5, 4, 4, 2);

-- OCJENE POZAJMICA
INSERT INTO ocjena_pozajmica (id, fair_play, intensity, quality, loan_id) VALUES
                                                                              (1, 5, 5, 5, 1),
                                                                              (2, 4, 4, 4, 2);