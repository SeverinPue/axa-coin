package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @JsonIgnoreProperties({"tasks", "trainees", "products"})
    @ManyToOne
    Trainer creator;

    @JsonIgnoreProperties("task_id")
    @OneToMany(mappedBy = "task_id")
    Set<TaskTrainee> taskTrainees;
}

