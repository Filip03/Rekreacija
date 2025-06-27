package com.rekreacija.pac.models;

import java.math.BigDecimal;

public class Ocjena {

    public int id;
    public BigDecimal overall;
    public int fair_play;
    public int intensity;
    public int quality;
    public int team_id;

    public Ocjena(int id, BigDecimal overall, int fair_play, int intensity, int quality, int team_id) {
        this.id = id;
        this.overall = overall;
        this.fair_play = fair_play;
        this.intensity = intensity;
        this.quality = quality;
        this.team_id = team_id;
    }
}
