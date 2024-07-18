package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.TaskTrainee;
import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Entity.User;
import com.ch.axa.its.axacoin.Repositorys.TraineeRepository;
import com.ch.axa.its.axacoin.Repositorys.TrainerRepository;
import com.ch.axa.its.axacoin.Repositorys.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainees")
@CrossOrigin("*")
public class TraineeController {

    @Autowired
    private TraineeRepository traineeRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Trainee>> getAllTrainees(){
        return ResponseEntity.ok(traineeRepository.findAll());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Trainee> getTraineeByUserId(@PathVariable String id){
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            Optional<Trainee> trainee = traineeRepository.findTraineeByUser(user.get());
            if (trainee.isPresent()) {
                return ResponseEntity.ok(trainee.get());
            }else {
                return ResponseEntity.notFound().build();
            }
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainee> getTraineeById(@PathVariable String id){
        Optional<Trainee> trainee = traineeRepository.findById(id);
        if(trainee.isPresent()){
            return ResponseEntity.ok(trainee.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Trainee> createTrainee(@RequestBody Trainee trainee){
        return ResponseEntity.ok(traineeRepository.save(trainee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trainee> updateTrainee(
            @PathVariable String id,
            @Valid @RequestBody Map<String, Object> updates) {
        Trainee existingTrainee = traineeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trainee not found with id: " + id));
        updates.forEach((key, value) -> {
            switch (key) {
                case "points":
                    existingTrainee.setPoints(Double.parseDouble(value.toString()));
                    break;
            }
        });
        Trainee savedTrainee = traineeRepository.save(existingTrainee);
        return ResponseEntity.ok(savedTrainee);

    }



    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        traineeRepository.deleteById(id);
    }
}
