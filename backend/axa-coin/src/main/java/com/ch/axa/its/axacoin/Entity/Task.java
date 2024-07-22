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
    @OnDelete(action = OnDeleteAction.SET_NULL)
    Trainer creator;

    @JsonIgnoreProperties("task")
    @OneToMany(mappedBy = "task")
    @Cascade(CascadeType.REMOVE)
    Set<TaskTrainee> taskTrainees;
}

