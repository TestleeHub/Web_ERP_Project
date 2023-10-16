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
	// DB 관련 name = 은 모두 소문자로 쓰거나 모두 대문자로 써줘야하는데 가독성을 위해 대문자로 표시함
	@Id
	@Column(name = "MATERIALRECIVEID")
	private String materialReciveId;
	@Column(name = "PRODUCTIONITEMID")
	private String productionItemId;
	@Column(name = "WORKORDERID")
	private String workOrderId;
	@Column(name = "BUSINESSRELATIONID")
	private String businessRelationId;
	@OneToOne
	@JoinColumn(name = "BUSINESSRELATIONID", referencedColumnName = "CUSTOMERID", insertable = false, updatable = false)
	private CustomerDTO businessRelation;
	private Integer validation;
	@Column(name = "REGISTDATE")
	private Date registDate;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "MATERIALRECIVEID")
	private List<M_RecivesDetailsDTO> details;
	@OneToOne
	@JoinColumn(name = "PRODUCTIONITEMID", insertable = false, updatable = false)
	private ProductionItemsDTO productionItem;
	@OneToOne
	@JoinColumn(name = "WORKORDERID", insertable = false, updatable = false)
	private WorkOrderDTO workOrder;
	
	@PrePersist
	private void generateId() {
		if (materialReciveId == null || materialReciveId.length() == 0) {
			// 현재 날짜와 시간
			java.util.Date currentDate = new java.util.Date();

			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			// 데이터 베이스에 항목에 PK 컬럼이 VARCHAR2(20)으로 되있는지 확인
			// "DTO의 앞 두글자를 대문자로" + key 값
			this.materialReciveId = "MR" + key; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
			System.out.println(materialReciveId);
		}
	}
}
