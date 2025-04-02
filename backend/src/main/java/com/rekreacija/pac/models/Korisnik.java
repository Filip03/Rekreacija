package com.rekreacija.pac.models;

import java.sql.Date;

public class Korisnik {

    public int id;
    public String name;
    public String surname;
    public String email;
    public String password;
    public String username;
    public String phone_number;
    public Date date_of_registration;
    public int team_id;
    public int type_id;

    public Korisnik(int id, int type_id, int team_id, Date date_of_registration, String phone_number, String password, String email, String username,  String surname, String name) {
        this.id = id;
        this.type_id = type_id;
        this.team_id = team_id;
        this.date_of_registration = date_of_registration;
        this.phone_number = phone_number;
        this.password = password;
        this.email = email;
        this.username = username;
        this.surname = surname;
        this.name = name;
    }
}
