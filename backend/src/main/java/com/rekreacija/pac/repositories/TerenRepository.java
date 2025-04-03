package com.rekreacija.pac.repositories;

import com.rekreacija.pac.DBUtil;
import com.rekreacija.pac.models.Teren;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TerenRepository {

    public List<Teren> getAllTeren(){
        Connection conn = null;
        ArrayList<Teren> result = new ArrayList<Teren>();
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "select * from teren";
            ps = conn.prepareStatement(commandText);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Teren t = new Teren(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("adress"),
                        rs.getString("contact"),
                        rs.getInt("type"),
                        rs.getString("description"),
                        rs.getBigDecimal("rating"),
                        rs.getInt("owner_id")
                );
                result.add(t);
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

    public Teren getTerenById(int id){
        Connection conn = null;
        Teren result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "select * from teren where id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if(!rs.next()){
                throw new Exception("Teren sa identifikacionim brojem " + id + " nije pronadjen!");
            }
            result = new Teren(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("adress"),
                    rs.getString("contact"),
                    rs.getInt("type"),
                    rs.getString("description"),
                    rs.getBigDecimal("rating"),
                    rs.getInt("owner_id")

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

    public int insertTeren(Teren teren){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String commandText = "INSERT INTO teren (name, adress, contact, type, description, rating, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
            ps = conn.prepareStatement(commandText);
            ps.setString(1, teren.name);
            ps.setString(2, teren.adress);
            ps.setString(3, teren.contact);
            ps.setInt(4, teren.type);
            ps.setString(5, teren.description);
            ps.setBigDecimal(6, teren.rating);
            ps.setInt(7, teren.owner_id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows == 0){
                throw new Exception("Greska prilikom registrovanja terena!");
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
    public int updateTeren(Teren teren, int t_id){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String CommandText = "UPDATE teren SET name = ?, adress = ?, contact = ?, type = ?, description = ?, rating = ?, owner_id = ? WHERE id = ?";
            ps = conn.prepareStatement(CommandText);
            ps.setString(1, teren.name);
            ps.setString(2, teren.adress);
            ps.setString(3, teren.contact);
            ps.setInt(4, teren.type);
            ps.setString(5, teren.description);
            ps.setBigDecimal(6, teren.rating);
            ps.setInt(7, teren.owner_id);
            ps.setInt(8, t_id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows == 0){
                throw new Exception("Greska prilikom azuriranja terena!");
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
    public int deleteTeren(int id){
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try{
            conn = DBUtil.openConnection();
            String CommandText = "DELETE FROM teren WHERE id = ?";
            ps = conn.prepareStatement(CommandText);
            ps.setInt(1, id);

            int affectedRows = ps.executeUpdate();
            if(affectedRows == 0){
                throw new Exception("Greska prilikom brisanja terena!");
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
