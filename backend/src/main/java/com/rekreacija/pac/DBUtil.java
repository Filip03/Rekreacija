package com.rekreacija.pac;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {

    public static Connection openConnection() {
        String url = "jdbc:mysql://localhost:3306/rekreacija";
        String user = "root";
        String password = "Aleksa12.";
        try {
            return DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
