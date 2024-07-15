package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Product;
import com.ch.axa.its.axacoin.Entity.Task;
import com.ch.axa.its.axacoin.Repositorys.ProductRepository;
import com.ch.axa.its.axacoin.Repositorys.TaskRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getAllUsers(){
        return ResponseEntity.ok(taskRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getUserById(@RequestParam String id){
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()){
            return ResponseEntity.ok(task.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Task> createUser(@RequestBody Task task){
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updatePlayer(@RequestParam String id, @Valid @RequestBody Task task) {
        task.setId(id);
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@RequestParam String id) {
        taskRepository.deleteById(id);
    }
}
