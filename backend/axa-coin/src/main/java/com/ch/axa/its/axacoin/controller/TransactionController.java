package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Entity.Transaction;
import com.ch.axa.its.axacoin.Entity.User;
import com.ch.axa.its.axacoin.Repositorys.TraineeRepository;
import com.ch.axa.its.axacoin.Repositorys.TransactionRepository;
import com.ch.axa.its.axacoin.Repositorys.UserRepository;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin("*")
@Hidden
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private TraineeRepository traineeRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/page/{page}")
    public ResponseEntity<Iterable<Transaction>> getAllTransactions(@PathVariable(required = false) Integer page){
        Sort sort = Sort.by(Sort.Direction.DESC, "transactionDate");
        Pageable pageable = PageRequest.of((page == null ? 0 : page), 20, sort);
        return ResponseEntity.ok(transactionRepository.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Transaction>> getTransactionByUserId(@PathVariable String id){
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            Optional<Trainee> trainee = traineeRepository.findTraineeByUser(user.get());
            if(trainee.isPresent()){
                return ResponseEntity.ok(transactionRepository.findAllByTrainee(trainee.get()));
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable String id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()) {
            transaction.get().setChecked(!transaction.get().isChecked());
            return ResponseEntity.ok(transactionRepository.save(transaction.get()));
        }else {
            return ResponseEntity.notFound().build();
        }

    }

}
