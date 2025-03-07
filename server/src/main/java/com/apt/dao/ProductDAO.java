package com.apt.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.apt.dao.Interface.DAOInterface;
import com.apt.model.Product;

public class ProductDAO implements DAOInterface<Product> {

    @Override
    public int insert(Product product) {
        return 1;
    }

    @Override
    public int update(Product product) {
        return 1;
    };

    @Override
    public int delete(Product product) {
        return 1;
    }   

    @Override
    public ArrayList<Product> selectAll() {
        ArrayList<Product> products = new ArrayList<>();
        String query = "SELECT * FROM product";  

        try (Connection connection = DataBaseConnector.getConnection();
             Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                Product product = new Product();
                product.setProductId(rs.getInt("product_id"));
                product.setCategoryId(rs.getInt("category_id"));
                product.setName(rs.getString("name"));
                product.setPrice(rs.getDouble("price"));
                product.setQuantity(rs.getInt("quantity"));
                product.setDiscount(rs.getDouble("discount"));
                product.setRating(rs.getFloat("rating"));
                product.setReviews(rs.getFloat("reviews"));
                product.setDescription(rs.getString("description"));
                product.setImgLink(rs.getString("img_link"));

                products.add(product);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return products;  
    }

    @Override
    public Product selectById(String id){return null;}

    @Override
    public ArrayList<Product> selectByCondition(String condition) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'selectByCondition'");
    }

    

}
