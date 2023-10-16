package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.PurchaseFormDTO;
import com.fullstack.pj_erp.back_end.dto.SalesDTO;
import com.fullstack.pj_erp.back_end.repository.PurchaseFormRepository;
import com.fullstack.pj_erp.back_end.repository.SalesRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AccountService {
	
	private final PurchaseFormRepository p_repository; // 구매장 DAO 선언 및 객체 생성
	private final SalesRepository s_repository;
	
	public List<PurchaseFormDTO> listPurchase() {
		System.out.println("[회계] 매입장 목록 - listPurchase");
		
		Sort sort = Sort.by(Sort.Order.desc("dueDate"));
		
		// validation 체크
		Specification<PurchaseFormDTO> filter = new EntityValidationFilter<PurchaseFormDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return p_repository.findAll(filter, sort);
	}
	
	public List<SalesDTO> listSales() {
		System.out.println("[회계] 매출장 목록 - listSales");
		
		Sort sort = Sort.by(Sort.Order.desc("dueDate"));
		
		// validation 체크
		Specification<SalesDTO> filter = new EntityValidationFilter<SalesDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return s_repository.findAll(filter, sort);
	}
}
