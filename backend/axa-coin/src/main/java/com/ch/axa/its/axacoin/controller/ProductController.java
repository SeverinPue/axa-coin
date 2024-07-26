package com.ch.axa.its.axacoin.controller;

import com.ch.axa.its.axacoin.Entity.*;
import com.ch.axa.its.axacoin.Repositorys.ProductRepository;
import com.ch.axa.its.axacoin.Repositorys.TrainerRepository;
import com.ch.axa.its.axacoin.Repositorys.TransactionRepository;
import com.ch.axa.its.axacoin.Repositorys.UserRepository;
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

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:3000")
@Hidden
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id){
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            return ResponseEntity.ok(product.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Map<String, Object> updates) {
        Product product = new Product();

        updates.forEach((key, value) -> {
            switch (key) {
                case "name":
                    product.setName(value.toString());
                    break;
                case "description":
                    product.setDescription(value.toString());
                    break;
                case "price":
                    product.setPrice(Double.parseDouble(value.toString()));
                    break;
                case "creator":
                    Optional<User> user = userRepository.findById(value.toString());
                    if (user.isPresent()) {
                        Optional<Trainer> trainer = trainerRepository.findTrainerByUser(user.get());
                        trainer.ifPresent(product::setCreator);
                    }
                    break;
            }
        });
        Product savedTask = productRepository.save(product);

        return ResponseEntity.ok(savedTask);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @Valid @RequestBody Map<String, Object> updates) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (!optionalProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        List<String> newTraineeIds = new ArrayList<>();

        updates.forEach((key, value) -> {
            switch (key) {
                case "name":
                    product.setName(value.toString());
                    break;
                case "description":
                    product.setDescription(value.toString());
                    break;
                case "price":
                    product.setPrice(Double.parseDouble(value.toString()));
                    break;
            }
        });

        Product savedProduct = productRepository.save(product);

        return ResponseEntity.ok(savedProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productRepository.deleteById(id);
    }
}
