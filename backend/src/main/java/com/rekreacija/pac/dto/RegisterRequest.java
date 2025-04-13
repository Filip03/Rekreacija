package com.rekreacija.pac.dto;

public record RegisterRequest(
        String name,
        String surname,
        String email,
        String username,
        String password,
        String phone_number,
        Integer team_id,
        Integer type_id
        ) {}
