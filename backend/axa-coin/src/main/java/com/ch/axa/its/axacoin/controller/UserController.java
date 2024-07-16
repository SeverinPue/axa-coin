package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.User;
import com.ch.axa.its.axacoin.Repositorys.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@RequestParam String id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        Optional<User> userOptional = userRepository.findByUsername(user.getUsername());
        if(!userOptional.isPresent()){
            return ResponseEntity.ok(userRepository.save(user));
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestParam String id, @Valid @RequestBody User user) {
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
    public void deleteUser(@RequestParam String id) {
        userRepository.deleteById(id);
    }



}
