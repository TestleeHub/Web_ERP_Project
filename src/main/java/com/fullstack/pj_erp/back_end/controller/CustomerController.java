package com.fullstack.pj_erp.back_end.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.dto.CustomerDTO;
import com.fullstack.pj_erp.back_end.service.CustomerService;

import lombok.RequiredArgsConstructor;

// 거래처 관리 컨트롤러
@RequiredArgsConstructor
@RestController
@RequestMapping
public class CustomerController {
	
	@Autowired
	CustomerService service;

	/* 거래처 목록 시작 */
	// 거래처 조회
	@GetMapping(value = { "/customer/customerList" })
	public List<CustomerDTO> customerList() {
		
		return service.getCustomerList();
	}
	
	// 거래처 1곳 조회
	@GetMapping(value = { "/customer/{customerId}" })
	public CustomerDTO getCustomerById(@PathVariable String customerId) {
		
		return service.getCustomerById(customerId);
	}
	
	// 거래처 입력
	@PostMapping(value = { "/customer/customerAdd" })
	public void customerAdd(@RequestBody CustomerDTO dto) {
		System.out.println(dto);
		
		dto.setValidation(1);  // 입력과 동시에 validation에 "1"을 부여함
		// 최초 생성일때만 id를 만들어 주고 update시에는 아이디 생성 X
		if (dto.getCustomerId() == null) {
			for (int i = 0; i < dto.getDetails().size(); i++) {
			//	dto.getDetails().get(i).set
			}
		}
		
		System.out.println(dto);
		
		service.addCustomerList(dto);
	}
	
	// 거래처 수정
	@PutMapping(value = { "/customer/customerUpdate" })
	public void customerUpdate(@RequestBody CustomerDTO dto) {
		System.out.println(dto);
		service.updateCustomerList(dto);
	}
	
	// 거래처 삭제(validation을 "1"에서 "0"으로 바꿔서 보이지 않도록 하는 방식)
	@PutMapping(value = { "/customer/customerDelete" })
	public void customerDelete(@RequestBody CustomerDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateCustomerList(dto);
	}
	/* 거래처 목록 끝 */
	
	
}