package com.example.dat251_greengafl.repo;

import com.example.dat251_greengafl.entities.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepo extends JpaRepository<UserProfile, Long> {

}
