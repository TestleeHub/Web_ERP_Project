package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fullstack.pj_erp.back_end.dto.StorageDTO;

// 정요셉 - StorageRepository

public interface StorageRepository extends JpaRepository<StorageDTO, String>, JpaSpecificationExecutor<StorageDTO>{

}
