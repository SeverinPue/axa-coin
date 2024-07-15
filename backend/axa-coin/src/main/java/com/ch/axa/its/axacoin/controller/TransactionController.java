package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Entity.Transaction;
import com.ch.axa.its.axacoin.Repositorys.TransactionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllUsers(){
        return ResponseEntity.ok(transactionRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getUserById(@RequestParam String id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if(transaction.isPresent()){
            return ResponseEntity.ok(transaction.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Transaction> createUser(@RequestBody Transaction transaction){
        return ResponseEntity.ok(transactionRepository.save(transaction));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updatePlayer(@RequestParam String id, @Valid @RequestBody Transaction transaction) {
        transaction.setId(id);
        return ResponseEntity.ok(transactionRepository.save(transaction));
    }

    @DeleteMapping
    public void deleteUser(@RequestParam String id) {
        transactionRepository.deleteById(id);
    }
}
