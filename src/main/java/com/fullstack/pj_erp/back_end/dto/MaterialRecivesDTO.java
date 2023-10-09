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
@Table(name = "MATERIALRECIVES")
public class MaterialRecivesDTO {
	@Id
	@Column(name = "MATERIALRECIVEID")
	private String materialReciveId;
	@Column(name = "PRODUCTIONITEMID")
	private String productionItemId;
	@Column(name = "WORKORDERID")
	private String workOrderId;
	@Column(name = "BUSINESSRELATIONID")
	private String businessRelationId;
	private Integer validation;
	@Column(name = "REGISTDATE")
	private Date registDate;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "MATERIALRECIVEID")
	private List<M_RecivesDetailsDTO> details;
	@OneToOne
	@JoinColumn(name = "PRODUCTIONITEMID", insertable = false, updatable = false)
	private ProductionItemsDTO productionItem;
	
	@PrePersist
	private void generateId() {
		// 현재 날짜와 시간
		java.util.Date currentDate = new java.util.Date();
		
		// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
        SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
        String key = sdf.format(currentDate);
        this.materialReciveId = "MR" + key; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
        System.out.println(materialReciveId);
    }
}
