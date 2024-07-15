package com.ch.axa.its.axacoin;

import com.ch.axa.its.axacoin.Entity.*;
import com.ch.axa.its.axacoin.Repositorys.*;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TraineeRepository traineeRepository;
    private final TrainerRepository trainerRepository;
    private final ProductRepository productRepository;
    private final TaskRepository taskRepository;
    private final TaskTraineeRepository taskTraineeRepository;
    private final TransactionRepository transactionRepository;

    private final Faker faker = new Faker();

    public DataLoader(UserRepository userRepository, TraineeRepository traineeRepository, TrainerRepository trainerRepository, ProductRepository productRepository, TaskRepository taskRepository, TaskTraineeRepository taskTraineeRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.traineeRepository = traineeRepository;
        this.trainerRepository = trainerRepository;
        this.productRepository = productRepository;
        this.taskRepository = taskRepository;
        this.taskTraineeRepository = taskTraineeRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        for (int i = 0; i < 5; i++) {
            User user = createUser();
            Trainer trainer = createTrainer(user);
            Trainee trainee = createTrainee(user, trainer);
            List<Product> products = createProducts(trainer);
            List<Task> tasks = createTasks(trainer);
            createTaskTrainees(tasks, trainee);
            createTransactions(trainee, products);
        }
    }

    private User createUser() {
        User user = new User();
        user.setUsername(faker.name().username());
        user.setPassword(faker.internet().password());
        user.setEmail(faker.internet().emailAddress());
        return userRepository.save(user);
    }

    private Trainer createTrainer(User user) {
        Trainer trainer = new Trainer();
        trainer.setUser(user);
        return trainerRepository.save(trainer);
    }

    private Trainee createTrainee(User user, Trainer trainer) {
        Trainee trainee = new Trainee();
        trainee.setUser(user);
        trainee.setTrainer(trainer);
        trainee.setYear(LocalDate.now());
        return traineeRepository.save(trainee);
    }

    private List<Product> createProducts(Trainer trainer) {
        return (List<Product>) productRepository.saveAll(new HashSet<>() {{
            for (int i = 0; i < 5; i++) {
                Product product = new Product();
                product.setName(faker.commerce().productName());
                product.setDescription(faker.lorem().sentence());
                product.setPrice(faker.number().randomDouble(2, 1, 100));
                product.setTrainer(trainer);
                add(product);
            }
        }});
    }

    private List<Task> createTasks(Trainer trainer) {
        return (List<Task>) taskRepository.saveAll(new HashSet<>() {{
            for (int i = 0; i < 5; i++) {
                Task task = new Task();
                task.setTitle(faker.lorem().sentence());
                task.setDescription(faker.lorem().paragraph());
                task.setEndDate(LocalDate.now().plusDays(faker.number().numberBetween(1, 30)));
                task.setEarningPoints(faker.number().numberBetween(10, 100));
                task.setCreator(trainer);
                add(task);
            }
        }});
    }
    private void createTaskTrainees(List<Task> tasks, Trainee trainee) {
        taskTraineeRepository.saveAll(new HashSet<>() {{
            for (Task task : tasks) {
                TaskTrainee taskTrainee = new TaskTrainee();
                taskTrainee.setDateOfSubmission(LocalDate.now());
                taskTrainee.setTask_id(task);
                taskTrainee.setTrainee_id(trainee);
                add(taskTrainee);
            }
        }});
    }

    private void createTransactions(Trainee trainee, List<Product> products) {
        transactionRepository.saveAll(new HashSet<>() {{
            for (Product product : products) {
                Transaction transaction = new Transaction();
                transaction.setTransactionDate(LocalDateTime.now());
                transaction.setTrainee(trainee);
                transaction.setProduct(product);
                add(transaction);
            }
        }});
    }
}
