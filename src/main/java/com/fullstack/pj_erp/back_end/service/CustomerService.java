package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.CustomerDTO;
import com.fullstack.pj_erp.back_end.dto.TradeSlipDTO;
import com.fullstack.pj_erp.back_end.repository.CustomerRepository;
import com.fullstack.pj_erp.back_end.repository.TradeSlipRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerService {
	
	private final CustomerRepository customerRepository;
	private final TradeSlipRepository tradeSlipRepository;
	
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
	
	/* 입금 관리 부분 시작 - 테이블은 같이, 입금/출금별 페이지는 다르게 준다.  */
	public List<TradeSlipDTO> getTradeSlip() {
		Sort sort = Sort.by(Sort.Order.desc("slipId"));
		//validation 체크
		Specification<TradeSlipDTO> filter = new EntityValidationFilter<TradeSlipDTO>().excludeEntitiesWithCondition();
		return tradeSlipRepository.findAll(filter, sort);
	}
	
	public void addTradeSlip(TradeSlipDTO dto) {
		tradeSlipRepository.save(dto);
	}

	public void updateTradeSlip(TradeSlipDTO dto) {
		tradeSlipRepository.save(dto);
	}
	
	/* 입금 관리 부분 끝 */
	
	/* 거래내역 관리 부분 시작 */
	
	// 거리처 코드별, 전표번호별, 거래내역 ID별, 기업별, 가격별 오름차순 혹은 내림차순이 가능하게 해야 할 것. 
	
	/* 거래내역 관리 부분 끝 */

}
