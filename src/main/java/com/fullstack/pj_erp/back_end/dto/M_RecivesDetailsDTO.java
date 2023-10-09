package com.fullstack.pj_erp.back_end.dto;

import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
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
@Table(name = "RECIVESDETAILS")
public class M_RecivesDetailsDTO {
	@Id
	@Column(name = "RECIVESDETAILID")
	private String recivesDetailId;
//	@Column(name = "MATERIALRECIVEID")
//	private String materialReciveId;
	@Column(name = "METERIALID")
	private String meterialId;
	private String name;
	@Column(name = "STORAGEID")
	private String storageId;
	private Integer quantity;
	
	@PrePersist
	private void generateId() {
		// 현재 날짜와 시간
		java.util.Date currentDate = new java.util.Date();
		
		// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
        SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
        String key = sdf.format(currentDate);
        recivesDetailId = "RD" + key + recivesDetailId; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
        System.out.println(recivesDetailId);
    }
}
