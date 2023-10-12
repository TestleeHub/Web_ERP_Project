package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.CustomerDTO;
import com.fullstack.pj_erp.back_end.repository.CustomerRepository;
import com.fullstack.pj_erp.back_end.repository.TradeHistoryRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerService {
	
	private final CustomerRepository customerRepository;
	private final TradeHistoryRepository tradeHistoryRepository;
	
	// 거래처 조회
	public List<CustomerDTO> getCustomerList() {
		// TODO Auto-generated method stub
		return null;
	}

	// 거래처 1곳 조회
	public CustomerDTO getCustomerById(String customerId) {
		// TODO Auto-generated method stub
		return null;
	}

	
	// 거래처 1곳 입력
	public void addCustomerList(CustomerDTO dto) {
		customerRepository.save(dto);
		
	}
	
	// 거래처 수정 및 삭제
	public void updateCustomerList(CustomerDTO dto) {
		customerRepository.save(dto);
		
	}


}
