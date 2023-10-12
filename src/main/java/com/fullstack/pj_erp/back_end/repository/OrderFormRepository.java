package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fullstack.pj_erp.back_end.dto.OrderFormDTO;

// JpaSpecificationExecutor => 동적 쿼리를 생성·실행이 가능해짐
public interface OrderFormRepository extends JpaRepository<OrderFormDTO, String>, JpaSpecificationExecutor<OrderFormDTO> {
	
}
