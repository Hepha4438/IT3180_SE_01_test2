package main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"model"})  // Quét các entity trong package model
@EnableJpaRepositories(basePackages = {"repository"})  // Quét repository
@ComponentScan(basePackages = {"controller", "service", "repository", "model", "config"})  // Quét các component khác
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
