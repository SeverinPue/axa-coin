package com.ch.axa.its.axacoin.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "task_trainee")
public class TaskTrainee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private LocalDate dateOfSubmission;


    @ManyToOne
    Task task_id;

    @ManyToOne
    Trainee trainee_id;
}
