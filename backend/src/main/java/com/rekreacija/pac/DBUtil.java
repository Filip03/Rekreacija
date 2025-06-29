package com.rekreacija.pac;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {

    public static Connection openConnection() throws SQLException {
        String user = "root";
        String password = "ajdepogodi";
        String url = "jdbc:mysql://localhost:3306/rekreacija";

        return DriverManager.getConnection(url, user, password);

    }
}
