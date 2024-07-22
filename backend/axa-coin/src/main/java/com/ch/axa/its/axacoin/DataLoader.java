package com.ch.axa.its.axacoin;

import com.ch.axa.its.axacoin.Entity.*;
import com.ch.axa.its.axacoin.Repositorys.*;
import com.github.javafaker.Faker;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TraineeRepository traineeRepository;
    private final TrainerRepository trainerRepository;
    private final ProductRepository productRepository;
    private final TaskRepository taskRepository;
    private final TaskTraineeRepository taskTraineeRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Faker faker = new Faker();
    private Random random;

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
        User livio = new User();
        random = new Random();
        livio.setUsername("livio");
        livio.setPassword(passwordEncoder.encode("livio"));
        livio.setRole("ROLE_"+Role.ADMIN.name());
        userRepository.save(livio);


        User jay = new User();
        jay.setUsername("jay");
        jay.setPassword(passwordEncoder.encode("jay"));
        jay.setRole("ROLE_"+Role.USER.name());
        userRepository.save(jay);
        Trainee jaytrainee = createTrainee(jay, createTrainer(createUser()));
        jaytrainee.setPoints(500);
        traineeRepository.save(jaytrainee);
        List<Task> jayTasks = createTasks(createTrainer(createUser()));
        createTaskTrainees(jayTasks, jaytrainee);


            User user = createUser();
            Trainer trainer = createTrainer(user);
            List<Product> products = createProducts(trainer);
            List<Task> tasks = createTasks(trainer);
            for (int j = 0; j < 5; j++) {
                Trainee trainee = createTrainee(createUser(), trainer);
                createTaskTrainees(tasks, trainee);
                createTransactions(trainee, products);
            }

    }

    private User createUser() {
        User user = new User();
        user.setUsername(faker.name().username());
        user.setPassword(passwordEncoder.encode(faker.internet().password()));
        user.setRole("ROLE_"+Role.USER.name());
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
        Random rand = new Random();
        trainee.setPoints(20000);
        trainee.setYear(Year.now());
        return traineeRepository.save(trainee);
    }

    private List<Product> createProducts(Trainer trainer) {
        return (List<Product>) productRepository.saveAll(new HashSet<>() {{
            for (int i = 0; i < 5; i++) {
                Product product = new Product();
                product.setName(faker.commerce().productName());
                String description = faker.lorem().sentence();
                if (description.length() > 240){
                    description = description.substring(0, 240);
                }
                product.setDescription(description);
                product.setPrice((int) (Math.random() * 91) + 10);
                product.setCreator(trainer);
                add(product);
            }
        }});
    }


    private List<Task> createTasks(Trainer trainer) {
        return (List<Task>) taskRepository.saveAll(new HashSet<>() {{
            for (int i = 0; i < 5; i++) {
                Task task = new Task();
                String title = faker.lorem().sentence();
                if (title.length() > 60){
                    title = title.substring(0, 60);
                }
                task.setTitle(title);
                task.setDescription(faker.lorem().paragraph());
                task.setEndDate(LocalDate.now().plusDays(faker.number().numberBetween(1, 30)));
                task.setEarningPoints(faker.number().numberBetween(10, 100));
                task.setImportant(random.nextBoolean());
                task.setApproved(false);
                task.setCreator(trainer);
                add(task);
            }
        }});
    }
    private void createTaskTrainees(List<Task> tasks, Trainee trainee) {
        taskTraineeRepository.saveAll(new HashSet<>() {{
            Random random = new Random();
            for (Task task : tasks) {
                TaskTrainee taskTrainee = new TaskTrainee();
                int randomNumber = random.nextInt(4) + 1;
                if(randomNumber == 1) {
                    taskTrainee.setDateOfSubmission(LocalDate.now());
                }else{
                    taskTrainee.setDateOfSubmission(null);
                }
                taskTrainee.setTask(task);
                taskTrainee.setTrainee(trainee);
                add(taskTrainee);
            }
        }});
    }
    private void createTransactions(Trainee trainee, List<Product> products) {
        transactionRepository.saveAll(new HashSet<>() {{
            for (Product product : products) {
                Transaction transaction = new Transaction();
                transaction.setTransactionDate(LocalDate.now());
                transaction.setTrainee(trainee);
                transaction.setProduct(product);
                add(transaction);
            }
        }});
    }
}
