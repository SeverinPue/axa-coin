package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @JsonIgnoreProperties({"creator", "taskTrainees"})
    @OneToMany(mappedBy = "creator")
    private Set<Task> tasks;

    @JsonIgnoreProperties({"trainers", "trainees"})
    @ManyToOne
    User user;

    @JsonIgnoreProperties({"transactions", "creator"})
    @OneToMany(mappedBy = "creator")
    Set<Product> products;

    @JsonIgnoreProperties({"trainer", "taskTrainees", "transactions"})
    @OneToMany(mappedBy = "trainer")
    Set<Trainee> trainees;
}
