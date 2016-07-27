package com.theironyard.services;

import com.theironyard.entities.Comment;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Ben on 7/27/16.
 */
public interface CommentRepository extends CrudRepository<Comment,Integer> {
}
