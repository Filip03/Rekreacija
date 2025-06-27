package com.rekreacija.pac.repositories;

import com.rekreacija.pac.DBUtil;
import com.rekreacija.pac.models.Ocjena;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OcjenaRepository {

    public List<Ocjena> getAllOcjena(){
        Connection conn = null;
        ArrayList<Ocjena> result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            result = new ArrayList<>();
            String commandText = "SELECT * FROM ocjena";
            ps = conn.prepareStatement(commandText);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Ocjena o = new Ocjena(
                        rs.getInt("id"),
                        rs.getBigDecimal("overall"),
                        rs.getInt("fair_play"),
                        rs.getInt("intensity"),
                        rs.getInt("quality"),
                        rs.getInt("team_id")
                );
                result.add(o);
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

    public Ocjena getOcjenaById(int id){
        Connection conn = null;
        Ocjena result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM ocjena WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if(!rs.next()){
                throw new Exception("Ocjena sa identifikacionim brojem: " + id + " nije pronadjena!");
            }
            result = new Ocjena(
                    rs.getInt("id"),
                    rs.getBigDecimal("overall"),
                    rs.getInt("fair_play"),
                    rs.getInt("intensity"),
                    rs.getInt("quality"),
                    rs.getInt("team_id")

            );
            ps.close();
            conn.close();
        }
        catch (Exception e){
            result=null;
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

    public int insertOcjena(Ocjena o){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "INSERT INTO ocjena(overall, fair_play, intensity, quality, team_id) VALUES(?,?,?,?,?)";
            ps = conn.prepareStatement(commandText);
            ps.setBigDecimal(1, o.overall);
            ps.setInt(2, o.fair_play);
            ps.setInt(3, o.intensity);
            ps.setInt(4, o.quality);
            ps.setInt(5, o.team_id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows == 0){
                throw new Exception("Greska prilikom unosa ocjene!");
            }

            result = affectedRows;
            ps.close();
            conn.close();
        }
        catch (Exception e){
            result=-1;
            e.printStackTrace();
        }
        finally{
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

    public int updateOcjena(Ocjena o, int o_id){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "UPDATE ocjena SET overall=?, fair_play=?, intensity=?, quality=?, team_id=? WHERE id=?";
            ps = conn.prepareStatement(commandText);
            ps.setBigDecimal(1, o.overall);
            ps.setInt(2, o.fair_play);
            ps.setInt(3, o.intensity);
            ps.setInt(4, o.quality);
            ps.setInt(5, o.team_id);
            ps.setInt(6, o.id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows == 0){
                throw new Exception("Greska prilikom azuriranja ocjene!");
            }
            result = affectedRows;
            ps.close();
            conn.close();
        }
        catch(Exception e){
            result=-1;
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

    public int deleteOcjena(int o_id){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "DELETE FROM ocjena WHERE id=?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, o_id);
            int affectedRows = ps.executeUpdate();
            if(affectedRows == 0){
                throw new Exception("Greska prilikom brisanja ocjene!");
            }
            result = affectedRows;
            ps.close();
            conn.close();

        } catch (Exception e) {
            result=-1;
            e.printStackTrace();
        }
        finally{
            try{
                if(ps!=null) ps.close();
                if(conn != null) conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}
