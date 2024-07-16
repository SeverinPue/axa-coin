package com.ch.axa.its.axacoin.Repositorys;

import com.ch.axa.its.axacoin.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
}
