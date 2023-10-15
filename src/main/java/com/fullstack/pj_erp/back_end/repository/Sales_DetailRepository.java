package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.pj_erp.back_end.dto.Sales_DetailDTO;

public interface Sales_DetailRepository extends JpaRepository<Sales_DetailDTO, String> {

}
