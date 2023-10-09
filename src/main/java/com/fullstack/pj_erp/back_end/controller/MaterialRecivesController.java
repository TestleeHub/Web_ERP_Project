package com.fullstack.pj_erp.back_end.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.dto.MaterialRecivesDTO;
import com.fullstack.pj_erp.back_end.service.MaterialRecivesService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class MaterialRecivesController {
	@Autowired
	MaterialRecivesService service;
	
	@GetMapping(value = {"/manufacture/warehousingList"})
	public List<MaterialRecivesDTO> index(){
		
		return service.getList();
	}
	
	@PostMapping(value = {"/manufacture/warehousingAdd"})
	public void warehousingAdd(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		dto.setRegistDate(new Date(System.currentTimeMillis()));
		
		dto.setValidation(1);
		
		for (int i = 0; i < dto.getDetails().size(); i++) {
			dto.getDetails().get(i).setRecivesDetailId("_"+i);
		}
		
		System.out.println(dto);
		
		service.addList(dto);
	}
	
	@PutMapping(value = {"/manufacture/warehousingDelete"})
	public void warehousingDelete(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateList(dto);
	}
	
	@PutMapping(value = {"/manufacture/warehousingUpdate"})
	public void warehousingUpdate(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		service.updateList(dto);
	}
}
