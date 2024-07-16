package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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


    @JsonIgnoreProperties("taskTrainees")
    @ManyToOne
    Task task_id;

    @JsonIgnoreProperties({"taskTrainees", "transactions", "trainer"})
    @ManyToOne
    Trainee trainee_id;
}
