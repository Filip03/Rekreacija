package com.rekreacija.pac.repositories;

import com.rekreacija.pac.DBUtil;
import com.rekreacija.pac.models.Ekipa;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EkipaRepository {


    public List<Ekipa> getAllEkipa(){

        Connection conn = null;
        ArrayList<Ekipa> resut = null;
        PreparedStatement ps = null;
        try{
            conn = DBUtil.openConnection();
            resut = new ArrayList<Ekipa>();
            String commandText = "SELECT * FROM ekipa";
            ps = conn.prepareStatement(commandText);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Ekipa e = new Ekipa(
                        rs.getInt("id"),
                        rs.getBigDecimal("rating"),
                        rs.getString("name"),
                        rs.getInt("creator_id")
                );
                resut.add(e);
            }

            ps.close();
            conn.close();

        }
        catch(Exception e){
            resut = null;
            e.printStackTrace();
        }
        finally{
            try{
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return resut;
    }

    public Ekipa getEkipaByID(int id){

        Connection conn = null;
        Ekipa result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM ekipa WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();

            if(!rs.next()){
                throw new Exception("Ekipa with id " + id + " not found");
            }

            result = new Ekipa(
                    rs.getInt("id"),
                    rs.getBigDecimal("rating"),
                    rs.getString("name"),
                    rs.getInt("creator_id")
            );

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

    public int insertEkipa(Ekipa e) {
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try {
            conn = DBUtil.openConnection();
            String commandText = "INSERT INTO ekipa(name, rating, creator_id) VALUES (?, ?, ?)";
            ps = conn.prepareStatement(commandText);
            ps.setString(1, e.name);
            ps.setBigDecimal(2, e.rating);
            ps.setInt(3, e.creator_id);

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new Exception("Greška prilikom kreiranja ekipe!");
            }
            result = 1;
            ps.close();
            conn.close();
        } catch (Exception ex) {
            result = -1;
            ex.printStackTrace();
        } finally {
            try {
                if (ps != null) ps.close();
                if (conn != null) conn.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    public int updateEkipa(Ekipa ekipa, int ekipa_id){
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "UPDATE ekipa SET name = ?, rating = ? WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setString(1, ekipa.name);
            ps.setBigDecimal(2, ekipa.rating);
            ps.setInt(3, ekipa_id);

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {throw new Exception("Greška prilikom ažuriranja ekipe: "+ekipa.name+"!");}

            result = 1;
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
                if(conn != null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int deleteEkipa(int id){
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "DELETE FROM ekipa WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);

            int affectedRows = ps.executeUpdate();
            if (affectedRows==0){throw new Exception("Greška prilikom brisanja ekipe!");}

            result = 1;
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
                if(conn != null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int insertEkipaIVratiId(Ekipa e) {
        Connection conn = null;
        PreparedStatement ps = null;
        int ekipaId = -1;

        try {
            conn = DBUtil.openConnection();
            String commandText = "INSERT INTO ekipa(name, rating, creator_id) VALUES (?, ?, ?)";
            ps = conn.prepareStatement(commandText, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, e.name);
            ps.setBigDecimal(2, e.rating); // Pretpostavka da je rating 0
            ps.setInt(3, e.creator_id);

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                throw new Exception("Greška prilikom kreiranja ekipe!");
            }

            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    ekipaId = generatedKeys.getInt(1);
                } else {
                    throw new Exception("Kreiranje ekipe nije uspelo, ID nije dobijen.");
                }
            }
        } catch (Exception ex) {
            ekipaId = -1;
            ex.printStackTrace();
        } finally {
            try{
                if(ps!=null) ps.close();
                if(conn != null) conn.close();
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
        }
        return ekipaId;
    }
}
