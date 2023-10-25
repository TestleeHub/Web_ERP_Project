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
@Table(name = "SALESFORM")
public class SalesFormDTO {
	
	// 주문서 아이디
	@Id
	@Column(name = "SALESFORMID")
	private String salesFormId;
	
	// 거래처 코드
	@Column(name = "CUSTOMERID")
	private String customerId;
	@OneToOne
	@JoinColumn(name = "CUSTOMERID", insertable = false, updatable = false)
	private CustomerDTO customer; 	// Customer 테이블 FK
	
	// 유효성 체크
	@Column(name = "VALIDATION")
	private int validation;
	
	// 진행 상태
	@Column(name = "PROGRESS")
	private int progress;
	
	// 작성자(담당자)
	@Column(name = "EMPLOYEEID")
	private String employeeId;
	@OneToOne
	@JoinColumn(name = "EMPLOYEEID", insertable = false, updatable = false)
	private UserDTO employee; 	// Employee 테이블 FK
	
	// 납기일
	@Column(name = "DUEDATE")
	private Date dueDate;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "SALESFORMID")
	private List<SalesForm_DetailDTO> details;
	
	@PrePersist
	private void generateId() {
		if(salesFormId == null || salesFormId.length() == 0) {
			// 현재 날짜와 시간
			java.util.Date currentDate = new java.util.Date();
			
			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			
			// 데이터베이스 항목에 PK 컬럼이 VARCHAR2(20)으로 되어있는지 확인
			this.salesFormId = "SF" + key;
			System.out.println("주문서 ID : " + salesFormId);
		}
	}
}
