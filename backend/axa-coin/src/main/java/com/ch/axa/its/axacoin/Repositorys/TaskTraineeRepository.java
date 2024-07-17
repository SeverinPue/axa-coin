package com.ch.axa.its.axacoin.Repositorys;

import com.ch.axa.its.axacoin.Entity.TaskTrainee;
import com.ch.axa.its.axacoin.Entity.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskTraineeRepository extends JpaRepository<TaskTrainee, String> {

    @Query("SELECT taskTrainees FROM TaskTrainee taskTrainees WHERE taskTrainees.trainee = :trainee ")
    List<TaskTrainee> findAllByTrainee(Trainee trainee);
}
