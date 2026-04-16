package com.example.dat251_greengafl;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.dat251_greengafl.the_meal_db_client.Client;

@Configuration
public class Config {

    @Bean
    public Client mealDbClient() {
        return new Client();
    }
}
