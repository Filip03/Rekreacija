package com.rekreacija.pac.models;

import java.time.LocalDateTime;

public class Rezervacija {

    public int id;
    public Status status;
    public LocalDateTime start_date;
    public LocalDateTime end_date;
    public int user_id;
    public int pitch_id;

    public Rezervacija(int id, Status status, LocalDateTime start_date, LocalDateTime end_date, int user_id, int pitch_id) {
        this.id = id;
        this.status = status;
        this.start_date = start_date;
        this.end_date = end_date;
        this.user_id = user_id;
        this.pitch_id = pitch_id;
    }
}
