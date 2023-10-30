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

import com.fullstack.pj_erp.back_end.dto.CustomerDTO;
import com.fullstack.pj_erp.back_end.dto.TradeHistoryDTO;
import com.fullstack.pj_erp.back_end.dto.TradeSlipDTO;
import com.fullstack.pj_erp.back_end.service.CustomerService;

import lombok.RequiredArgsConstructor;

// 거래처 관리 컨트롤러
@RequiredArgsConstructor
@RestController
@RequestMapping
public class CustomerController {
	
	@Autowired
	CustomerService service;

	/* 거래처 관리 부분 시작 */
	// 거래처 조회
	@GetMapping(value = { "/customer/customerList" })
	public List<CustomerDTO> customerList() {
		
		return service.getCustomerList();
	}
	
	// 거래처 입력
	@PostMapping(value = { "/customer/customerAdd" })
	public void customerAdd(@RequestBody CustomerDTO dto) {
		System.out.println("[CustomerDTO]" + dto);
		
		dto.setValidation(1);
		
		System.out.println("[CustomerDTO]" + dto);
		
		service.addCustomerList(dto);
	}
	
	// 거래처 수정
	@PutMapping(value = { "/customer/customerUpdate" })
	public void customerUpdate(@RequestBody CustomerDTO dto) {
		System.out.println("[CustomerDTO]" + dto);
		
		service.updateCustomerList(dto);
	}
	
	// 거래처 삭제(validation을 "1"에서 "0"으로 바꿔서 보이지 않도록 하는 방식)
	@PutMapping(value = { "/customer/customerDelete" })
	public void customerDelete(@RequestBody CustomerDTO dto) {
		System.out.println("[CustomerDTO]" + dto);
		
		dto.setValidation(0);
		
		service.updateCustomerList(dto);
	}
	/* 거래처 관리 부분 끝 */
	
	
	/* 입금/출금 관리 부분 시작 - 테이블은 같이, 입금/출금별 페이지는 다르게 준다. */
	// 입금/출금 조회
	@GetMapping(value = { "/customer/tradeSlip" })
	public List<TradeSlipDTO> tradeSlip() {
		
		return service.getTradeSlip();
	}
	
	// 입금/출금 입력
	@PostMapping(value = { "/customer/tradeSlipAdd" })
	public void tradeSlipAdd(@RequestBody TradeSlipDTO dto) {
		System.out.println("[TradeSlipDTO]" + dto);
		dto.setRegDate(new Date(System.currentTimeMillis()));
		
		dto.setValidation(1);
		
		System.out.println("[TradeSlipDTO]" + dto);
		
		service.addTradeSlip(dto);
	}
	
	// 수정, 삭제는 테이블 특징상 제외.
	
//	// 입금/출금 수정
//	@PutMapping(value = { "/customer/tradeSlipUpdate" })
//	public void tradeSlipUpdate(@RequestBody TradeSlipDTO dto) {
//		System.out.println("[TradeSlipDTO]" + dto);
//		
//		service.updateTradeSlip(dto);
//	}
//	
//	// 입금/출금 삭제(validation을 "1"에서 "0"으로 바꿔서 보이지 않도록 하는 방식)
//	@PutMapping(value = { "/customer/tradeSlipDelete" })
//	public void tradeSlipDelete(@RequestBody TradeSlipDTO dto) {
//		System.out.println("[TradeSlipDTO]" + dto);
//		
//		dto.setValidation(0);
//		
//		service.updateTradeSlip(dto);
//	}
	
	/* 입금/출금 관리 부분 끝 */
	
	
	/* 거래내역 관리 부분 시작*/
	// 거래내역 조회
	@GetMapping(value = { "/customer/tradeHistory" })
	public List<TradeHistoryDTO> tradeHistory() {
		
		return service.getTradeHistory();
	}
	
	// 입력, 수정, 삭제는 테이블 특징상 제외.
	
	/* 거래내역 관리 부분 끝 */
}