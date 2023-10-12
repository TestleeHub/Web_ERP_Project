package com.fullstack.pj_erp.back_end.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.pj_erp.back_end.dto.Order_DetailDTO;

public interface Order_DetailRepository extends JpaRepository<Order_DetailDTO, String> {

}
