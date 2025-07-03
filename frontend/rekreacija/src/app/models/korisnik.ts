export interface Korisnik {
  id: number;
  name: string;      // U Javi je 'name'
  surname: string;
  email: string;
  username: string;
  phone_number: string;
  date_of_registration: string; // JSON će poslati datum kao string
  team_id: number | null;
  type_id: number;
  password?: string; // Nije nam potreban na frontendu, ali neka stoji kao opcija
}