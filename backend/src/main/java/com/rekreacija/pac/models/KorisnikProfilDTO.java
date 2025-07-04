package com.rekreacija.pac.models;
import java.sql.Date;

public class KorisnikProfilDTO{
    public String name;
    public String surname;
    public String email;
    public String username;
    public String phone_number;
    public Date date_of_registration;

    public KorisnikProfilDTO(){};

    public KorisnikProfilDTO(String name, String surname, String email, String username, String phone_number,Date date_of_registration){
        this.name = name;
        this. surname = surname;
        this.email = email;
        this.username = username;
        this.phone_number = phone_number;
        this.date_of_registration = date_of_registration;
    }
}