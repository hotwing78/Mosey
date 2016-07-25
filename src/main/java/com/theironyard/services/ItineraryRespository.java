package com.theironyard.services;

import com.theironyard.entities.Itinerary;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by hoseasandstrom on 7/25/16.
 */
public interface ItineraryRespository extends CrudRepository<Itinerary, Integer> {
}
