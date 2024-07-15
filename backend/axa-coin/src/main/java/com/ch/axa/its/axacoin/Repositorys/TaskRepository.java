package com.ch.axa.its.axacoin.Repositorys;


import com.ch.axa.its.axacoin.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {
}
