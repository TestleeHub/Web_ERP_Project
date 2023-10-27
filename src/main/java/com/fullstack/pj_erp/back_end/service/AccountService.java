package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.DailyTrialBalanceDTO;
import com.fullstack.pj_erp.back_end.dto.FixedAssetsDTO;
import com.fullstack.pj_erp.back_end.dto.MonthlyTrialBalanceDTO;
import com.fullstack.pj_erp.back_end.dto.PurchaseFormDTO;
import com.fullstack.pj_erp.back_end.dto.SalesDTO;
import com.fullstack.pj_erp.back_end.repository.DailyTrialBalanceRepository;
import com.fullstack.pj_erp.back_end.repository.FixedAssetsRepository;
import com.fullstack.pj_erp.back_end.repository.MonthlyTrialBalanceRepository;
import com.fullstack.pj_erp.back_end.repository.PurchaseFormRepository;
import com.fullstack.pj_erp.back_end.repository.SalesRepository;
import com.fullstack.pj_erp.back_end.util.EntityDailyDataFilter;
import com.fullstack.pj_erp.back_end.util.EntityMonthlyDataFilter;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AccountService {

	private final PurchaseFormRepository p_repository;
	private final SalesRepository s_repository;
	private final FixedAssetsRepository f_repository;
	private final DailyTrialBalanceRepository d_repository;
	private final MonthlyTrialBalanceRepository m_repository;

	///////////////////////////////////////////////////////////////////////////////////////////////////

	public List<PurchaseFormDTO> listPurchase() {
		System.out.println("[회계] 매입장 목록 - listPurchase");

		Sort sort = Sort.by(Sort.Order.desc("registDate"));

		// validation 체크
		Specification<PurchaseFormDTO> filter = 
				new EntityValidationFilter<PurchaseFormDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return p_repository.findAll(filter, sort);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////

	public List<SalesDTO> listSales() {
		System.out.println("[회계] 매출장 목록 - listSales");

		Sort sort = Sort.by(Sort.Order.desc("registDate"));

		// validation 체크
		Specification<SalesDTO> filter = 
				new EntityValidationFilter<SalesDTO>().excludeEntitiesWithCondition();
//		System.out.println(filter);
//		System.out.println(sort);
		return s_repository.findAll(filter, sort);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////

	public List<PurchaseFormDTO> getMonthlyPurchaseData() {
		System.out.println("[회계] 월 단위, 구매 데이타 - getMonthlyPurchaseData");

		Sort sort = Sort.by(Sort.Order.desc("registDate"));

		// 직전 한달간의 구매 데이터 체크
		Specification<PurchaseFormDTO> filter = 
				new EntityMonthlyDataFilter<PurchaseFormDTO>().excludeEntitiesWithCondition();
		return p_repository.findAll(filter, sort);

	}

	public List<SalesDTO> getMonthlySaleData() {
		System.out.println("[회계] 월 단위, 판매 데이타 - getMonthlySaleData");

		Sort sort = Sort.by(Sort.Order.desc("registDate"));

		// 직전 한달간의 구매 데이터 체크
		Specification<SalesDTO> filter = 
				new EntityMonthlyDataFilter<SalesDTO>().excludeEntitiesWithCondition();
		
		return s_repository.findAll(filter, sort);

	}

	public List<PurchaseFormDTO> getDailyPurchaseData() {
		System.out.println("[회계] 일 단위, 구매 데이타 - getDailyPurchaseData");

		Sort sort = Sort.by(Sort.Order.desc("registDate"));

		// 직전 한달간의 구매 데이터 체크
		Specification<PurchaseFormDTO> filter = 
				new EntityDailyDataFilter<PurchaseFormDTO>().excludeEntitiesWithCondition();
		
		return p_repository.findAll(filter, sort);

	}

	public List<SalesDTO> getDailySaleData() {
		System.out.println("[회계] 일 단위, 판매 데이타 - getDailySaleData");

		Sort sort = Sort.by(Sort.Order.desc("registDate"));

		// 직전 한달간의 구매 데이터 체크
		Specification<SalesDTO> filter = 
				new EntityDailyDataFilter<SalesDTO>().excludeEntitiesWithCondition();
		
		return s_repository.findAll(filter, sort);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////

	public List<DailyTrialBalanceDTO> listDailyTrialBalance(){
		System.out.println("[회계] 일계표 목록 - listdailyTrialBalance(dto)");
		
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		
		// validation 확인
		Specification<DailyTrialBalanceDTO> filter = 
				new EntityValidationFilter<DailyTrialBalanceDTO>().excludeEntitiesWithCondition();
		
		return d_repository.findAll(filter, sort);
	}
	
	public List<MonthlyTrialBalanceDTO> listMonthlyTrialBalance(){
		System.out.println("[회계] 월계표 목록 - listMonthlyTrialBalance(dto)");
		
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		
		// validation 확인
		Specification<MonthlyTrialBalanceDTO> filter = 
				new EntityValidationFilter<MonthlyTrialBalanceDTO>().excludeEntitiesWithCondition();
		
		return m_repository.findAll(filter, sort);
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////

	public void addFixedAsset(FixedAssetsDTO dto) {
		System.out.println("[회계] 고정자산 등록 - addFixedAsset(dto)");
		f_repository.save(dto);
	}

	public void updateFixedAsset(FixedAssetsDTO dto) {
		System.out.println("[회계] 고정자산 수정/삭제 - updateFixedAsset(dto)");
		f_repository.save(dto);
	}

	public List<FixedAssetsDTO> listFixedAssets() {
		System.out.println("[회계] 고정자산 목록 - listFixedAssets()");

		Sort sort = Sort.by(Sort.Order.asc("registDate")); // 등록일 올림차순 정렬

		Specification<FixedAssetsDTO> filter = 
				new EntityValidationFilter<FixedAssetsDTO>().excludeEntitiesWithCondition();
		
		return f_repository.findAll(filter, sort);
	}
}
