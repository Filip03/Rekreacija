package com.rekreacija.pac.repositories;

import com.rekreacija.pac.DBUtil;
import com.rekreacija.pac.models.Pozajmica;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PozajmicaRepository {

    public List<Pozajmica> getAllPozajmica(){
        Connection conn = null;
        PreparedStatement ps = null;
        ArrayList<Pozajmica> result = null;

        try{
            conn = DBUtil.openConnection();
            result = new ArrayList<>();
            String commandText = "SELECT * FROM pozajmica";
            ps = conn.prepareStatement(commandText);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Pozajmica p = new Pozajmica(
                        rs.getInt("id"),
                        rs.getBigDecimal("rating"),
                        rs.getInt("user_id"),
                        rs.getInt("reservation_id")
                );
                result.add(p);
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
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public Pozajmica getPozajmicaById(int id){
        Connection conn = null;
        PreparedStatement ps = null;
        Pozajmica result = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM pozajmica WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if(!rs.next()){
                throw new Exception("Pozajmica sa identifikacionim brojem " + id + " ne postoji!");
            }
            result = new Pozajmica(
                    rs.getInt("id"),
                    rs.getBigDecimal("rating"),
                    rs.getInt("user_id"),
                    rs.getInt("reservation_id")
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
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int insertPozajmica(Pozajmica p){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "INSERT INTO pozajmica (id, rating, user_id, reservation_id) VALUES (?, ?, ?, ?)";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, p.id);
            ps.setBigDecimal(2, p.rating);
            ps.setInt(3, p.user_id);
            ps.setInt(4, p.reservation_id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom kreiranja pozajmie!");
            }
            result = affectedRows;
            ps.close();
            conn.close();

        } catch (Exception e) {
            result = -1;
            e.printStackTrace();
        }
        finally {
            try{
                if(ps!=null) ps.close();
                if(conn != null) conn.close();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int updatePozajmica(Pozajmica p, int p_id){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "UPDATE pozajmica SET rating = ?, user_id= ?, reservation_id = ? WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setBigDecimal(1, p.rating);
            ps.setInt(2, p.user_id);
            ps.setInt(3, p.reservation_id);
            ps.setInt(4, p_id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom azuriranja pozajmice!");
            }
            result = affectedRows;
            ps.close();
            conn.close();

        } catch (Exception e) {
            result = -1;
            e.printStackTrace();
        }
        finally {
            try{
                if(ps!=null) ps.close();
                if(conn != null) conn.close();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int deletePozajmica(int p_id){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "DELETE FROM pozajmica WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, p_id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom brisanja pozajmice!");
            }
            result = affectedRows;
            ps.close();
            conn.close();

        } catch (Exception e) {
            result=-1;
            e.printStackTrace();
        }
        finally {
            try{
                if(ps!=null) ps.close();
                if(conn != null) conn.close();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }
}
