package com.rekreacija.pac;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {

    public static Connection openConnection() throws SQLException {
        String user = "root";
        String password = "LVaxMjBqWqrNOVsMzoiNufeZjZngSPhE";
        String url = "jdbc:mysql://root:LVaxMjBqWqrNOVsMzoiNufeZjZngSPhE@ballast.proxy.rlwy.net:51808/railway";

        return DriverManager.getConnection(url, user, password);

    }
}
