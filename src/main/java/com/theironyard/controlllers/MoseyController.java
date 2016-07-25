package com.theironyard.controlllers;

import com.google.maps.*;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.GeoApiContext;
import com.theironyard.entities.Activity;
import com.theironyard.entities.Restaurant;
import com.theironyard.entities.Review;
import com.theironyard.entities.User;
import com.theironyard.services.*;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.io.File;
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

    @Autowired
    ItineraryRespository itineraries;


    // start h2 web server
    @PostConstruct
    public void init() throws Exception {
        Server.createWebServer().start();

        File file = new File("API.csv");

        Scanner fscan  = new Scanner(file);

        String APIkey = fscan.nextLine();

       /* LatLng ll = new LatLng (0,0);
        LatLng ll2 = new LatLng(1,1);
        GeoApiContext cntx = new GeoApiContext().setApiKey(APIkey);
        DistanceMatrixApiRequest distance = new DistanceMatrixApiRequest(cntx);

        DistanceMatrix a = distance.origins(ll).destinations(ll2).await();*/

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
            return null;
        } else if (!PasswordStorage.verifyPassword(password, user.getPassword())) {
            throw new Exception("Incorrect password");
        }
        session.setAttribute("username", username);

        return "redirect:/";
    }

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




}
