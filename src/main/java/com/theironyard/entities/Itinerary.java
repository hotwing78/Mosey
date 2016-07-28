package com.theironyard.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by hoseasandstrom on 7/25/16.
 */
@Entity
@Table(name = "itineraries")
public class Itinerary {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String itinerary;

    @ManyToOne
    User users;

    public Itinerary() {
    }

    public Itinerary(String itinerary, User users) {
        this.itinerary = itinerary;
        this.users = users;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getItinerary() {
        return itinerary;
    }

    public void setItinerary(String itinerary) {
        this.itinerary = itinerary;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }
}
