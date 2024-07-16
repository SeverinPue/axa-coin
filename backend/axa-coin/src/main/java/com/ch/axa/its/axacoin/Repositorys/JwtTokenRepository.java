package com.ch.axa.its.axacoin.Repositorys;

import com.ch.axa.its.axacoin.Entity.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JwtTokenRepository extends JpaRepository<JwtToken, Long> {
    JwtToken findByToken(String token);
}
