package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.Year;
import java.util.Set;

@Entity
@Getter
@Setter
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private Year year;

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
    @OnDelete(action = OnDeleteAction.SET_NULL)
    Trainer trainer;

    @JsonIgnoreProperties({"trainees", "trainers"})
    @OneToOne
    @Cascade(CascadeType.REMOVE)
    User user;
}
