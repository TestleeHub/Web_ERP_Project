package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
@Table(name = "MONTHLYBALANCEDETAIL")
public class MonthlyBalanceDetailDTO {
	
	@Id // PK, 월계표 아이디
	@Column(name = "MONTHLYBALANCEDETAILID")
	private String monthlyBalanceDetailId;
	@Column(name = "MONTHLYTRIALID") // FK
	private String monthlyTrialId;
	
	@Column(name = "ACCOUNTINGTITLE")
	private String accountingTitle;
	@Column(name="DEBITSUBSTITUTION")
	private int debitSubstitution;
	@Column(name = "DEBITCASH")
	private int debitCash;
	@Column(name = "CREDITCASH")
	private int creditCash;
	@Column(name = "CREDITSUBSTITUTION")
	private int creditSubsitution;

	@PrePersist
	private void generateId() {
		// 현재 날짜와 시간
		java.util.Date currentDate = new java.util.Date();
		
		// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
		String key = sdf.format(currentDate);
		
		// 데이터베이스 항목에 PK 컬럼이 VARCHAR2(20)으로 되어있는지 확인
		this.monthlyBalanceDetailId = "MBD" + key + monthlyBalanceDetailId;
		System.out.println("monthly balance detail ID : " + monthlyBalanceDetailId);
	}

}
