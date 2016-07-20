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
    String activityname;

    @Column(nullable = false)
    String comment;

    public Activity(String category, String price, boolean isoutside, String activityname, String comment) {
        this.category = category;
        this.price = price;
        this.isoutside = isoutside;
        this.activityname = activityname;
        this.comment = comment;
    }

    public Activity() {
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

    public String getActivityname() {
        return activityname;
    }

    public void setActivityname(String activityname) {
        this.activityname = activityname;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
