package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.MaterialRecivesDTO;
import com.fullstack.pj_erp.back_end.repository.MaterialRecivesRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ManufactureService {
	private final MaterialRecivesRepository repository;
	
	public List<MaterialRecivesDTO> getwarehousingList(){
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		//validation 체크
		Specification<MaterialRecivesDTO> filter = new EntityValidationFilter<MaterialRecivesDTO>().excludeEntitiesWithCondition();
		return repository.findAll(filter, sort);
	}
	
	public void addwarehousingList(MaterialRecivesDTO dto) {
		repository.save(dto);
	}
	
	public void updatewarehousingList(MaterialRecivesDTO dto) {
		repository.save(dto);
	}
}
