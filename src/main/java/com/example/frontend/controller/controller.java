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
    @GetMapping("/hej")
    @ResponseBody
    public String index2(){
        return "indwlerkgne";
    }


}
