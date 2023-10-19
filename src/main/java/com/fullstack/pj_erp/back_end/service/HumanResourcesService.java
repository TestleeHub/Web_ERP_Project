package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.SalaryDTO;
import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.repository.HumanResourcesRepository;
import com.fullstack.pj_erp.back_end.repository.HumanSalaryRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class HumanResourcesService {
	private final HumanResourcesRepository repository;
	private final HumanSalaryRepository Salaryrepository; 
	
	// 사원리스트
	public List<UserDTO> listEmp(){
		Sort sort = Sort.by(Sort.Order.desc("joinDate"));
		
		Specification<UserDTO> filter = new EntityValidationFilter<UserDTO>().excludeEntitiesWithCondition();
		return repository.findAll(filter, sort);
	}
	
	// 사원 조회(1명)
	public UserDTO getEmp(String employeeId) {
		System.out.println("getEmp");
		System.out.println("getEmp-employeeId: " + employeeId);
		//String id = "s0002";
		UserDTO dto = repository.findById(employeeId).get();
		
		System.out.println("dto:" + dto);
		return dto;
	} 
	
	// 사원추가/삭제
	public void addEmp(UserDTO dto) {
		repository.save(dto);
	}
	
	// 급여등록
	public void AddSalary(SalaryDTO dto) {
		Salaryrepository.save(dto);
	}
	
	// 급여 조회
	public List<SalaryDTO> listSalary(){
		
		Specification<SalaryDTO> filter = new EntityValidationFilter<SalaryDTO>().excludeEntitiesWithCondition();
		return Salaryrepository.findAll(filter);
	}
	

}
