package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
	@Column(name = "ATTRIBUTIONYEAR")
	private Date attributionYear; 	// 귀속연월
	@Column(name = "EMPLOYEEID")
    private String employeeId;		// 사원번호
	@Column(name = "OVERTIMEPAY")
    private int overtimePay;		// 야근수당	
	@Column(name = "WEEKENDPAY")
    private int weekendPay;			// 주말근무수당
	@Column(name = "VACATIONPAY")
    private int vacationPay;		//연차수당
	@Column(name = "INCOMETAX")
    private int incomeTax;			//소득세
	@Column(name = "RESIDENTTAX")
    private int residentTax;		// 주민세
	@Column(name = "NATIONALPENSION")
    private int nationalPension;	// 국민연금
	@Column(name = "HEALTHINSURANCE")
    private int healthInsurance;	// 건강보험
	@Column(name = "PAYMENT_DATE")
    private Date payment_date;		// 지급일
	@Column(name = "VALIDATION")
    private int validation;			// 유효성
}
