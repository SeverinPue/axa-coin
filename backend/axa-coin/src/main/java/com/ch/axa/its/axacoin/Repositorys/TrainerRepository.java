package com.ch.axa.its.axacoin.Repositorys;

import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Entity.Trainer;
import com.ch.axa.its.axacoin.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrainerRepository extends JpaRepository<Trainer,String> {
    Optional<Trainer> findTrainerByUser(User user);

}
