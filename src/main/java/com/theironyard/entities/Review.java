package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by hoseasandstrom on 7/24/16.
 */
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue
    int id;

    @Column
    String activityreview;

    @Column
    String restaurantreview;

    @ManyToOne
    Activity activity;

    @ManyToOne
    Restaurant restaurant;

    public Review() {
    }

    public Review(String activityreview, Activity activity) {
        this.activityreview = activityreview;
        this.activity = activity;
    }

    public Review(String restaurantreview, Restaurant restaurant) {
        this.restaurantreview = restaurantreview;
        this.restaurant = restaurant;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getActivityreview() {
        return activityreview;
    }

    public void setActivityreview(String activityreview) {
        this.activityreview = activityreview;
    }

    public String getRestaurantreview() {
        return restaurantreview;
    }

    public void setRestaurantreview(String restaurantview) {
        this.restaurantreview = restaurantview;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
