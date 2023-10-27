package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
@Table(name = "MONTHLYTRIALBALANCE")
public class MonthlyTrialBalanceDTO {
	
	@Id // 월계표 아이디
	@Column(name = "MONTHLYTRIALID")
	private String monthlyTrialId;
	
	@Column(name = "VALIDATION")
	private int validation;
	@Column(name = "REGISTDATE")
	private Date registDate;
	
	@OneToMany(cascade = CascadeType.ALL) // 월계표 생성을 위한 두 테이블 join용도
	@JoinColumn(name = "MONTHLYTRIALID")
	private List<MonthlyBalanceDetailDTO> details = new ArrayList<MonthlyBalanceDetailDTO>();
	
	@Transient
	private int debitTotal;
	
	@Transient
	private int creditTotal;	

	@PrePersist
	private void generateId() {
		// 현재 날짜와 시간
		java.util.Date currentDate = new java.util.Date();
		
		// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
		String key = sdf.format(currentDate);
		
		// 데이터베이스 항목에 PK 컬럼이 VARCHAR2(20)으로 되어있는지 확인
		this.monthlyTrialId = "MTB" + key;
		System.out.println("월계표 ID : " + monthlyTrialId);
	}

}
