package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.OrderFormDTO;
import com.fullstack.pj_erp.back_end.repository.OrderFormRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PurchaseService {

	private final OrderFormRepository repository;
	
	public void addOrder(OrderFormDTO dto) {
		System.out.println(repository);
		repository.save(dto);
	}
	
	public List<OrderFormDTO> listOrder() {
		Sort sort = Sort.by(Sort.Order.desc("dueDate"));
		
		// validation 체크
		Specification<OrderFormDTO> filter = new EntityValidationFilter<OrderFormDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return repository.findAll(filter, sort);
	}
	
	public void updateOrder(OrderFormDTO dto) {
		repository.save(dto);
	}
}
