package com.ch.axa.its.axacoin.Entity;

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

    @OneToMany(mappedBy = "creator")
    private Set<Task> tasks;

    @ManyToOne
    User user;

    @OneToMany(mappedBy = "trainer")
    Set<Product> products;

    @OneToMany(mappedBy = "trainer")
    Set<Trainee> trainees;
}
