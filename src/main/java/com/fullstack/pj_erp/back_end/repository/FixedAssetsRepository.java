package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fullstack.pj_erp.back_end.dto.FixedAssetsDTO;

public interface FixedAssetsRepository extends 
	JpaRepository<FixedAssetsDTO, String>, JpaSpecificationExecutor<FixedAssetsDTO> {
}
