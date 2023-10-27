package com.fullstack.pj_erp.back_end.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fullstack.pj_erp.back_end.dto.AttendanceDTO;

public interface HumanAttendanceRepository extends JpaRepository<AttendanceDTO, String>, JpaSpecificationExecutor<AttendanceDTO>{
	List<AttendanceDTO> findByEmployeeId(String employeeId);
}
