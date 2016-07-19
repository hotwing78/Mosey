package com.theironyard.entities;

import javax.persistence.*;

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
    String name;

    @Column(nullable = false)
    public
    String passwordhash;

    public User() {
    }

    public User(String name, String passwordhash) {
        this.name = name;
        this.passwordhash = passwordhash;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPasswordHash() {
        return passwordhash;
    }

    public void setPasswordHash(String passwordhash) {
        this.passwordhash = passwordhash;
    }
}
