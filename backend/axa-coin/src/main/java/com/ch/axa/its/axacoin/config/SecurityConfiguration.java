package com.ch.axa.its.axacoin.config;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/authenticate").permitAll()
                        .requestMatchers("/api/auth/admin").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "api/products").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "api/products").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "api/products").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "api/tasks").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "api/tasks").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "api/tasks").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "api/tasktrainees").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "api/tasktrainees").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "api/tasktrainees").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/tasktrainees").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "api/trainees").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "api/trainees").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "api/trainees").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "api/trainees").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "api/trainees/purchase/").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "api/trainees").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "api/trainers/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "api/trainers").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "api/trainers").hasRole("ADMIN")

                        .requestMatchers("api/users/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }



}
