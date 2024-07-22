package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.Task;
import com.ch.axa.its.axacoin.Entity.TaskTrainee;
import com.ch.axa.its.axacoin.Entity.Trainee;
import com.ch.axa.its.axacoin.Repositorys.TaskRepository;
import com.ch.axa.its.axacoin.Repositorys.TaskTraineeRepository;
import com.ch.axa.its.axacoin.Repositorys.TraineeRepository;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasktrainees")
@CrossOrigin("*")
@Hidden
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
    public ResponseEntity<TaskTrainee> updateTaskTrainee(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates) {
        TaskTrainee existingTaskTrainee = taskTraineeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TaskTrainee not found with id: " + id));
        updates.forEach((key, value) -> {
            switch (key) {
                case "dateOfSubmission":
                    if (value == null) {
                        existingTaskTrainee.setDateOfSubmission(null);
                    } else {
                        existingTaskTrainee.setDateOfSubmission(LocalDate.parse((String) value));
                    }
                    break;
                case "approved":
                    existingTaskTrainee.getTask().setApproved((Boolean) value);
                    break;
                case "endDate":
                    if (value == null) {
                        existingTaskTrainee.getTask().setEndDate(null);
                    } else {
                        existingTaskTrainee.getTask().setEndDate(LocalDate.parse((String) value));
                    }
            }
        });
        TaskTrainee savedTaskTrainee = taskTraineeRepository.save(existingTaskTrainee);
        return ResponseEntity.ok(savedTaskTrainee);
    }
    @PutMapping("/secure/{id}")
    public ResponseEntity<TaskTrainee> updateTaskTraineeSecure(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates) {
        TaskTrainee existingTaskTrainee = taskTraineeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TaskTrainee not found with id: " + id));
        updates.forEach((key, value) -> {
            if (key.equals("dateOfSubmission")) {
                if (value == null) {
                    existingTaskTrainee.setDateOfSubmission(null);
                } else {
                    existingTaskTrainee.setDateOfSubmission(LocalDate.parse((String) value));
                }
            }
        });
        TaskTrainee savedTaskTrainee = taskTraineeRepository.save(existingTaskTrainee);
        return ResponseEntity.ok(savedTaskTrainee);
    }
    @DeleteMapping("/{id}")
    public void deleteTaskTrainee(@PathVariable String id) {
        taskTraineeRepository.deleteById(id);
    }
}
