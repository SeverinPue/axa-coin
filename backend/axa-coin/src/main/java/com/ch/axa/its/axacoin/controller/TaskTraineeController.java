package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Task;
import com.ch.axa.its.axacoin.Entity.TaskTrainee;
import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Repositorys.TaskRepository;
import com.ch.axa.its.axacoin.Repositorys.TaskTraineeRepository;
import com.ch.axa.its.axacoin.Repositorys.TraineeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasktrainee")
@CrossOrigin("*")
public class TaskTraineeController {

    @Autowired
    private TaskTraineeRepository taskTraineeRepository;

    @Autowired
    private TraineeRepository traineeRepository;

    @GetMapping
    public ResponseEntity<List<TaskTrainee>> getAllTaskTrainees(){
        return ResponseEntity.ok(taskTraineeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskTrainee> getTaskTraineeById(@PathVariable String id){
        Optional<TaskTrainee> taskTrainee = taskTraineeRepository.findById(id);
        if(taskTrainee.isPresent()){
            return ResponseEntity.ok(taskTrainee.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/trainee/{id}")
    public ResponseEntity<List<TaskTrainee>> getTaskTraineeByTraineeId(@PathVariable String id){
        Trainee trainee = traineeRepository.findById(id).orElse(null);
        return ResponseEntity.ok(taskTraineeRepository.findAllByTrainee(trainee));
    }

    @PostMapping
    public ResponseEntity<TaskTrainee> createTaskTrainee(@RequestBody TaskTrainee taskTrainee){
        return ResponseEntity.ok(taskTraineeRepository.save(taskTrainee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskTrainee> updateTaskTrainee(@PathVariable String id, @Valid @RequestBody TaskTrainee taskTrainee) {
        taskTrainee.setId(id);
        return ResponseEntity.ok(taskTraineeRepository.save(taskTrainee));
    }

    @DeleteMapping("/{id}")
    public void deleteTaskTrainee(@PathVariable String id) {
        taskTraineeRepository.deleteById(id);
    }
}
