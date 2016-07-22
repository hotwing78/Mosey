package com.theironyard.entities;

import com.google.maps.model.LatLng;

import javax.persistence.*;

/**
 * Created by Ben on 7/20/16.
 */
@Entity
@Table(name="restaurants")
public class Restaurant {

    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String category;

    @Column(nullable = false)
    String price;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String description;

    @Column(nullable = false)
    String localstake;

    @Column
    String address;

    @Column (nullable = false)
    Double lat;

    @Column (nullable = false)
    Double lng;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Restaurant(String category, String price, String name, String description, String localstake, String address) {
        this.category = category;
        this.price = price;
        this.name = name;
        this.description = description;
        this.localstake = localstake;
        this.address = address;
    }

    public Restaurant(String category, String price, String name, String description, String localstake) {
        this.category = category;
        this.price = price;
        this.name = name;
        this.description = description;
        this.localstake = localstake;
    }

    public Restaurant(int id, String address) {
        this.id = id;
        this.address = address;
    }

    public Restaurant() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocalstake() {
        return localstake;
    }

    public void setLocalstake(String localstake) {
        this.localstake = localstake;
    }
}
