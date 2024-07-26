package com.ch.axa.its.axacoin;

import com.ch.axa.its.axacoin.Entity.*;
import com.ch.axa.its.axacoin.Repositorys.*;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Year;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TrainerRepository trainerRepository;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    public DataLoader(UserRepository userRepository, TraineeRepository traineeRepository, TrainerRepository trainerRepository, ProductRepository productRepository, TaskRepository taskRepository, TaskTraineeRepository taskTraineeRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.trainerRepository = trainerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setRole("ROLE_"+Role.ADMIN.name());
        userRepository.save(admin);
        createTrainer(admin);
    }
    private Trainer createTrainer(User user) {
        Trainer trainer = new Trainer();
        trainer.setUser(user);
        return trainerRepository.save(trainer);
    }
}
