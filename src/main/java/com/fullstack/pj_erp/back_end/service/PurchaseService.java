package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.OrderFormDTO;
import com.fullstack.pj_erp.back_end.dto.PurchaseFormDTO;
import com.fullstack.pj_erp.back_end.dto.SalesDTO;
import com.fullstack.pj_erp.back_end.dto.SalesFormDTO;
import com.fullstack.pj_erp.back_end.repository.OrderFormRepository;
import com.fullstack.pj_erp.back_end.repository.PurchaseFormRepository;
import com.fullstack.pj_erp.back_end.repository.SalesFormRepository;
import com.fullstack.pj_erp.back_end.repository.SalesRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PurchaseService {

	private final OrderFormRepository repository;
	private final PurchaseFormRepository p_repository;
	private final SalesFormRepository sf_repository;
	private final SalesRepository s_repository;
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	public void addOrder(OrderFormDTO dto) {
		System.out.println("발주 입력 - addOrder");
//		System.out.println(repository);
		repository.save(dto);
	}
	
	public List<OrderFormDTO> listOrder() {
		System.out.println("발주 목록 - listOrder");
		
		Sort sort = Sort.by(Sort.Order.desc("orderFormId"));
		
		// validation 체크
		Specification<OrderFormDTO> filter = new EntityValidationFilter<OrderFormDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return repository.findAll(filter, sort);
	}
	
	public void updateOrder(OrderFormDTO dto) {
		System.out.println("발주 목록 수정/삭제 - updateOrder");
		repository.save(dto);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	public void addPurchase(PurchaseFormDTO dto) {
		System.out.println("구매 입력 - addPurchase");
		p_repository.save(dto);
	}
	
	public List<PurchaseFormDTO> listPurchase() {
		System.out.println("구매 목록 - listPurchase");
		
		Sort sort = Sort.by(Sort.Order.desc("purchaseId"));
		
		// validation 체크
		Specification<PurchaseFormDTO> filter = new EntityValidationFilter<PurchaseFormDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return p_repository.findAll(filter, sort);
	}
	
	public void updatePurchase(PurchaseFormDTO dto) {
		System.out.println("구매 목록 수정/삭제 - updatePurchase");
		p_repository.save(dto);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	public void addSalesForm(SalesFormDTO dto) {
		System.out.println("주문 입력 - addSalesForm");
		sf_repository.save(dto);
	}
	
	public List<SalesFormDTO> listSalesForm() {
		System.out.println("주문 목록 - listSalesForm");
		
		Sort sort = Sort.by(Sort.Order.desc("salesFormId"));
		
		// validation 체크
		Specification<SalesFormDTO> filter = new EntityValidationFilter<SalesFormDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return sf_repository.findAll(filter, sort);
	}
	
	public void updateSalesForm(SalesFormDTO dto) {
		System.out.println("주문 목록 수정/삭제 - updateSalesForm");
		sf_repository.save(dto);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	public void addSales(SalesDTO dto) {
		System.out.println("판매 입력 - addSales");
		s_repository.save(dto);
	}
	
	public List<SalesDTO> listSales() {
		System.out.println("판매 목록 - listSales");
		
		Sort sort = Sort.by(Sort.Order.desc("salesId"));
		
		// validation 체크
		Specification<SalesDTO> filter = new EntityValidationFilter<SalesDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return s_repository.findAll(filter, sort);
	}
	
	public void updateSales(SalesDTO dto) {
		System.out.println("판매 목록 수정/삭제 - updateSales");
		s_repository.save(dto);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
}
