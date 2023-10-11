package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fullstack.pj_erp.back_end.dto.UserDTO;

public interface UserRepository extends JpaRepository<UserDTO, String>{
	
}
