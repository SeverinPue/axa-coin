package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Entity.Trainer;
import com.ch.axa.its.axacoin.Entity.UpdateTraineeDto;
import com.ch.axa.its.axacoin.Entity.User;
import com.ch.axa.its.axacoin.Repositorys.TraineeRepository;
import com.ch.axa.its.axacoin.Repositorys.TrainerRepository;
import com.ch.axa.its.axacoin.Repositorys.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @PutMapping("")
    public ResponseEntity<Trainee> updateTrainee(@Valid @RequestBody UpdateTraineeDto updatedTrainee) {
        Optional<Trainee> trainee = traineeRepository.findById(updatedTrainee.getId());
        Optional<User> user = userRepository.findById(updatedTrainee.getUserId());

        if(trainee.isPresent()){
            trainee.get().setTrainer(trainerRepository.findById(updatedTrainee.getTrainerId()).get());

            if(user.isPresent()){
                trainee.get().setUser(user.get());
                user.get().setUsername(updatedTrainee.getUsername());
                return ResponseEntity.ok(traineeRepository.save(trainee.get()));
            }else {
                return ResponseEntity.notFound().build();
            }
        }else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        traineeRepository.deleteById(id);
    }
}
