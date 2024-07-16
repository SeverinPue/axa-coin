package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.User;
import com.ch.axa.its.axacoin.Entity.UserDto;
import com.ch.axa.its.axacoin.Repositorys.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
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
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestParam String id, @Valid @RequestBody User user) {
        user.setId(id);
        return ResponseEntity.ok(userRepository.save(user));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@RequestParam String id) {
        userRepository.deleteById(id);
    }



}
