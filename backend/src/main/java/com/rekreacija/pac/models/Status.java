package com.rekreacija.pac.models;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Status{
        SLOBODNO("slobodno"),
        ZAUZETO("zauzeto");

        private final String statusValue;

        Status(String statusValue) {
            this.statusValue = statusValue;
        }

        @JsonValue
        public String getStatusValue() {
            return this.statusValue;
        }

        public static Status fromString(String status) {
            for (Status s : Status.values()) {
                if (s.statusValue.equalsIgnoreCase(status)) {
                    return s;
                }
            }
            throw new IllegalArgumentException("Nepoznata vrijednost statusa: " + status);
        }
    }

