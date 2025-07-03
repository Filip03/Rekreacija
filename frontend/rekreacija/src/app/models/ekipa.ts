import { Korisnik } from "./korisnik";

export interface Ekipa {
  id: number;
  name: string;      // U Javi je 'name'
  rating: number;
  creator_id: number;
  clanovi?: Korisnik[]; // Opciono polje koje ćemo popuniti na frontendu
}