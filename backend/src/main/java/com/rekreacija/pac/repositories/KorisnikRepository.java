package com.rekreacija.pac.repositories;

import com.rekreacija.pac.DBUtil;
import com.rekreacija.pac.models.Korisnik;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class KorisnikRepository {

    public List<Korisnik> getAllKorisnik(){

        Connection conn = null;
        ArrayList<Korisnik> result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            result = new ArrayList<>();
            String commandText = "SELECT * FROM korisnik";
            ps = conn.prepareStatement(commandText);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Korisnik k = new Korisnik(
                        rs.getInt("id"),
                        rs.getInt("type_id"),
                        rs.getInt("team_id"),
                        rs.getDate("date_of_registration"),
                        rs.getString("phone_number"),
                        rs.getString("password"),
                        rs.getString("email"),
                        rs.getString("username"),
                        rs.getString("surname"),
                        rs.getString("name")
                );
                result.add(k);
            }
            ps.close();
            conn.close();
        }
        catch(Exception e){
            result = null;
            e.printStackTrace();
        }
        finally{
            try{
                if(ps!=null) ps.close();
                if(conn!=null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public Korisnik getKorisnik(int id){
        Connection conn = null;
        Korisnik result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM korisnik WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if(!rs.next()){
                throw new Exception("Korisnik sa identifikacionim brojem: " + id + " nije pronadjen!");
            }
            result = new Korisnik(
                    rs.getInt("id"),
                    rs.getInt("type_id"),
                    rs.getInt("team_id"),
                    rs.getDate("date_of_registration"),
                    rs.getString("phone_number"),
                    rs.getString("password"),
                    rs.getString("email"),
                    rs.getString("username"),
                    rs.getString("surname"),
                    rs.getString("name")
            );
            ps.close();
            conn.close();
        }
        catch (Exception e){
            result = null;
            e.printStackTrace();
        }
        finally{
            try{
                if(ps!=null) ps.close();
                if(conn!=null) conn.close();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public static Korisnik getKorisnikByUsername(String username){
        Connection conn = null;
        Korisnik result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM korisnik WHERE username LIKE ?";
            ps = conn.prepareStatement(commandText);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();

            if(!rs.next()){
                throw new Exception("Korisnik sa korisnickim imenom: " + username + " nije pronadjen!");
            }
            result = new Korisnik(
                    rs.getInt("id"),
                    rs.getInt("type_id"),
                    rs.getInt("team_id"),
                    rs.getDate("date_of_registration"),
                    rs.getString("phone_number"),
                    rs.getString("password"),
                    rs.getString("email"),
                    rs.getString("username"),
                    rs.getString("surname"),
                    rs.getString("name")
            );
            ps.close();
            conn.close();
        }
        catch (Exception e){
            result = null;
            e.printStackTrace();
        }
        finally{
            try{
                if(ps!=null) ps.close();
                if(conn!=null) conn.close();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int insertKorisnik(Korisnik k){
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "INSERT INTO korisnik(name, surname, email, password, username, phone_number, date_of_registration, team_id, type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            ps = conn.prepareStatement(commandText);
            ps.setString(1, k.name);
            ps.setString(2, k.surname);
            ps.setString(3, k.email);
            ps.setString(4, k.password);
            ps.setString(5, k.username);
            ps.setString(6, k.phone_number);
            ps.setDate(7, k.date_of_registration);
            if(k.team_id!=null) ps.setInt(8, k.team_id);
            else ps.setNull(8, java.sql.Types.INTEGER);
            ps.setInt(9, k.type_id);

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("Greska prilikom kreiranja korinsik!");
            }
            result = affectedRows;
            ps.close();
            conn.close();

        }
        catch(Exception e){
            result = -1;
            e.printStackTrace();
        }
        finally{
            try{
                if(ps!=null) ps.close();
                if(conn!=null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int updateKorinsik(Korisnik k, int korisnik_id){
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "UPDATE korisnik SET name=?, surname=?, username=?, email=?, password=?, "+
                    "phone_number=?, date_of_registration=?, team_id=?, type_id=? WHERE id=?";
            ps = conn.prepareStatement(commandText);
            ps.setString(1, k.name);
            ps.setString(2, k.surname);
            ps.setString(3, k.username);
            ps.setString(4, k.email);
            ps.setString(5, k.password);
            ps.setString(6, k.phone_number);
            ps.setDate(7, k.date_of_registration);
            if (k.team_id != null) {
                ps.setInt(8, k.team_id);
            } else {
                ps.setNull(8, java.sql.Types.INTEGER);
            }
            ps.setInt(9, k.type_id);
            ps.setInt(10, korisnik_id);

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("Greska prilikom azuriranja korinsika!");
            }
            result = affectedRows;
            ps.close();
            conn.close();

        }
        catch(Exception e){
            result = -1;
            e.printStackTrace();
        }
        finally{
            try{
                if(ps!=null) ps.close();
                if(conn!=null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int deleteKorisnik(int id){
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "DELETE FROM korisnik WHERE id=?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("Greska prilikom brisanja korinsika!");
            }
            result = affectedRows;
            ps.close();
            conn.close();
        }
        catch(Exception e){
            result = -1;
            e.printStackTrace();
        }
        finally{
            try{
                if (ps!=null) ps.close();
                if(conn!=null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int updateProfile(int korisnik_id, String new_username, String new_phone_number){
        Connection con = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            con = DBUtil.openConnection();
            String commandText = "UPDATE korisnik SET username = ?, phone_number = ? WHERE id = ?";
            ps = con.prepareStatement(commandText);
            ps.setString(1, new_username);
            ps.setString(2, new_phone_number);
            ps.setInt(3, korisnik_id);

            result = ps.executeUpdate();
            ps.close();
            con.close();
        }
        catch (Exception e){
            result = -1;
            e.printStackTrace();
        }
        finally{
            try{
                if(ps!=null) ps.close();
                if(con!=null) con.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }
}
