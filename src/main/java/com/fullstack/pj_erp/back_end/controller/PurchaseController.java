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

import com.fullstack.pj_erp.back_end.dto.OrderFormDTO;
import com.fullstack.pj_erp.back_end.dto.PurchaseFormDTO;
import com.fullstack.pj_erp.back_end.dto.SalesDTO;
import com.fullstack.pj_erp.back_end.dto.SalesFormDTO;
import com.fullstack.pj_erp.back_end.service.PurchaseService;

import lombok.RequiredArgsConstructor;

// 구매 · 판매 컨트롤러
@RequiredArgsConstructor
@RestController
@RequestMapping
public class PurchaseController {

	@Autowired
	private PurchaseService service;
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	// 발주서 입력
	@PostMapping(value = {"/purchase/orderForm"})
	public void orderForm(@RequestBody OrderFormDTO dto) {
		System.out.println("[OrderFormDTO] : " + dto);
		
		dto.setValidation(1); // 디폴트 값 : 1
		// 최초 생성시에만 id를 만들어주고 update 시엔 아이디 따로 생성하지 않음
		if(dto.getOrderFormId() == null || dto.getOrderFormId().length() == 0) {
			for(int i = 0; i < dto.getDetails().size(); i++) {
				dto.getDetails().get(i).setOrderFormDetailId("_" + i);
			}
		}
		System.out.println("[OrderFormDTO] : " + dto); // validation=1로 바뀐거 확인
		
		service.addOrder(dto);
	}
	
	// 발주 목록
	@GetMapping(value = {"/purchase/orderList"})
	public List<OrderFormDTO> orderList() {
		return service.listOrder();
	}
	 
	// 발주 목록 수정
	@PutMapping(value = {"/purchase/orderForm"})
	public void orderUpdate(@RequestBody OrderFormDTO dto) {
		System.out.println("[OrderFormDTO] : " + dto);
		service.updateOrder(dto);
	}
	
	// 발주 목록 삭제 => 삭제하는 대신 유효성을 0으로
	@PutMapping(value = {"/purchase/orderDelete"})
	public void orderDelete(@RequestBody OrderFormDTO dto) {
		System.out.println("[OrderFormDTO] : " + dto);
		dto.setValidation(0);
		service.updateOrder(dto);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	// 구매폼 입력
	@PostMapping(value = {"/purchase/purchaseForm"})
	public void purchaseForm(@RequestBody PurchaseFormDTO dto) {
		System.out.println("[PurchaseFormDTO] : " + dto);
		
		dto.setRegistDate(new Date(System.currentTimeMillis()));
		dto.setValidation(1); // 디폴트 값 : 1
		dto.setAccountReflect(1);
		// 최초 생성시에만 id를 만들어주고 update 시엔 아이디 따로 생성하지 않음
		if(dto.getPurchaseId() == null || dto.getPurchaseId().length() == 0) {
			for(int i = 0; i < dto.getDetails().size(); i++) {
				dto.getDetails().get(i).setPurchaseDetailId("_" + i);
			}
		}
		System.out.println("[PurchaseFormDTO] : " + dto); // validation=1로 바뀐거 확인
		
		service.addPurchase(dto);
	}
	
	// 구매 목록
	@GetMapping(value = {"/purchase/purchaseList"})
	public List<PurchaseFormDTO> purchaseList() {
		return service.listPurchase();
	}
	
	// 구매 목록 수정
	@PutMapping(value = {"/purchase/purchaseForm"})
	public void purchaseUpdate(@RequestBody PurchaseFormDTO dto) {
		System.out.println("[PurchaseFormDTO] : " + dto);
		service.updatePurchase(dto);
	}
	
	// 구매 목록 삭제 => 삭제하는 대신 유효성을 0으로
	@PutMapping(value = {"/purchase/purchaseDelete"})
	public void purchaseDelete(@RequestBody PurchaseFormDTO dto) {
		System.out.println("[PurchaseFormDTO] : " + dto);
		dto.setPurchaseBookId(" ");
		dto.setValidation(0);
		dto.setAccountReflect(0);
		service.updatePurchase(dto);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	// 주문 폼 입력
	@PostMapping(value = {"/purchase/salesForm_Form"})
	public void salesForm_Form(@RequestBody SalesFormDTO dto) {
		System.out.println("[SalesFormDTO] : " + dto);
		
		dto.setValidation(1); // 디폴트 값 : 1
		// 최초 생성시에만 id를 만들어주고 update 시엔 아이디 따로 생성하지 않음
		if(dto.getSalesFormId() == null || dto.getSalesFormId().length() == 0) {
			for(int i = 0; i < dto.getDetails().size(); i++) {
				dto.getDetails().get(i).setSalesFormDetailId("_" + i);
			}
		}
		System.out.println("[SalesFormDTO] : " + dto); // validation=1로 바뀐거 확인
		
		service.addSalesForm(dto);
	}
	
	// 주문 목록
	@GetMapping(value = {"/purchase/salesForm_List"})
	public List<SalesFormDTO> salesFormList() {
		return service.listSalesForm();
	}
	
	// 주문 목록 수정
	@PutMapping(value = {"/purchase/salesForm_Form"})
	public void salesFormUpdate(@RequestBody SalesFormDTO dto) {
		System.out.println("[SalesFormDTO] : " + dto);
		service.updateSalesForm(dto);
	}
	
	// 주문 목록 삭제 => 삭제하는 대신 유효성을 0으로
	@PutMapping(value = {"/purchase/salesFormDelete"})
	public void salesFormDelete(@RequestBody SalesFormDTO dto) {
		System.out.println("[SalesFormDTO] : " + dto);
		dto.setValidation(0);
		service.updateSalesForm(dto);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	// 판매 폼 입력
	@PostMapping(value = {"/purchase/salesForm"})
	public void salesForm(@RequestBody SalesDTO dto) {
		System.out.println("[SalesDTO] : " + dto);
		
		dto.setRegistDate(new Date(System.currentTimeMillis()));
		dto.setValidation(1); // 디폴트 값 : 1
		dto.setAccountReflect(1);
		// 최초 생성시에만 id를 만들어주고 update 시엔 아이디 따로 생성하지 않음
		if(dto.getSalesId() == null || dto.getSalesId().length() == 0) {
			for(int i = 0; i < dto.getDetails().size(); i++) {
				dto.getDetails().get(i).setSalesDetailId("_" + i);
			}
		}
		System.out.println("[SalesDTO] : " + dto); // validation=1로 바뀐거 확인
		
		service.addSales(dto);
	}
	
	// 판매 목록
	@GetMapping(value = {"/purchase/salesList"})
	public List<SalesDTO> salesList() {
		return service.listSales();
	}
	
	// 판매 목록 수정
	@PutMapping(value = {"/purchase/salesForm"})
	public void salesUpdate(@RequestBody SalesDTO dto) {
		System.out.println("[SalesDTO] : " + dto);
		service.updateSales(dto);
	}
	
	// 판매 목록 삭제 => 삭제하는 대신 유효성을 0으로
	@PutMapping(value = {"/purchase/salesDelete"})
	public void salesDelete(@RequestBody SalesDTO dto) {
		System.out.println("[SalesDTO] : " + dto);
		dto.setSalesBookId(" ");
		dto.setValidation(0);
		dto.setAccountReflect(0);
		service.updateSales(dto);
	}
	
}
