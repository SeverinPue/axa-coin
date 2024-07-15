package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Entity.Trainer;
import com.ch.axa.its.axacoin.Repositorys.TraineeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainee")
public class TraineeController {

    @Autowired
    private TraineeRepository traineeRepository;

    @GetMapping
    public ResponseEntity<List<Trainee>> getAllUsers(){
        return ResponseEntity.ok(traineeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainee> getUserById(@RequestParam String id){
        Optional<Trainee> trainee = traineeRepository.findById(id);
        if(trainee.isPresent()){
            return ResponseEntity.ok(trainee.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Trainee> createUser(@RequestBody Trainee trainee){
        return ResponseEntity.ok(traineeRepository.save(trainee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trainee> updatePlayer(@RequestParam String id, @Valid @RequestBody Trainee trainee) {
        trainee.setId(id);
        return ResponseEntity.ok(traineeRepository.save(trainee));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@RequestParam String id) {
        traineeRepository.deleteById(id);
    }
}
