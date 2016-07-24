package com.theironyard.controlllers;

import com.google.maps.*;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.NearbySearchRequest;
import com.google.maps.PlaceDetailsRequest;
import com.google.maps.model.*;
import com.theironyard.entities.Activity;
import com.theironyard.entities.Restaurant;
import com.theironyard.entities.Review;
import com.theironyard.entities.User;
import com.theironyard.services.ActivityRepository;
import com.theironyard.services.RestaurantRepository;
import com.theironyard.services.ReviewRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * Created by hoseasandstrom on 7/19/16.
 */
@RestController
public class MoseyController {
    @Autowired
    UserRepository users;

    @Autowired
    RestaurantRepository restaurants;

    @Autowired
    ActivityRepository activities;

    @Autowired
    ReviewRepository reviews;


    // start h2 web server
    @PostConstruct
    public void init() throws Exception {
        Server.createWebServer().start();

        File file = new File("API.csv");

        Scanner fscan  = new Scanner(file);

        String APIkey = fscan.nextLine();

        if (restaurants.count() == 0) {
            String filename = "Restaurants.csv";
            File f = new File(filename);
            Scanner filescanner = new Scanner(f);
            filescanner.nextLine();
            while (filescanner.hasNext()) {
                String line = filescanner.nextLine();
                String[] columns = line.split("\\,");
                GeoApiContext context = new GeoApiContext()
                        .setApiKey(APIkey);
                TextSearchRequest request = PlacesApi.textSearchQuery(context, columns[2] + " Charleston");
                PlacesSearchResponse results = request.await();


                Restaurant restaurant = new Restaurant(columns[0],
                        columns[1],
                        columns[2],
                        columns[3],
                        columns[4],
                        results.results[0].formattedAddress,
                        results.results[0].geometry.location.lat,
                        results.results[0].geometry.location.lng);
                restaurants.save(restaurant);


            }
        }

        if (activities.count() == 0) {
            String filename = "Activities.csv";
            File f = new File(filename);
            Scanner filescanner = new Scanner(f);
            filescanner.nextLine();
            while (filescanner.hasNext()) {
                String line = filescanner.nextLine();
                String[] columns = line.split("\\,");
                GeoApiContext context = new GeoApiContext()
                        .setApiKey(APIkey);
                TextSearchRequest request = PlacesApi.textSearchQuery(context, columns[2] + " Charleston");
                PlacesSearchResponse results = request.await();
                Activity activity = new Activity(columns[0],
                        columns[1],
                        Boolean.valueOf(columns[2]),
                        columns[3],
                        columns[4],
                        results.results[0].formattedAddress,
                        results.results[0].geometry.location.lat,
                        results.results[0].geometry.location.lng);
                activities.save(activity);

            }
        }

        Iterable<Restaurant> rests = restaurants.findAll();
        for (Restaurant rest : rests) {
            if (rest.getAddress() == null || rest.getLat() == null || rest.getLng() == null){
                GeoApiContext context = new GeoApiContext()
                        .setApiKey(" ");
                TextSearchRequest request = PlacesApi.textSearchQuery(context, rest.getName() + " Charleston");
                PlacesSearchResponse results = request.await();
                if (rest.getLat() == null){
                    rest.setLat(results.results[0].geometry.location.lat);
                }
                if (rest.getLng() == null ) {
                    rest.setLng(results.results[0].geometry.location.lng);
                }
                if (rest.getAddress() == null) {
                    rest.setAddress(results.results[0].formattedAddress);
                }
                restaurants.save(rest);
            }
        }

        Iterable<Activity> actvs = activities.findAll();
        for (Activity actv : actvs) {
            if (actv.getAddress() == null || actv.getLat() == null || actv.getLng() == null){
                GeoApiContext context = new GeoApiContext()
                        .setApiKey(" ");
                TextSearchRequest request = PlacesApi.textSearchQuery(context, actv.getActivityname() + " Charleston");
                PlacesSearchResponse results = request.await();
                if (actv.getLat() == null){
                    actv.setLat(results.results[0].geometry.location.lat);
                }
                if (actv.getLng() == null ) {
                    actv.setLng(results.results[0].geometry.location.lng);
                }
                if (actv.getAddress() == null) {
                    actv.setAddress(results.results[0].formattedAddress);
                }
                activities.save(actv);
            }
        }
    }

    @RequestMapping(path = "/mosey", method = RequestMethod.GET)
    public String home(String newCenter) throws Exception {



        return newCenter;
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public String login (HttpSession session, String username, String password) throws Exception {
        User user = users.findByUsername(username);
        if (user == null) {
            user = new User(username, PasswordStorage.createHash(password));
            users.save(user);
        } else if (!PasswordStorage.verifyPassword(password, user.getPasswordhash())) {
            throw new Exception("Incorrect password");
        }
        session.setAttribute("username", username);

        return "redirect:/";
    }

    @RequestMapping(path = "/reviews", method = RequestMethod.POST)
    public void addReview(HttpSession session, @RequestBody Review review) throws Exception {
        String username = (String) session.getAttribute("username");
        //if (username == null) {
        //    throw new Exception("You must be registered to leave a review.");
        //}

       // User user = users.findByUsername(username);
       // if (user == null) {
       //     throw new Exception("Invalid username");
        //}

        Restaurant res = restaurants.findOne(review.getId());
        if (res == null) {
            throw new Exception("Invalid selection");
        }

        review.setRestaurant(res);

        reviews.save(review);
    }

}
