package com.rekreacija.pac.repositories;

import com.rekreacija.pac.DBUtil;
import com.rekreacija.pac.models.Obavjestenja;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ObavjestenjaRepository {

    public List<Obavjestenja> getAllObavestenja(){
        Connection conn = null;
        ArrayList<Obavjestenja> result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            result = new ArrayList<>();
            String commandText = "SELECT * FROM obavjestenja";
            ps = conn.prepareStatement(commandText);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Obavjestenja o = new Obavjestenja(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getInt("type"),
                        rs.getDate("date"),
                        rs.getInt("user_id"),
                        rs.getInt("pitch_id")

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

    public Obavjestenja getObavestenjaById(int id){
        Connection conn = null;
        Obavjestenja result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM obavjestenja WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if(!rs.next()){
                throw new Exception("Obavjestenje ne postoji!");
            }
            Obavjestenja o = new Obavjestenja(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("description"),
                    rs.getInt("type"),
                    rs.getDate("date"),
                    rs.getInt("user_id"),
                    rs.getInt("pitch_id")
            );
            result = o;
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
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }

    public int insertObavjestenja(Obavjestenja o){
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            conn=DBUtil.openConnection();
            String commandText = "INSERT INTO obavjestenja(user_id, pitch_id, title, description, date, type) VALUES (?, ?, ?, ?, ?, ?)";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, o.user_id);
            ps.setInt(2, o.pitch_id);
            ps.setString(3, o.title);
            ps.setString(4, o.description);
            ps.setDate(5, o.date);
            ps.setInt(6, o.type);

            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom upisa obavjestenja!");
            }
            result = affectedRows;
            ps.close();
            conn.close();

        }
        catch(Exception e){
            result =-1;
            e.printStackTrace();
        }
        finally{
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
    public int updateObavjestenja(Obavjestenja o, int o_id){
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "UPDATE obavjestenja SET user_id=?, pitch_id=?, title=?, description=?, date=? WHERE id=?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, o.user_id);
            ps.setInt(2, o.pitch_id);
            ps.setString(3, o.title);
            ps.setString(4, o.description);
            ps.setDate(5, o.date);
            ps.setInt(6, o_id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom azuriranja obavjestenja!");
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
                if(ps != null) ps.close();
                if(conn != null) conn.close();
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        return result;
    }
    public int deleteObavjestenja(int o_id){
        Connection conn = null;
        int result = -1;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "DELETE FROM obavjestenja WHERE id=?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, o_id);
            int affectedRows = ps.executeUpdate();
            if(affectedRows==0){
                throw new Exception("Greska prilikom brisanja obavjestenja!");
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
