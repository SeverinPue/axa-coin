package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Task;
import com.ch.axa.its.axacoin.Entity.TaskTrainee;
import com.ch.axa.its.axacoin.Repositorys.TaskRepository;
import com.ch.axa.its.axacoin.Repositorys.TaskTraineeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasktrainee")
public class TaskTraineeController {

    @Autowired
    private TaskTraineeRepository taskTraineeRepository;

    @GetMapping
    public ResponseEntity<List<TaskTrainee>> getAllTaskTrainees(){
        return ResponseEntity.ok(taskTraineeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskTrainee> getTaskTraineeById(@RequestParam String id){
        Optional<TaskTrainee> taskTrainee = taskTraineeRepository.findById(id);
        if(taskTrainee.isPresent()){
            return ResponseEntity.ok(taskTrainee.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<TaskTrainee> createTaskTrainee(@RequestBody TaskTrainee taskTrainee){
        return ResponseEntity.ok(taskTraineeRepository.save(taskTrainee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskTrainee> updateTaskTrainee(@RequestParam String id, @Valid @RequestBody TaskTrainee taskTrainee) {
        taskTrainee.setId(id);
        return ResponseEntity.ok(taskTraineeRepository.save(taskTrainee));
    }

    @DeleteMapping("/{id}")
    public void deleteTaskTrainee(@RequestParam String id) {
        taskTraineeRepository.deleteById(id);
    }
}
