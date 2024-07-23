package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.*;
import com.ch.axa.its.axacoin.Repositorys.*;
import io.swagger.v3.oas.annotations.Hidden;
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
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    @Hidden
    public ResponseEntity<List<Trainee>> getAllTrainees() {
        return ResponseEntity.ok(traineeRepository.findAll());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Trainee> getTraineeByUserId(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            Optional<Trainee> trainee = traineeRepository.findTraineeByUser(user.get());
            if (trainee.isPresent()) {
                return ResponseEntity.ok(trainee.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainee> getTraineeById(@PathVariable String id) {
        Optional<Trainee> trainee = traineeRepository.findById(id);
        if (trainee.isPresent()) {
            return ResponseEntity.ok(trainee.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @Hidden
    public ResponseEntity<Trainee> createTrainee(@RequestBody Trainee trainee) {
        return ResponseEntity.ok(traineeRepository.save(trainee));
    }

    @PutMapping("/{id}")
    @Hidden
    public ResponseEntity<Trainee> updateTrainee(
            @PathVariable String id,
            @Valid @RequestBody Map<String, Object> updates) {
        Trainee existingTrainee = traineeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trainee not found with id: " + id));
        System.out.println("updating trainee with id: " + id);
        updates.forEach((key, value) -> {
            switch (key) {
                case "points":
                    existingTrainee.setPoints(Double.parseDouble(value.toString()));
                    break;
                case "username":
                    Optional<User> user = userRepository.findByUsername(value.toString());
                    if (!user.isPresent()) {
                        existingTrainee.getUser().setUsername(value.toString());
                    }
                    break;
                case "trainer":
                    Optional<Trainer> trainer = trainerRepository.findById(value.toString());
                    if (trainer.isPresent()) {
                        existingTrainee.setTrainer(trainer.get());
                    }
                    break;
            }
        });
        Trainee savedTrainee = traineeRepository.save(existingTrainee);
        return ResponseEntity.ok(savedTrainee);

    }

    @PutMapping("/purchase/{id}")
    @Hidden
    public ResponseEntity<Trainee> updatePoints(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates) {
        Trainee existingTrainee = traineeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trainee not found with id: " + id));
        updates.forEach((key, value) -> {
            switch (key) {
                case "productId":
                    String productId = value.toString();
                    Optional<Product> product = productRepository.findById(productId);
                    if (product.isPresent()) {
                        if (existingTrainee.getPoints() - product.get().getPrice() >= 0) {
                            existingTrainee.setPoints(existingTrainee.getPoints() - product.get().getPrice());
                            Transaction transaction = new Transaction();
                            transaction.setProduct(product.get());
                            transaction.setTrainee(existingTrainee);
                            transaction.setTransactionDate(LocalDate.now());
                            transactionRepository.save(transaction);
                        } else {
                            throw new IllegalArgumentException("Insufficient points");
                        }
                    }
            }
        });

        Trainee savedTrainee = traineeRepository.save(existingTrainee);
        return ResponseEntity.ok(savedTrainee);
    }

    @DeleteMapping("/{id}")
    @Hidden
    public void deleteUser(@PathVariable String id) {
        System.out.println("Deleting trainee with id: "+id);
        traineeRepository.deleteById(id);
    }
}
