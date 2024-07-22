package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

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


    @JsonIgnoreProperties({"taskTrainees", "creator"})
    @ManyToOne
    Task task;

    @JsonIgnoreProperties({"taskTrainees", "transactions", "trainer"})
    @ManyToOne
    Trainee trainee;
}
