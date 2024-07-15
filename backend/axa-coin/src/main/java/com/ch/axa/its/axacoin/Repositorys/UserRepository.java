package com.ch.axa.its.axacoin.Repositorys;

import com.ch.axa.its.axacoin.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
