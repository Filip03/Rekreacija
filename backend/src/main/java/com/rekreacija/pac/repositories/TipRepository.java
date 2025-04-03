package com.rekreacija.pac.repositories;

import com.rekreacija.pac.DBUtil;
import com.rekreacija.pac.models.Tip;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TipRepository {

    public List<Tip> getAllTip(){
        Connection conn = null;
        ArrayList<Tip> result = new ArrayList<>();
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM tip";
            ps = conn.prepareStatement(commandText);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Tip t = new Tip(rs.getInt("id"), rs.getString("name"));
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

    public Tip getTipById(int id){
        Connection conn = null;
        Tip result = null;
        PreparedStatement ps = null;

        try{
            conn = DBUtil.openConnection();
            String commandText = "SELECT * FROM tip WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if(!rs.next()){
                throw new Exception("Tip korisnika ne postoji!");
            }
            result = new Tip(rs.getInt("id"), rs.getString("name"));
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
}
