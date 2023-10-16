package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Data
@Table(name = "SALES")
public class SalesDTO {

	@Id
	@Column(name = "SALESID")
	private String salesId;
	
	@Column(name = "CUSTOMERID")
	private String customerId;
	
	@Column(name = "VALIDATION")
	private int validation;
	
	@Column(name = "ACCOUNTREFLECT")
	private int accountReflect;
	
	@Column(name = "EMPLOYEEID")
	private String employeeId;
	
	@Column(name = "DUEDATE")
	private Date dueDate;
	
	@Column(name = "SALESBOOKID")
	private String salesBookId;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "SALESID")
	private List<Sales_DetailDTO> details;
	
	@Transient
	private int totalPrice;
	
	@Transient
	private int vat;
	
//	@OneToOne
//	@JoinColumn(name = "CUSTOMERID")
//	private CustomerDTO customerId; 		// Customer 테이블 FK
	
//	@OneToOne
//	@JoinColumn(name = "EMPLOYEEID")
//	private UserDTO employeeId; 			// Employee 테이블 FK
	
//	@OneToOne
//	@JoinColumn(name = "SALESBOOKID")
//	private PurchaseBook salesBookId; 		// PurchaseBook 테이블 FK
	
	@PrePersist
	private void generateId() {
		// 현재 날짜와 시간
		java.util.Date currentDate = new java.util.Date();
		
		// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
		String key = sdf.format(currentDate);
		
		// 데이터베이스 항목에 PK 컬럼이 VARCHAR2(20)으로 되어있는지 확인
		this.salesId = "SA" + key;
		System.out.println("판매 ID : " + salesId);
		
		this.salesBookId = "SB" + key;
		System.out.println("판매장 ID : " + salesBookId);
	}
}
