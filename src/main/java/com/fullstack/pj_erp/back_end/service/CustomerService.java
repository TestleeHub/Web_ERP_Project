package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.CustomerDTO;
import com.fullstack.pj_erp.back_end.dto.MaterialRecivesDTO;
import com.fullstack.pj_erp.back_end.dto.ProductionItemsDTO;
import com.fullstack.pj_erp.back_end.repository.CustomerRepository;
import com.fullstack.pj_erp.back_end.repository.TradeHistoryRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerService {
	
	private final CustomerRepository customerRepository;
	private final TradeHistoryRepository tradeHistoryRepository;
	
	public List<CustomerDTO> getCustomerList(){
		Sort sort = Sort.by(Sort.Order.desc("customerId"));
		//validation 체크
		Specification<CustomerDTO> filter = new EntityValidationFilter<CustomerDTO>().excludeEntitiesWithCondition();
		return customerRepository.findAll(filter, sort);
	}
	
	public void addCustomerList(CustomerDTO dto) {
		customerRepository.save(dto);
	}
	
	public void updateCustomerList(CustomerDTO dto) {
		customerRepository.save(dto);
	}
	


}
