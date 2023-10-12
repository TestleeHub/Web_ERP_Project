package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.repository.HumanResourcesRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class HumanResourcesService {
	private final HumanResourcesRepository repository;
	
	// // 사원리스트
	public List<UserDTO> listEmp(){
		
		return repository.findAll();
	}
	// 사원추가
	public void addEmp(UserDTO dto) {
		repository.save(dto);
	}

}
