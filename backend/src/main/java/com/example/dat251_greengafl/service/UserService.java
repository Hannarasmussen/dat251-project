package com.example.dat251_greengafl.service;

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
import java.util.UUID;

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
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
    
    public List<User> findAll(){
        return userRepo.findAll();
    }

    public Optional<User> findById(UUID id){
        return userRepo.findById(id);
    }

    public Optional<User> findByUsername(String username){
        return userRepo.findByUsername(username);
    }

    public User register(User user){
        if (user.getDietaryPreferences() == null) {
            user.setDietaryPreferences(new HashSet<>());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public void deleteById(UUID id){
        userRepo.deleteById(id);
    }
}
