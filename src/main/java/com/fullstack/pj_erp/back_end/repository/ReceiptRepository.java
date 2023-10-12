package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fullstack.pj_erp.back_end.dto.ReceiptDTO;

// 정요셉 - ReceiptRepository

public interface ReceiptRepository extends JpaRepository<ReceiptDTO, String>, JpaSpecificationExecutor<ReceiptDTO>{

}
