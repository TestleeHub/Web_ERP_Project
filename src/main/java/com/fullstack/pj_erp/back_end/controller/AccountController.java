package com.fullstack.pj_erp.back_end.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.dto.DailyBalanceDetailDTO;
import com.fullstack.pj_erp.back_end.dto.DailyTrialBalanceDTO;
import com.fullstack.pj_erp.back_end.dto.FixedAssetsDTO;
import com.fullstack.pj_erp.back_end.dto.MonthlyBalanceDetailDTO;
import com.fullstack.pj_erp.back_end.dto.MonthlyTrialBalanceDTO;
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
	
	// 매입장 목록
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
	
	// 매출장 목록
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
	
	// 일계표 목록
	@RequestMapping(value = "/account/dailyTrialBalance")
	public List<DailyTrialBalanceDTO> dailyTrialBalanceList(){
		List<DailyTrialBalanceDTO> dailyTrialBalanceList = service.listDailyTrialBalance();
		
		for(DailyTrialBalanceDTO dto: dailyTrialBalanceList) {
			int debitSum = 0;
			int creditSum = 0;
			
			for(DailyBalanceDetailDTO detail: dto.getDetails()) {
				debitSum += detail.getDebitCash() + detail.getDebitSubstitution();
			}
			for(DailyBalanceDetailDTO detail: dto.getDetails()) {
				creditSum += detail.getCreditCash() + detail.getCreditSubsitution();
			}
			
			dto.setDebitTotal(debitSum);
			dto.setCreditTotal(creditSum);
		}
		System.out.println(dailyTrialBalanceList);
		
		return dailyTrialBalanceList;
	}
	
	// 월계표 목록
	@RequestMapping(value = "/account/monthlyTrialBalance")
	public List<MonthlyTrialBalanceDTO> monthlyTrialBalanceList(){
		List<MonthlyTrialBalanceDTO> monthlyTrialBalanceList = service.listMonthlyTrialBalance();
		
		for(MonthlyTrialBalanceDTO dto: monthlyTrialBalanceList) {
			int debitSum = 0;
			int creditSum = 0;
			
			for(MonthlyBalanceDetailDTO detail: dto.getDetails()) {
				debitSum += detail.getDebitCash() + detail.getDebitSubstitution();
			}
			for(MonthlyBalanceDetailDTO detail: dto.getDetails()) {
				creditSum += detail.getCreditCash() + detail.getCreditSubsitution();
			}
			dto.setDebitTotal(debitSum);
			dto.setCreditTotal(creditSum);
		}
		System.out.println(monthlyTrialBalanceList);
		
		return monthlyTrialBalanceList;
	}
	
	// 고정자산 등록
	@RequestMapping(value= {"/account/fixedAssetForm"})
	public void fixedAssetsAdd(@RequestBody FixedAssetsDTO dto) {
		System.out.println("[FixedAssetsDTO]: " + dto);
		
		// dto.setRegistDate(new Date(System.currentTimeMillis()));
		dto.setValidation(1); // default = 1
		
		System.out.println("[FixedAssetsDTO] " + dto); // validation = 1 확인하기
		
		service.addFixedAsset(dto);
	}
	
	// 고정자산 목록
	@RequestMapping(value= {"/account/fixedAssetsList"})
	public List<FixedAssetsDTO> fixedAssetsList() {
		return service.listFixedAssets();
	}
	
	// 고정자산 수정
	@RequestMapping(value= {"/account/fixedAssetUpdate"}) // url 수정하기 >> fixedAssetsForm
	public void fixedAssetUpdate(@RequestBody FixedAssetsDTO dto) {
		System.out.println("[FixedAssetsDTO]: " + dto);
		System.out.println();
	}
	
	// 고정자산 삭제
	@RequestMapping(value= {"/account/fixedAssetDelete"})
	public void fixedAssetDelete(@RequestBody FixedAssetsDTO dto) {
		System.out.println("[FixedAssetsDTO]: " + dto);
		dto.setValidation(0); // validation = 1 → 0
		service.updateFixedAsset(dto);
	}
}
