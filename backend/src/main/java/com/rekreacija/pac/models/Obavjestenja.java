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

    public Obavjestenja(int id, int user_id, int pitch_id, String title, String description, Date date, int type) {
        this.id = id;
        this.user_id  = user_id;
        this.pitch_id = pitch_id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.type = type;

    }
}
