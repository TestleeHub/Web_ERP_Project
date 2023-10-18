package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Data
@Table(name = "salary")
public class SalaryDTO {
	@Id
	@Column(name = "EMPLOYEEID")
    private String employeeId;		// 사원번호
	@Column(name = "OVERTIMEPAY")
    private Integer overtimePay;		// 야근수당	
	@Column(name = "WEEKENDPAY")
    private Integer weekendPay;			// 주말근무수당
	@Column(name = "VACATIONPAY")
    private Integer vacationPay;		//연차수당
	@Column(name = "PAYMENTDATE")
    private Date paymentDate;		// 지급일
	@Column(name = "VALIDATION")
    private Integer validation;			// 유효성
}
