package com.rekreacija.pac.models;

import java.math.BigDecimal;

public class Ekipa {

    public int id;
    public String name;
    public BigDecimal rating;
    public int creator_id;

    public Ekipa(int id, BigDecimal rating, String name, int creator_id) {
        this.id = id;
        this.rating = rating;
        this.name = name;
        this.creator_id = creator_id;
    }
}
