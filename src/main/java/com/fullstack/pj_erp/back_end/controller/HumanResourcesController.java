package com.fullstack.pj_erp.back_end.controller;

import java.nio.CharBuffer;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.dto.SalaryDTO;
import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.service.HumanResourcesService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class HumanResourcesController {

	@Autowired
	HumanResourcesService service;
	private final PasswordEncoder passwordEncoder; 
	
	// emp 조회
	@GetMapping(value = {"/humanResources/empList"})
	public List<UserDTO> empList(){
		
		System.out.println("\n<<</humanResources/empList>>>");
		List<UserDTO> list = service.listEmp();
		System.out.println("empList:" + list);
		
		return list;
	}
	
	// emp 추가/수정
	@PostMapping(value = {"/humanResources/empAdd"})
	public void empAdd(@RequestBody UserDTO dto) {
		System.out.println("<<</humanResources/empAdd>>>");
		dto.setJoinDate(new Date(System.currentTimeMillis()));
		dto.setValidation(1);
		
		dto.setPassword(passwordEncoder.encode(CharBuffer.wrap(dto.getPassword())));
		System.out.println(dto);
		
		service.addEmp(dto);
	}
	
	// emp 삭제
	@PutMapping(value = {"/humanResources/empDelete"})
	public void empDelete(@RequestBody UserDTO dto) {
		System.out.println("<<</humanResources/empDelete>>>");
		dto.setValidation(0);
		System.out.println(dto);
		
		service.addEmp(dto);
	}
	
	// 급여 조회
	@GetMapping(value = {"/humanResources/salary"})
	public List<SalaryDTO> salary(){
		
		System.out.println("\n<<</humanResources/salary>>>");
		List<SalaryDTO> list = service.listSalary();
		System.out.println("salary:" + list);
		
		return list;
	}

	
}
