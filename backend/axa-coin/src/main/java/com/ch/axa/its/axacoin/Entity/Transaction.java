package com.ch.axa.its.axacoin.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private LocalDate transactionDate;

    private boolean checked;

    @JsonIgnoreProperties({"transactions", "taskTrainees", "trainer"})
    @ManyToOne
    Trainee trainee;

    @JsonIgnoreProperties("transactions")
    @ManyToOne
    Product product;
}
