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
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String description;
    private double price;

    @JsonIgnoreProperties("product")
    @OneToMany(mappedBy = "product")
    @Cascade(CascadeType.REMOVE)
    Set<Transaction> transactions;

    @JsonIgnoreProperties({"products", "tasks", "trainees"})
    @ManyToOne
    @OnDelete(action = OnDeleteAction.SET_NULL)
    Trainer creator;
}
