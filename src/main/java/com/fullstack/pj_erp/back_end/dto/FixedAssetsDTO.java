package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Data
@Table(name = "FIXEDASSETS")
public class FixedAssetsDTO {

	@Id
	@Column(name = "ASSETNO") // pk
	private String assetNo;
	
	@Column(name = "DEPARTMENTID") // fk: DEPARTMENT 테이블 (생성 예정_10/16.월)
	private String departmentId;
	
	@Column(name = "ASSETNAME")
	private String assetName;

	@Column(name = "ASSETTYPE")
	private String assetType;
	
	@Column(name = "ASSETTITLE")
	private String assetTitle;
	
	@Column(name = "ASSETTOTAL")
	private int assetTotal;
	
	@Column(name = "ACQUISITIONCOST")
	private int acquistionCost;
	
	@Column(name = "REGISTDATE")
	private Date registDate;
	
	@Column(name = "DEPRECIATION")
	private String depreciation;
	
	@Column(name = "VALIDATION")
	private int validation;
	
	@PrePersist
	private void generateId() {
		// 현재 날짜&시간
		java.util.Date currentDate = new java.util.Date();
		
		// SimpleDateFormat 사용 >>> 날짜&시간을 yyMMddHHmmss 형식으로 포맷함
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
		String key = sdf.format(currentDate);
		
		// DB의 TABLE상, PK가 VARCHAR2(30) 설정 여부 확인
		this.assetNo = "FA" + key;
		System.out.println("ASSET NO: " + assetNo);
	}
}
