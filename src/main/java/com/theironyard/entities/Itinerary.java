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
    private long id;
    private String name;

    private Set<User> users = new HashSet<User>();

    public void addUser(User user) {
        this.users.add(user);
    }

    public Itinerary(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue
            @Column(name = "itinerary")
    public long getId(){
        return id;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "USERS_ITINERARIES",
            joinColumns = @JoinColumn(name = "itinerary"),
            inverseJoinColumns = @JoinColumn(name = "username")
    )
    public Set<User> getUsers() {
        return users;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Itinerary{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", users=" + users +
                '}';
    }
}
