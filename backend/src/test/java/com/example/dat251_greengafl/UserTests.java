package com.example.dat251_greengafl;

import com.example.dat251_greengafl.model.User;
import com.example.dat251_greengafl.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


@SpringBootTest
class UserTests {

    @Autowired
    private UserService userService;

    @Test
    void testCreateUser() {
        User user = new User();
        user.setUsername("test");
        user.setEmail("test@test.com");
        user.setPassword("123123");
        User saved = userService.register(user);
        assertThat(saved).isNotNull();
        assertThat(saved.getUsername()).isEqualTo("test");
        assertThat(saved.getEmail()).isEqualTo("test@test.com");
        System.out.println(user.getId());
    }

    @Test
    void testDeleteUser(){
        User user = new User();
        user.setUsername("delete");
        user.setEmail("delete@del.no");
        user.setPassword("123123");
        User saved = userService.register(user);
        assertThat(saved).isNotNull();
        assertThat(saved.getUsername()).isEqualTo("delete");
        userService.deleteById(saved.getId());
        assertThat(userService.findById(saved.getId())).isEmpty();
    }

    @Test
    void testNoDuplicateUsername(){
        User user1 = new User();
        user1.setUsername("1");
        user1.setEmail("1@1.no");
        user1.setPassword("123123");
        User user2 = new User();
        user2.setUsername("1");
        user2.setEmail("1@2.no");
        user2.setPassword("123123");
        userService.register(user1);
        assertThatThrownBy(() -> userService.register(user2))
                .isInstanceOf(DataIntegrityViolationException.class);
        userService.deleteById(user1.getId());
        userService.deleteById(user2.getId());
    }

    @Test
    void testNoDuplicateEmail(){
        User user1 = new User();
        user1.setUsername("1");
        user1.setEmail("1@1.no");
        user1.setPassword("123123");
        User user2 = new User();
        user2.setUsername("2");
        user2.setEmail("1@1.no");
        user2.setPassword("123123");
        userService.register(user1);
        assertThatThrownBy(() -> userService.register(user2)).isInstanceOf(DataIntegrityViolationException.class);
        userService.deleteById(user1.getId());
        userService.deleteById(user2.getId());
    }

    @Test
    void testDummyUserCreate(){
        User u = new User();
        u.setUsername("Hara");
        u.setEmail("1@2.no");
        u.setPassword("123123");
        userService.register(u);
    }
}

