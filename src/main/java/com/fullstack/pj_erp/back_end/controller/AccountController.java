package com.fullstack.pj_erp.back_end.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.dto.PurchaseFormDTO;
import com.fullstack.pj_erp.back_end.dto.Purchase_DetailDTO;
import com.fullstack.pj_erp.back_end.dto.SalesDTO;
import com.fullstack.pj_erp.back_end.dto.Sales_DetailDTO;
import com.fullstack.pj_erp.back_end.service.AccountService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class AccountController {
	
	@Autowired
	private AccountService service;
	
	@GetMapping(value= {"/account/purchaseBook"}) // react에서 value값으로 요청 >>> 아래 함수 실행
	public List<PurchaseFormDTO> purchaseBookList(){
		List<PurchaseFormDTO> purchaseBookList = service.listPurchase();
		
		for(PurchaseFormDTO dto: purchaseBookList) {
			int sum = 0; // purchaseForm에 존재하는 모든 항목의 총 합산값 선언 및 초기화
			
			for(Purchase_DetailDTO detail: dto.getDetails()) {
				sum += detail.getQuantity() * detail.getPrice();
			}
			
			dto.setTotalPrice(sum); // 총 합산값을 purchaseFormDTO에 전달
			dto.setVat(sum/10);
		}
		System.out.println(purchaseBookList);
		
		return purchaseBookList; // return값을 json형식으로 react에 전달함.
	}
	
	@RequestMapping(value= {"/account/salesBook"})
	public List<SalesDTO> salesBookList(){
		List<SalesDTO> salesBookList = service.listSales();
		
		for(SalesDTO dto: salesBookList) {
			int sum = 0;
			
			for(Sales_DetailDTO detail: dto.getDetails()) {
				sum += detail.getQuantity() * detail.getPrice();
			}
			
			dto.setTotalPrice(sum);
			dto.setVat(sum/10);
		}
		System.out.println(salesBookList);
		
		return salesBookList;
	}
}
