package com.teamsos.arena;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan({"data.mapper"})
@ComponentScan({"data.*","naver.cloud","jwt.setting"})

@EnableScheduling
@MapperScan("data.mapper")
public class ArenaApplication {
    public static void main(String[] args) {
        SpringApplication.run(ArenaApplication.class, args);
    }

}
