package com.ch.axa.its.axacoin.Repositorys;

import com.ch.axa.its.axacoin.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}
