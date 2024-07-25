package com.ch.axa.its.axacoin.Repositorys;

import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TransactionRepository extends CrudRepository<Transaction, String> {
    List<Transaction> findAllByTrainee(Trainee trainee);
    Page<Transaction> findAll(Pageable pageable);
}
