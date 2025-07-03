package com.rekreacija.pac.models;

import java.util.List;

public class KreirajEkipuRequest {
    private String name;
    private int creator_id;
    private List<Integer> clanoviIds; // Lista ID-jeva članova (uključujući i kreatora)

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCreator_id() {
        return creator_id;
    }

    public void setCreator_id(int creator_id) {
        this.creator_id = creator_id;
    }

    public List<Integer> getClanoviIds() {
        return clanoviIds;
    }

    public void setClanoviIds(List<Integer> clanoviIds) {
        this.clanoviIds = clanoviIds;
    }
}