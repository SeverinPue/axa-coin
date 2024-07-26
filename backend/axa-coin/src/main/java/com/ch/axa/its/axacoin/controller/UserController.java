package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Entity.Trainer;
import com.ch.axa.its.axacoin.Entity.User;
import com.ch.axa.its.axacoin.Repositorys.TrainerRepository;
import com.ch.axa.its.axacoin.Repositorys.UserRepository;
import com.ch.axa.its.axacoin.config.JwtService;
import com.ch.axa.its.axacoin.controller.dto.Password;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.time.Year;
import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private TrainerRepository trainerRepository;

    private final JwtService jwtService = new JwtService();

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    @Hidden
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @Hidden
    public ResponseEntity<User> createUser(@Valid @RequestBody Map<String, Object> newUser){
        User user = new User();
        try{
            newUser.forEach((key, value) -> {
                switch (key) {
                    case "username":
                        Optional<User> userOptional = userRepository.findByUsername(value.toString());
                        if(userOptional.isEmpty()){
                            user.setUsername(value.toString());
                        }else{
                            throw new HttpClientErrorException(HttpStatus.CONFLICT, "username already exists");
                        }
                        break;
                    case "role":
                        user.setRole(value.toString());
                        if(user.getRole().equals("ROLE_USER")){
                            Trainee trainee = new Trainee();
                            trainee.setPoints(0);
                            trainee.setYear(Year.of(Integer.parseInt(newUser.get("year").toString())));
                            trainee.setUser(user);
                            trainee.setTrainer(trainerRepository.findById(newUser.get("trainer").toString()).get());
                            user.setTrainees(trainee);
                        }else{
                            Trainer trainer = new Trainer();
                            trainer.setUser(user);
                            user.setTrainers(trainer);
                        }
                        break;
                    case "password":
                        user.setPassword(bCryptPasswordEncoder.encode(value.toString()));
                        break;
                }
            });
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PutMapping("/{id}")
    @Hidden
    public ResponseEntity<User> updateUser(@PathVariable String id, @Valid @RequestBody User user) {
        Optional<User> userOptional = userRepository.findById(id);
        user.setId(id);
        if(userOptional.get().getUsername().equals(user.getUsername())){
            return ResponseEntity.ok(userRepository.save(user));
        }else{
            Optional<User> newUser = userRepository.findByUsername(user.getUsername());
            if(newUser.isPresent()){
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }else {
                return ResponseEntity.ok(userRepository.save(user));
            }
        }
    }

    @DeleteMapping("/{id}")
    @Hidden
    public void deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
    }

    @PutMapping
    @Hidden
    public ResponseEntity<User> changePassword(@RequestHeader(value = "Authorization") String token, @RequestBody Password password){
        String username = jwtService.extractUsername(token.substring(7));
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            user.get().setPassword(passwordEncoder.encode(password.getNewPassword()));
            return ResponseEntity.ok(userRepository.save(user.get()));
        }else{
            return ResponseEntity.notFound().build();
        }
    }



}
