package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.repository.HumanResourcesRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class HumanResourcesService {
	private final HumanResourcesRepository repository;
	
	// // 사원리스트
	public List<UserDTO> listEmp(){
		Sort sort = Sort.by(Sort.Order.desc("joinDate"));
		
		Specification<UserDTO> filter = new EntityValidationFilter<UserDTO>().excludeEntitiesWithCondition();
		return repository.findAll(filter, sort);
	}
	// 사원추가/삭제
	public void addEmp(UserDTO dto) {
		repository.save(dto);
	}
	

}
