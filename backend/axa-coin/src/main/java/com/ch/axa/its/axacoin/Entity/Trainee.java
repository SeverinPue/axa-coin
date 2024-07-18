package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.Set;

@Entity
@Getter
@Setter
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private int year;

    private double points;

    @JsonIgnoreProperties("trainee")
    @OneToMany(mappedBy = "trainee")
    @Cascade(CascadeType.REMOVE)
    Set<TaskTrainee> taskTrainees;

    @JsonIgnoreProperties("trainee")
    @OneToMany(mappedBy = "trainee")
    @Cascade(CascadeType.REMOVE)
    Set<Transaction> transactions;

    @JsonIgnoreProperties({"tasks", "products", "trainees"})
    @ManyToOne
    @Cascade(CascadeType.DETACH)
    Trainer trainer;

    @JsonIgnoreProperties({"trainees", "trainers"})
    @ManyToOne
    @Cascade(CascadeType.DETACH)
    User user;
}
