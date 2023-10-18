package com.fullstack.pj_erp.back_end.controller;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.config.TokenBlacklist;
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
	private final TokenBlacklist tokenBlacklist;
	
	@GetMapping(value = {"","/"})
	public String index(){
		logger.info("<<<<index()>>>>");
		return"index";
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialsDTO){
		System.out.println("<<<AuthController - login>>>");
		UserDTO userDTO = userService.login(credentialsDTO);
		
		String token = userAuthProvider.createToken(String.valueOf(userDTO.getEmployeeId()), String.valueOf(userDTO.getDepartmentId()));
		System.out.println("login - token : " + token);
		String role = userAuthProvider.parsingDepartmentToRole(userDTO.getDepartmentId());
		userDTO.setToken(token);
		userDTO.setRole(role);
		
		return ResponseEntity.ok(userDTO);
	}
	
	@PostMapping("/register")
	public void register(@RequestBody UserDTO userDTO){
		System.out.println("<<<AuthController - register>>>");
		// 엔티티를 생성할 때 새 엔티티를 찾을수 있는 URL과 함께 201 HTTP코드를 반환하는 것이 좋다.
		userService.register(userDTO);
	}
	
	@PostMapping("/logoutUser/{token}")
	public void logout(@PathVariable String token) {
		System.out.println(tokenBlacklist);
		System.out.println("logout token = " + token);
		// 트래픽이 시간당 10명이라 가정했을때 1시간짜리 토큰이 만료되기전 로그아웃한 유저가 100명미만이라 가정하고 100개의 블랙리스트가 채워질 시 초기화
		
		if(tokenBlacklist.getBlacklistSize() >= 100) {
			tokenBlacklist.clearBlacklist();
		}
		tokenBlacklist.addToBlacklist(token);
	}
}
