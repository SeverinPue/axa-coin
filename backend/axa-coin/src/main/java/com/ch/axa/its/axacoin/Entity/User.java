package com.ch.axa.its.axacoin.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String username;
    private String password;
    private String email;

    @OneToMany(mappedBy = "user")
    private Set<Trainer> trainers;

    @OneToMany(mappedBy = "user")
    private Set<Trainee> trainees;
}
