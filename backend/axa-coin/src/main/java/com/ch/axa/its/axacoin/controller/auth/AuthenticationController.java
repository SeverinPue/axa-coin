package com.ch.axa.its.axacoin.controller.auth;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService service;


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.printf(request.toString());
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/admin")
    @Hidden
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("You are a admin");
    }

    @GetMapping()
    @Hidden
    public ResponseEntity<String> validToken(){
        return ResponseEntity.ok("Your token is valid");
    }
}
