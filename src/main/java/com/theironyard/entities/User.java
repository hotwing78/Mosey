package com.theironyard.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by hoseasandstrom on 7/19/16.
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false, unique = true)
    String firstname;

    @Column(nullable = false, unique = true)
    String lastname;

    @Column(nullable = false, unique = true)
    String email;

    @Column(nullable = false, unique = true)
    String username;

    @Column(nullable = false)
    public
    String password;

    @Column(nullable = false)
    boolean isnative;

    private Set<Itinerary> itineraries = new HashSet<Itinerary>();

    public void addItinerary(Itinerary itinerary) {
        this.itineraries.add(itinerary);
    }

    @ManyToMany(mappedBy = "users")
    public Set<Itinerary> getItineraries() {
        return itineraries;
    }


    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String firstname, String lastname, String email, String username, String password, boolean isnative) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.isnative = isnative;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isnative() {
        return isnative;
    }

    public void setIsnative(boolean isnative) {
        this.isnative = isnative;
    }
}
