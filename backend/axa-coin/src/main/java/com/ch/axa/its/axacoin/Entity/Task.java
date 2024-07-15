package com.ch.axa.its.axacoin.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String title;
    private String description;
    private LocalDate endDate;
    private int earningPoints;

    @ManyToOne
    Trainer creator;

    @OneToMany(mappedBy = "task_id")
    Set<TaskTrainee> taskTrainees;
}

