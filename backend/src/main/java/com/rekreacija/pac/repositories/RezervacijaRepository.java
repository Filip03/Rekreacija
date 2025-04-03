package com.rekreacija.pac.repositories;

import com.rekreacija.pac.DBUtil;
import com.rekreacija.pac.models.Rezervacija;
import com.rekreacija.pac.models.Status;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RezervacijaRepository {

    public List<Rezervacija> getAllRezervacija(){
        Connection conn = null;
        PreparedStatement ps = null;
        ArrayList<Rezervacija> result = new ArrayList<>();

        try{
            conn = DBUtil.openConnection();
            String command = "SELECT * FROM Rezervacija";
            ps = conn.prepareStatement(command);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Rezervacija r = new Rezervacija(
                        rs.getInt("id"),
                        Status.valueOf(rs.getString("status").toUpperCase()),
                        rs.getTimestamp("start_date").toLocalDateTime(),
                        rs.getTimestamp("end_date").toLocalDateTime(),
                        rs.getInt("user_id"),
                        rs.getInt("pitch_id")
                );
                result.add(r);
            }
            ps.close();
            conn.close();

        }
        catch(Exception e){
            result = null;
            e.printStackTrace();
        }
        finally {
            try{
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    public Rezervacija getRezervacijaById(int id){
        Connection conn = null;
        PreparedStatement ps = null;
        Rezervacija result = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM Rezervacija WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if(!rs.next()){
                throw new Exception("Rezervacija ne postoji!");
            }
            result = new Rezervacija(
                    rs.getInt("id"),
                    Status.valueOf(rs.getString("status").toUpperCase()),
                    rs.getTimestamp("start_date").toLocalDateTime(),
                    rs.getTimestamp("end_date").toLocalDateTime(),
                    rs.getInt("user_id"),
                    rs.getInt("pitch_id")
            );
            ps.close();
            conn.close();
        }
        catch(Exception e){
            result = null;
            e.printStackTrace();
        }
        finally {
            try{
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int insertRezervacija(Rezervacija rez){
        Connection conn = null;
        PreparedStatement ps = null;
        int result=-1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "INSERT INTO rezervacija(status, start_date, end_date, user_id, pitch_id) VALUES(?,?,?,?,?)";
            ps = conn.prepareStatement(commandText);
            ps.setString(1, rez.status.toString().toLowerCase());
            ps.setTimestamp(2, Timestamp.valueOf(rez.start_date));
            ps.setTimestamp(3, Timestamp.valueOf(rez.end_date));
            ps.setInt(4, rez.user_id);
            ps.setInt(5, rez.pitch_id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom unosa rezervacije!");
            }
            result = affectedRows;
            ps.close();
            conn.close();
        }
        catch(Exception e){
            result = -1;
            e.printStackTrace();
        }
        finally {
            try{
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }
    public int updateRezervacija(Rezervacija rez, int id){
        Connection conn = null;
        PreparedStatement ps = null;
        int result=-1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "UPDATE rezervacija SET status = ?, start_date = ?, end_date = ?, user_id = ?, pitch_id = ? WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setString(1, rez.status.toString().toLowerCase());
            ps.setTimestamp(2, Timestamp.valueOf(rez.start_date));
            ps.setTimestamp(3, Timestamp.valueOf(rez.end_date));
            ps.setInt(4, rez.user_id);
            ps.setInt(5, rez.pitch_id);
            ps.setInt(6, id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom azuriranja rezervacije!");
            }
            result = affectedRows;
            ps.close();
            conn.close();
        }
        catch(Exception e){
            result = -1;
            e.printStackTrace();
        }
        finally {
            try{
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int deleteRezervacija(int id){
        Connection conn = null;
        PreparedStatement ps = null;
        int result=-1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "DELETE FROM rezervacija WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom azuriranja rezervacije!");
            }
            result = affectedRows;
            ps.close();
            conn.close();
        }
        catch(Exception e){
            result = -1;
            e.printStackTrace();
        }
        finally {
            try{
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }
}
