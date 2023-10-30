package com.fullstack.pj_erp.back_end.service;

import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fullstack.pj_erp.back_end.dto.CustomerDTO;
import com.fullstack.pj_erp.back_end.dto.TradeHistoryDTO;
import com.fullstack.pj_erp.back_end.dto.TradeSlipDTO;
import com.fullstack.pj_erp.back_end.repository.CustomerRepository;
import com.fullstack.pj_erp.back_end.repository.TradeHistoryRepository;
import com.fullstack.pj_erp.back_end.repository.TradeSlipRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerService {
	
	private final CustomerRepository customerRepository;
	private final TradeSlipRepository tradeSlipRepository;
	private final TradeHistoryRepository tradeHistoryRepository;
	
	/* 거래처 관리 부분 시작 */
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
	/* 거래처 관리 부분 끝 */
	
	/* 입금/출금 관리 부분 시작 - 테이블은 같이, 입금/출금별 페이지는 다르게 준다.  */
	public List<TradeSlipDTO> getTradeSlip() {
		Sort sort = Sort.by(Sort.Order.desc("slipId"));
		//validation 체크
		Specification<TradeSlipDTO> filter = new EntityValidationFilter<TradeSlipDTO>().excludeEntitiesWithCondition();
		return tradeSlipRepository.findAll(filter, sort);
	}
	
	@Transactional
	public void addTradeSlip(TradeSlipDTO dto) {
		tradeSlipRepository.save(dto);
		
		// TradeSlip테이블에 입력한 데이터에 맞추어 TradeHistory테이블에 데이터를 생성하고 저장
		
		// TradeSlip테이블의 TradeType컬럼 항목의 값이 "입금"인 데이터라면, 
		// TradeSlip테이블의 Money컬럼 항목의 값 자체가 TradeHistory테이블에서는 Income컬럼에 입력되도록 반영
		
		// TradeSlip테이블의 TradeType컬럼 항목의 값이 "출금"인 데이터라면, 
		// TradeSlip테이블의 Money컬럼 항목의 값 자체가 TradeHistory테이블에서는 Expend컬럼에 입력되도록 반영
		TradeHistoryDTO tradeHistoryDTO = new TradeHistoryDTO();
		tradeHistoryDTO.setCustomerId(dto.getCustomerId());
		tradeHistoryDTO.setTitle(dto.getTitle());
		tradeHistoryDTO.setRegDate(new Date(System.currentTimeMillis()));
		
		if("입금".equals(dto.getTradeType())) {
			tradeHistoryDTO.setIncome(dto.getMoney());
		} else if ("출금".equals(dto.getTradeType())) {
			tradeHistoryDTO.setExpend(dto.getMoney());
		}
		
		tradeHistoryRepository.save(tradeHistoryDTO);
	}
	
//	@Transactional
//	public void updateTradeSlip(TradeSlipDTO dto) {
//		tradeSlipRepository.save(dto);
//		
//	}

	/* 입금/출금 관리 부분 끝 */
	
	/* 거래내역 관리 부분 시작 */
	public List<TradeHistoryDTO> getTradeHistory() {
		Sort sort = Sort.by(Sort.Order.desc("tradeHistoryId"));
		
		return tradeHistoryRepository.findAll(sort);
	}
	/* 거래내역 관리 부분 끝 */
}
