package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fullstack.pj_erp.back_end.dto.MaterialDTO;

// 정요셉 - MaterialRepository

public interface MaterialRepository extends JpaRepository<MaterialDTO, String>, JpaSpecificationExecutor<MaterialDTO>{

}
