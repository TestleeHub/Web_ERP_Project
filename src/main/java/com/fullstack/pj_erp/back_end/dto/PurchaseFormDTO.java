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

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Data
@Table(name = "Purchase")
public class PurchaseFormDTO {
	
	// 구매 아이디
	@Id
	@Column(name = "PURCAHSEID")
	private String purcahseId;
	// 거래처 코드
	@Column(name = "CUSTOMERID")
	private String customerId;
	// 유효성 체크
	@Column(name = "VALIDATION")
	private int validation;
	// 회계 반영 여부
	@Column(name = "ACCOUNTREFLECT")
	private int accountReflect;
	// 작성자(담당자)
	@Column(name = "EMPLOYEEID")
	private int employeeId;
	// 납기일
	@Column(name = "DUEDATE")
	private Date dueDate;
	// 구매장 아이디
	@Column(name = "PURCHASEBOOKID")
	private int purchaseBookId;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "PURCAHSEID")
	private List<Purchase_DetailDTO> details;
	
//	@OneToOne
//	@JoinColumn(name = "CUSTOMERID")
//	private CustomerDTO customerId; 	// Customer 테이블 FK
	
//	@OneToOne
//	@JoinColumn(name = "EMPLOYEEID")
//	private EmployeeDTO employeeId; 	// Employee 테이블 FK
	
	@PrePersist
	private void generateId() {
		// 현재 날짜와 시간
		java.util.Date currentDate = new java.util.Date();
		
		// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
		String key = sdf.format(currentDate);
		
		// 데이터베이스 항목에 PK 컬럼이 VARCHAR2(20)으로 되어있는지 확인
		this.purcahseId = "PU" + key;
		System.out.println("구매 ID : " + purcahseId);
	}
}
