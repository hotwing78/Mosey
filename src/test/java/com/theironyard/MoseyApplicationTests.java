package com.theironyard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.Activity;
import com.theironyard.entities.Comment;
import com.theironyard.entities.User;
import com.theironyard.services.*;
import com.theironyard.utils.PasswordStorage;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MoseyApplication.class)
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MoseyApplicationTests {

	@Autowired
	WebApplicationContext wac;

	MockMvc mvc;

	@Before
	public void before() {
		mvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

	@Autowired
	ActivityRepository activities;

	@Autowired
	CommentRepository comments;

	@Autowired
	UserRepository users;

	@Autowired
	ItineraryRespository itineraries;

	@Autowired
	ReviewRepository reviews;



	@Test
	public void addUser() throws Exception {
		User user = new User();
		user.setUsername("Alice");
		user.setPassword(PasswordStorage.createHash("password"));
		user.setEmail("alice@gmail.com");
		user.setFirstname("Alice");
		user.setLastname("Jackson");
		user.setIsnative(true);

		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(user);

		mvc.perform(
				MockMvcRequestBuilders.post("/register")
						.content(json)
						.contentType("application/json")
		);

		Assert.assertTrue(users.findByUsername("Alice") !=null);
	}


}
