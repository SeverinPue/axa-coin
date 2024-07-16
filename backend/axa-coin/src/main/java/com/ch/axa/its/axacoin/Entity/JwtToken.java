package com.ch.axa.its.axacoin.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class JwtToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String token;
    private String userId;

}
