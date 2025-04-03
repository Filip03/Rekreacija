package com.rekreacija.pac.models;

import java.math.BigDecimal;

public class Pozajmica {

    public int id;
    public BigDecimal rating;
    public int user_id;
    public int reservation_id;

    public Pozajmica(int id, BigDecimal rating, int user_id, int reservation_id) {
        this.id = id;
        this.rating = rating;
        this.user_id = user_id;
        this.reservation_id = reservation_id;
    }
}
