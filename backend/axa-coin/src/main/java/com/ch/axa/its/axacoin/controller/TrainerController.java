package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Task;
import com.ch.axa.its.axacoin.Entity.Trainer;
import com.ch.axa.its.axacoin.Repositorys.TrainerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TrainerController {

    @Autowired
    private TrainerRepository trainerRepository;

    @GetMapping
    public ResponseEntity<List<Trainer>> getAllUsers(){
        return ResponseEntity.ok(trainerRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainer> getUserById(@RequestParam String id){
        Optional<Trainer> trainer = trainerRepository.findById(id);
        if(trainer.isPresent()){
            return ResponseEntity.ok(trainer.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Trainer> createUser(@RequestBody Trainer trainer){
        return ResponseEntity.ok(trainerRepository.save(trainer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trainer> updatePlayer(@RequestParam String id, @Valid @RequestBody Trainer trainer) {
        trainer.setId(id);
        return ResponseEntity.ok(trainerRepository.save(trainer));
    }

    @DeleteMapping
    public void deleteUser(@RequestParam String id) {
        trainerRepository.deleteById(id);
    }
}
