package com.rekreacija.pac.models;

import java.math.BigDecimal;

public class Teren {

    public int id;
    public String name;
    public String adress;
    public String contact;
    public int type;
    public String description;
    public BigDecimal rating;
    public int owner_id;
    public String img_url;
    public String coordinates_x;
    public String coordinates_y;
    public String area;

    public Teren(int id, String name, String adress, String contact, int type, String description, BigDecimal rating, int owner_id, String img_url, String cordinates_x, String cordinates_y, String area) {
        this.id = id;
        this.name = name;
        this.adress = adress;
        this.contact = contact;
        this.type = type;
        this.description = description;
        this.rating = rating;
        this.owner_id = owner_id;
        this.img_url = img_url;
        this.coordinates_x = cordinates_x;
        this.coordinates_y = cordinates_y;
        this.area = area;
    }
}
