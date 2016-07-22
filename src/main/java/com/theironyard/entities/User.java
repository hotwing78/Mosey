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
    String firstname;

    @Column(nullable = false, unique = true)
    String lastname;

    @Column(nullable = false, unique = true)
    String email;

    @Column(nullable = false, unique = true)
    String username;

    @Column(nullable = false)
    public
    String passwordhash;

    @Column(nullable = false)
    boolean isnative;

    public User() {
    }

    public User(String username, String passwordhash) {
        this.username = username;
        this.passwordhash = passwordhash;
    }

    public User(String firstname, String lastname, String email, String username, String passwordhash, boolean isnative) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.passwordhash = passwordhash;
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

    public String getPasswordhash() {
        return passwordhash;
    }

    public void setPasswordhash(String passwordhash) {
        this.passwordhash = passwordhash;
    }

    public boolean isnative() {
        return isnative;
    }

    public void setIsnative(boolean isnative) {
        this.isnative = isnative;
    }
}
