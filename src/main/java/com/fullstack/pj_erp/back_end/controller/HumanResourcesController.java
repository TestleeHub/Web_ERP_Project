package com.fullstack.pj_erp.back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.service.HumanResourcesService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class HumanResourcesController {

	@Autowired
	HumanResourcesService service;
	
	@GetMapping(value = {"/humanResources/empList"})
	public List<UserDTO> empList(){
		System.out.println("<<</humanResources/empList>>>");
		List<UserDTO> list = service.listEmp();
		System.out.println("empList:" + list);
		
		return list;
	}
	
	//@RequestBody UserDTO dto
	@PostMapping(value = {"/humanResources/empAdd"})
	public void empAdd(@RequestBody UserDTO dto) {
		System.out.println("<<</humanResources/empAdd>>>");
		
		System.out.println(dto);
		
		service.addEmp(dto);
	}
}
