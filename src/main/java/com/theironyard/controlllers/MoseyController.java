package com.theironyard.controlllers;

import com.theironyard.entities.User;
import com.theironyard.services.UserRepository;
import com.theironyard.utils.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;

/**
 * Created by hoseasandstrom on 7/19/16.
 */
@RestController
public class MoseyController {
    @Autowired
    UserRepository users;

    // start h2 web server
    @PostConstruct
    public void init() throws SQLException {
        Server.createWebServer().start();
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String home(Model model, HttpSession session) {

        String username = (String) session.getAttribute("username");
        if (username != null) {
            model.addAttribute("user", username);

        }
        return "home";
    }

        @RequestMapping(path = "/login", method = RequestMethod.POST)
        public String login (HttpSession session, String username, String password) throws Exception {
            User user = users.findByName(username);
            if (user == null) {
                user = new User(username, PasswordStorage.createHash(password));
                users.save(user);
            } else if (!PasswordStorage.verifyPassword(password, user.getPasswordHash())) {
                throw new Exception("Incorrect password");
            }
            session.setAttribute("username", username);
            return "redirect:/";
        }

    }
