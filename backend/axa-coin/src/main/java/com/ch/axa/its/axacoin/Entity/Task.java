package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

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
    private boolean important;
    private boolean approved;

    @JsonIgnoreProperties({"tasks", "trainees", "products"})
    @ManyToOne
    @Cascade(CascadeType.DETACH)
    Trainer creator;

    @JsonIgnoreProperties("task_id")
    @OneToMany(mappedBy = "task_id")
    Set<TaskTrainee> taskTrainees;
}

