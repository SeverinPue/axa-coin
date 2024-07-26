package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.*;
import com.ch.axa.its.axacoin.Repositorys.*;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
@Hidden
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    private TraineeRepository traineeRepository;
    @Autowired
    private TaskTraineeRepository taskTraineeRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(){
        return ResponseEntity.ok(taskRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id){
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()){
            return ResponseEntity.ok(task.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Map<String, Object> updates) {
        Task task = new Task();
        List<String> traineeIds = new ArrayList<>();

        updates.forEach((key, value) -> {
            switch (key) {
                case "important":
                    task.setImportant(Boolean.parseBoolean(value.toString()));
                    break;
                case "title":
                    task.setTitle(value.toString());
                    break;
                case "description":
                    task.setDescription(value.toString());
                    break;
                case "endDate":
                    task.setEndDate(LocalDate.parse(value.toString()));
                    break;
                case "earningPoints":
                    task.setEarningPoints(Integer.parseInt(value.toString()));
                    break;
                case "creator":
                    Optional<User> user = userRepository.findById(value.toString());
                    if (user.isPresent()) {
                        Optional<Trainer> trainer = trainerRepository.findTrainerByUser(user.get());
                        trainer.ifPresent(task::setCreator);
                    }
                    break;
                case "trainees":
                    traineeIds.addAll((List<String>) value);
                    break;
            }
        });

        Task savedTask = taskRepository.save(task);

        traineeIds.forEach(traineeId -> {
            Optional<Trainee> trainee = traineeRepository.findById(traineeId);
            if (trainee.isPresent()) {
                TaskTrainee taskTrainee = new TaskTrainee();
                taskTrainee.setTask(savedTask);
                taskTrainee.setTrainee(trainee.get());
                taskTraineeRepository.save(taskTrainee);
            }
        });

        return ResponseEntity.ok(savedTask);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @Valid @RequestBody Map<String, Object> updates) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (!optionalTask.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Task task = optionalTask.get();
        List<String> newTraineeIds = new ArrayList<>();

        updates.forEach((key, value) -> {
            switch (key) {
                case "important":
                    task.setImportant(Boolean.parseBoolean(value.toString()));
                    break;
                case "title":
                    task.setTitle(value.toString());
                    break;
                case "description":
                    task.setDescription(value.toString());
                    break;
                case "endDate":
                    task.setEndDate(LocalDate.parse(value.toString()));
                    break;
                case "earningPoints":
                    task.setEarningPoints(Integer.parseInt(value.toString()));
                    break;
                case "trainees":
                    newTraineeIds.addAll((List<String>) value);
                    break;
            }
        });

        Task savedTask = taskRepository.save(task);

        List<TaskTrainee> existingTaskTrainees = taskTraineeRepository.findByTaskId(id);
        List<String> existingTraineeIds = existingTaskTrainees.stream()
                .map(tt -> tt.getTrainee().getId())
                .toList();

        existingTaskTrainees.forEach(taskTrainee -> {
            if (!newTraineeIds.contains(taskTrainee.getTrainee().getId())) {
                taskTraineeRepository.delete(taskTrainee);
            }
        });
        newTraineeIds.forEach(traineeId -> {
            if (!existingTraineeIds.contains(traineeId)) {
                Optional<Trainee> trainee = traineeRepository.findById(traineeId);
                if (trainee.isPresent()) {
                    TaskTrainee taskTrainee = new TaskTrainee();
                    taskTrainee.setTask(savedTask);
                    taskTrainee.setDateOfSubmission(null);
                    taskTrainee.setTrainee(trainee.get());
                    taskTraineeRepository.save(taskTrainee);
                }
            }
        });
        return ResponseEntity.ok(savedTask);
    }


    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        taskRepository.deleteById(id);
    }
}
