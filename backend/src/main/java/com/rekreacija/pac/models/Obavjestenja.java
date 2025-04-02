package com.rekreacija.pac.models;

import java.sql.Date;

public class Obavjestenja {

    public int id;
    public String title;
    public String description;
    public int type;
    public Date date;
    public int user_id;
    public int pitch_id;

    public Obavjestenja(int id, String title, String description, int type, Date date, int user_id, int pitch_id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.date = date;
        this.user_id = user_id;
        this.pitch_id = pitch_id;
    }
}
