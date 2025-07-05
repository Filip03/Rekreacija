export interface Rezervacija {
  id?: number;
  status: string; // 'potvrdjena', 'na cekanju', 'otkazana' itd.
  start_date: string; // LocalDateTime će doći kao ISO string
  end_date: string;
  user_id: number;
  pitch_id: number;
}