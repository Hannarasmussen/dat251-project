package com.example.dat251_greengafl.service;

import com.example.dat251_greengafl.entities.UserEntity;
import com.example.dat251_greengafl.model.User;
import com.example.dat251_greengafl.repo.UserRepo;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity entity = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new org.springframework.security.core.userdetails.User(
                entity.getUsername(),
                entity.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }

    public List<User> findAll(){
        return userRepo.findAll().stream().map(this::toModel).toList();
    }

    public Optional<User> findById(Long id){
        return userRepo.findById(id).map(this::toModel);
    }

    public Optional<User> findByUsername(String username){
        return userRepo.findByUsername(username).map(this::toModel);
    }

    public User register(User user){
        if (user.getDietaryPreferences() == null) {
            user.setDietaryPreferences(new HashSet<>());
        }
        UserEntity entity = toEntity(user);
        entity.setPassword(passwordEncoder.encode(user.getPassword()));
        return toModel(userRepo.save(entity));
    }

    public void deleteById(Long id){
        userRepo.deleteById(id);
    }

    private User toModel(UserEntity entity) {
        User u = new User();
        u.setId(entity.getId());
        u.setUsername(entity.getUsername());
        u.setEmail(entity.getEmail());
        u.setPassword(entity.getPassword());
        u.setDietaryPreferences(entity.getDietaryPreferences());
        return u;
    }

    private UserEntity toEntity(User user) {
        UserEntity e = new UserEntity();
        if (user.getId() != null) {
            e.setId(user.getId());
        }
        e.setUsername(user.getUsername());
        e.setEmail(user.getEmail());
        e.setPassword(user.getPassword());
        e.setDietaryPreferences(user.getDietaryPreferences() != null
                ? user.getDietaryPreferences()
                : new HashSet<>());
        return e;
    }
}
