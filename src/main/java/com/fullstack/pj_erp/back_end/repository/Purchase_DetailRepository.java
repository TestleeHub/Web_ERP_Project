package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.pj_erp.back_end.dto.Purchase_DetailDTO;

public interface Purchase_DetailRepository extends JpaRepository<Purchase_DetailDTO, String> {

}
