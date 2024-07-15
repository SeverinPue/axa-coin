package com.ch.axa.its.axacoin.Repositorys;

import com.ch.axa.its.axacoin.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {

}
