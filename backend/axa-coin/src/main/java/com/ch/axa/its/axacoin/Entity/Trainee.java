package com.ch.axa.its.axacoin.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private LocalDate year;

    @OneToMany(mappedBy = "trainee_id")
    Set<TaskTrainee> taskTrainees;

    @OneToMany(mappedBy = "trainee")
    Set<Transaction> transactions;

    @ManyToOne
    Trainer trainer;

    @ManyToOne
    User user;
}
