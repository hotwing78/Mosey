package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by Ben on 7/20/16.
 */
@Entity
@Table(name="activities")
public class Activity {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String category;

    @Column(nullable = false)
    String price;

    @Column(nullable = false)
    boolean isoutside;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    String localstake;

    @Column
    String address;

    @Column (nullable = false)
    Double lat;

    @Column (nullable = false)
    Double lng;

   /* @Column(nullable = false)
    int thumbsup;

    @ManyToOne
    User users; */


    public Activity() {
    }

    public Activity(String category, String price, boolean isoutside, String name, String localstake, String address, Double lat, Double lng) {
        this.category = category;
        this.price = price;
        this.isoutside = isoutside;
        this.name = name;
        this.localstake = localstake;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }

    /* public Activity(String category, String price, boolean isoutside, String activityname, String localstake, String address, Double lat, Double lng, User users) {
        this.category = category;
        this.price = price;
        this.isoutside = isoutside;
        this.activityname = activityname;
        this.localstake = localstake;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.users = users;
    } */

    public Activity(int id, String address) {
        this.id = id;
        this.address = address;
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

    public boolean isoutside() {
        return isoutside;
    }

    public void setIsoutside(boolean isoutside) {
        this.isoutside = isoutside;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

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

    public String getLocalstake() {
        return localstake;
    }

    public void setLocalstake(String localstake) {
        this.localstake = localstake;
    }

    /*public int getThumbsup() {
        return thumbsup;
    }

    public void setThumbsup(int thumbsup) {
        this.thumbsup = thumbsup;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }*/
}
