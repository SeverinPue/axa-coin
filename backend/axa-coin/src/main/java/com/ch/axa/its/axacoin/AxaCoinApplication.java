package com.ch.axa.its.axacoin;

import com.ch.axa.its.axacoin.service.Hash;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@OpenAPIDefinition()
public class AxaCoinApplication {

    public static void main(String[] args) {
        SpringApplication.run(AxaCoinApplication.class, args);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public Hash hash(){
        return new Hash();
    }


}
