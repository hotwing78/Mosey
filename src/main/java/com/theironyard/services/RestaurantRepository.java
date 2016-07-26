package com.theironyard.services;

import com.theironyard.entities.Restaurant;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Ben on 7/20/16.
 */
public interface RestaurantRepository extends CrudRepository<Restaurant, Integer> {
    //Iterable<Restaurant> findByName(String name);
    //Restaurant findFirstByName(String name);
}
