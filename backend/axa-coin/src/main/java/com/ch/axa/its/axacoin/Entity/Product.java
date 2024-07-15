package com.ch.axa.its.axacoin.Entity;

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

    @OneToMany(mappedBy = "product")
    Set<Transaction> transactions;

    @ManyToOne
    Trainer trainer;
}
