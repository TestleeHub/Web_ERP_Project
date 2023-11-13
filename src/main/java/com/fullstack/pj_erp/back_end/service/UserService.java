package com.fullstack.pj_erp.back_end.service;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.CredentialsDTO;
import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.exception.AppException;
import com.fullstack.pj_erp.back_end.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	
	private final UserRepository userRepository; 
	@Autowired
	private final PasswordEncoder passwordEncoder; 
	
	public UserDTO findById(String id) {
		System.out.println("<<<UserService - findById()>>>");
		System.out.println("<<<UserService 정상진입>>>");
		
		UserDTO user = userRepository.findById(id).orElseThrow(()-> new AppException("UnKnown user", HttpStatus.NOT_FOUND));
		System.out.println("<<<UserService findById user>>>" + user);
		
		return user;
	}
	
	public UserDTO login(CredentialsDTO credentialsDTO) {
		System.out.println("<<<UserService - login credentialsDTO = >>>" + credentialsDTO);
		
		UserDTO user = userRepository.findById(credentialsDTO.getId())
				.orElseThrow(() -> new AppException("UnKnown user", HttpStatus.NOT_FOUND));
		
		if(passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPassword()), user.getPassword())) {
			System.out.println("<<<user>>>" + user);
			return user;
		}
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
		
		
	}
	
	public UserDTO register(UserDTO userDTO) {
		System.out.println("<<<UserService - register()>>>");
		System.out.println("userDTO  = " + userDTO);
		
		Optional<UserDTO>optionalUser = userRepository.findById(userDTO.getEmployeeId());
		
		if(optionalUser.isPresent()){
			throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
		}
		
		userDTO.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDTO.getPassword())));
		UserDTO saveUser = userRepository.save(userDTO);
		
		return saveUser;
	}
}
