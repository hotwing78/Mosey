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
    int eventid;

    @Column(nullable = false)
    Boolean isRest;

    @ManyToOne
    User users;

    public Boolean getRest() {
        return isRest;
    }

    public void setRest(Boolean rest) {
        isRest = rest;
    }

    public Itinerary(int eventid, Boolean isRest, User users) {

        this.eventid = eventid;
        this.isRest = isRest;
        this.users = users;
    }

    public Itinerary() {
    }

    public Itinerary(int eventid, User users) {
        this.eventid = eventid;
        this.users = users;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEventid() {
        return eventid;
    }

    public void setEventid(int eventid) {
        this.eventid = eventid;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }
}
