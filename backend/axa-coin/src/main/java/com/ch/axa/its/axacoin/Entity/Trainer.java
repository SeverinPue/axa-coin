package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Entity
@Getter
@Setter
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @JsonIgnoreProperties({"creator", "taskTrainees"})
    @OneToMany(mappedBy = "creator")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Set<Task> tasks;

    @JsonIgnoreProperties({"trainers", "trainees"})
    @OneToOne
    @Cascade(CascadeType.REMOVE)
    User user;

    @JsonIgnoreProperties({"transactions", "creator"})
    @OneToMany(mappedBy = "creator")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    Set<Product> products;

    @JsonIgnoreProperties({"trainer", "taskTrainees", "transactions"})
    @OneToMany(mappedBy = "trainer")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    Set<Trainee> trainees;
}
