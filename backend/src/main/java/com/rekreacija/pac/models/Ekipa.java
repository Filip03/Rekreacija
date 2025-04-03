package com.rekreacija.pac.models;

import java.math.BigDecimal;

public class Ekipa {

    public int id;
    public String name;
    public BigDecimal rating;

    public Ekipa(int id, BigDecimal rating, String name) {
        this.id = id;
        this.rating = rating;
        this.name = name;
    }
}
