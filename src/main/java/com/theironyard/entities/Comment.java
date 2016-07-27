package com.theironyard.entities;

import javax.persistence.*;

/**
 * Created by Ben on 7/27/16.
 */
@Entity
@Table(name="comments")
public class Comment {
    @Id
    @GeneratedValue
    int id;

    @Column(nullable=false)
    String username;

    @Column(nullable=false)
    String comment;

    public Comment(String username, String comment) {
        this.username = username;
        this.comment = comment;
    }


    public Comment() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
