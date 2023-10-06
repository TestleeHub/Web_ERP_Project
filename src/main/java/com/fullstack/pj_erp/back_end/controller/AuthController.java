package com.fullstack.pj_erp.back_end.controller;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.config.UserAuthProvider;
import com.fullstack.pj_erp.back_end.dto.CredentialsDTO;
import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	private final UserService userService;
	private final UserAuthProvider userAuthProvider;
	
	@GetMapping(value = {"","/"})
	public String index(){
		logger.info("<<<<index()>>>>");
		return"index";
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialsDTO){
		System.out.println("<<<AuthController - login>>>");
		UserDTO userDTO = userService.login(credentialsDTO);
		
		String token = userAuthProvider.createToken(String.valueOf(userDTO.getEmployeeId()));
		System.out.println("login - token : " + token);
		userDTO.setToken(token);
		
		return ResponseEntity.ok(userDTO);
	}
	
	@PostMapping("/register")
	public void register(@RequestBody UserDTO userDTO){
		System.out.println("<<<AuthController - register>>>");
		// 엔티티를 생성할 때 새 엔티티를 찾을수 있는 URL과 함께 201 HTTP코드를 반환하는 것이 좋다.
		userService.register(userDTO);
	}
}
