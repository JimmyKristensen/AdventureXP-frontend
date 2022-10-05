package com.example.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class controller {

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/aktiviteter")
    public String aktiviteter(){
        return "aktiviteter";
    }

    @GetMapping("/priser")
    public String priser(){
        return "priser";
    }

    @GetMapping("/kontakt-os")
    public String kontakt_os(){
        return "kontakt-os";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }
}
