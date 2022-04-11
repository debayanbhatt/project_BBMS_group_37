package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomePageController {
public HomePageController() {
	// TODO Auto-generated constructor stub
}
@GetMapping("/")
public String showHomePage()
{
	return "/index";
}
}
