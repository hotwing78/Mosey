package com.theironyard.services;

import com.theironyard.entities.Activity;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Ben on 7/20/16.
 */
public interface ActivityRepository extends CrudRepository<Activity, Integer> {
    Iterable<Activity> findByName(String Name);
    Activity findFirstById(int id);
    Activity findFirstByName (String name);

}
