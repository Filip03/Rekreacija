package com.rekreacija.pac.models;

public class Ekipa {

    public int id;
    public String name;
    public int rating_id;

    public Ekipa(int id, int rating_id, String name) {
        this.id = id;
        this.rating_id = rating_id;
        this.name = name;
    }
}
