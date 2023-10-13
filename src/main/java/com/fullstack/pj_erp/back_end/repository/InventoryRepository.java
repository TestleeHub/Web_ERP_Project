package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fullstack.pj_erp.back_end.dto.InventoryDTO;

// 정요셉 - InventoryRepository

public interface InventoryRepository extends JpaRepository<InventoryDTO, String>, JpaSpecificationExecutor<InventoryDTO>{
	
}
