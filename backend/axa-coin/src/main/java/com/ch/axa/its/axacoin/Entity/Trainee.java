package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private int year;

    @JsonIgnoreProperties("trainee")
    @OneToMany(mappedBy = "trainee")
    Set<TaskTrainee> taskTrainees;

    @JsonIgnoreProperties("trainee")
    @OneToMany(mappedBy = "trainee")
    Set<Transaction> transactions;

    @JsonIgnoreProperties({"tasks", "products", "trainees"})
    @ManyToOne
    Trainer trainer;

    @JsonIgnoreProperties({"trainees", "trainers"})
    @ManyToOne
    User user;
}
