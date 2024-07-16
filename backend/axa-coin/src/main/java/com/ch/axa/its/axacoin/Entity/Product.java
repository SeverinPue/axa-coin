package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    Set<Transaction> transactions;

    @JsonIgnoreProperties({"products", "tasks", "trainees"})
    @ManyToOne
    Trainer creator;
}
