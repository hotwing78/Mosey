package com.theironyard.controlllers;

import com.google.maps.*;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.GeoApiContext;
import com.theironyard.entities.*;
import com.theironyard.services.*;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
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

    /* @Autowired
    ItineraryRespository itineraries; */

    String APIkey = APIreader();

    public MoseyController() throws FileNotFoundException {
    }

    // start h2 web server
    @PostConstruct
    public void init() throws Exception {
        Server.createWebServer().start();

        //creating restaurants table from csv and allowing for missing content
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

        //creating activities table from csv and allowing for missing content
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
                TextSearchRequest request = PlacesApi.textSearchQuery(context, columns[3] + " Charleston");
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

        //using Google Maps API to populate address, lat and lng in lieu of missing content
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

        //using Google Maps API to populate address, lat and lng in lieu of missing content
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

    //receiving current location from front-end
    @RequestMapping(path = "/mosey", method = RequestMethod.POST)
    public void home(HttpSession session, @RequestBody HashMap data)  {
        //Restaurant dest = restaurants.findOne(1);
        //convert new center to LatLng
        //LatLng origin = new LatLng(0,0);
        //LatLng destLL = new LatLng(dest.getLat(), dest.getLng());
        //LatLng dest = new LatLng(1,1);

        double lat = (double) data.get("lat");
        double lng = (double) data.get("lng");
        LatLng origin = new LatLng(lat, lng);
        session.setAttribute("origin", origin);


    }
    //user and password check(passwords are hashed)
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public void login (HttpSession session, @RequestBody User user) throws Exception {
        User dummy = users.findByUsername(user.getUsername());
        if (dummy == null ) {
            throw new Exception("Username does not exist! Please register");
        } else if (!PasswordStorage.verifyPassword(user.getPassword(), dummy.getPassword())) {
            throw new Exception("Incorrect password");
        }
        session.setAttribute("username", user.getUsername());
    }

    //registering new user
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public void register (HttpSession session, @RequestBody User user) throws Exception {
        User regi = users.findByUsername(user.getUsername());
        if (regi == null) {
            regi = new User(user.getFirstname(), user.getLastname(), user.getEmail(), user.getUsername(), PasswordStorage.createHash(user.getPassword()), user.isnative());
            users.save(regi);
            session.setAttribute("username", user.getUsername());
        }
    }

    @RequestMapping(path="/users", method = RequestMethod.GET)
    public Iterable<User> getUsers () {
        return users.findAll();
    }

    @RequestMapping (path = "/food", method = RequestMethod.GET)
    public Iterable<Restaurant> getRests () {

        //ArrayList<Restaurant> rests = (ArrayList) restaurants.findAll();
        return restaurants.findAll();
    }

    @RequestMapping (path = "/activity", method = RequestMethod.GET)
    public Iterable<Activity> getActvs () {

        return activities.findAll();
    }


    @RequestMapping(path = "/reviews", method = RequestMethod.POST)
    //need to add conditional for only for tourists
    public void addReview(HttpSession session, @RequestBody Review review) throws Exception {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            throw new Exception("You must be registered to leave a review.");
        }

        User user = users.findByUsername(username);
        if (user == null) {
            throw new Exception("Invalid username");
        }

        Restaurant res = restaurants.findOne(review.getRestaurantid());
        if (res == null) {
            throw new Exception("Invalid selection");
        }
        review.setRestaurant(res);
        reviews.save(review);

        Activity act = activities.findOne(review.getActivityid());
        if (act == null) {
            throw new Exception("Invalid selection");
        }
        review.setActivity(act);
        reviews.save(review);
    }
    //show info for itinerary
    @RequestMapping(path = "/itinerary", method = RequestMethod.POST)
    //need to add contigency of being a registered user(our hook to get them to register)
    public Object getItinerary(HttpSession session, @RequestBody Object restaurant) {

        return restaurant;
    }
    /* adding to itinerary
    @RequestMapping(path = "/itinerary/new", method = RequestMethod.POST)
    public String itineraryAdd(Model model, HttpSession session) {
        model.addAttribute("activity", itineraries.findAll());
        model.addAttribute("food", itineraries.findAll());
        model.addAttribute("users", users.findAll());
        return "itineraryadd";
    }

    //save itinerary
    @RequestMapping(value = "itinerary/save", method = RequestMethod.POST)
    public String saveItinerary(Model model, Activity activity, Restaurant restaurant) {
        Itinerary itin = new Itinerary();
        itineraries.save(itin);
        return "itinerarysaved";
    } */


    @RequestMapping(path = "/logout", method = RequestMethod.GET)
    public void logout(HttpSession session, HttpServletResponse response) throws IOException {
        session.invalidate();
        response.sendRedirect("/");
    }


    @RequestMapping(path = "/newfood", method = RequestMethod.POST)
    //need to add a check for isNative
    //need to add a method that only allows for this to public if 10 isNative users approve the suggestion
    public void addRestaurant(HttpSession session, @RequestBody Restaurant restaurant) throws Exception {
        Iterable<Restaurant> rests = restaurants.findAll();
        for (Restaurant rest : rests) {
            if (rest.getName() != null || rest.getLocalstake() != null || rest.getAddress() == null || rest.getLat() == null || rest.getLng() == null){
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
    }

    @RequestMapping(path = "/newactivity", method = RequestMethod.POST)
    //need to add a check for isNative
    //need to add a method that only allows for this to public if 10 isNative users approve the suggestion
    public void addActivity(HttpSession session, @RequestBody Activity activity) throws Exception {
        Iterable<Activity> actvs = activities.findAll();
        for (Activity actv : actvs) {
            if (actv.getActivityname() != null || actv.getLocalstake() != null || actv.getAddress() == null || actv.getLat() == null || actv.getLng() == null){
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


    public double distance (LatLng origin, LatLng dest) throws Exception {
        GeoApiContext context = new GeoApiContext().setApiKey(APIkey);
        DistanceMatrix matrix = DistanceMatrixApi.newRequest(context).destinations(dest).origins(origin).await();

        double feet = matrix.rows[0].elements[0].distance.inMeters * 3.281;
        return feet;
    }

    public String APIreader () throws FileNotFoundException {
        File file = new File("API.csv");

        Scanner fscan  = new Scanner(file);

        return fscan.nextLine();
    }
}
