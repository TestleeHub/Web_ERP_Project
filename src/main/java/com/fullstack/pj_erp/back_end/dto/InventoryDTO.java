package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;
// import java.text.SimpleDateFormat;
// import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
// import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

// 정요셉 - InventoryDTO

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Data
@Table(name = "INVENTORY")
public class InventoryDTO {
	// DB 관련 name = 은 모두 소문자로 쓰거나 모두 대문자로 써줘야하는데 가독성을 위해 대문자로 표시함
	@Id
	@Column(name = "PRODUCTIONITEMID")
	private String productionItemId;    // 제품 코드
	
	@OneToOne
	@JoinColumn(name = "PRODUCTIONITEMID", referencedColumnName = "PRODUCTIONITEMID", insertable = false, updatable = false)
	private ProductionItemsDTO ProductionItem;
	
	@Column(name = "REGISTDATE")
	private Date registDate;			// 등록일
	
	@Column(name = "MANAGER")
	private String managerId;				// 담당자
	@OneToOne
	@JoinColumn(name = "MANAGER", referencedColumnName = "EMPLOYEEID", insertable = false, updatable = false)
	private UserDTO manager;
	
	@Column(name = "QUANTITY")
	private Integer quantity;			// 수량
	@Column(name = "RECORD")
	private Date record;				// 이력 - 연우님한테 여쭤보기(이력이 필요한지)
	
	@Column(name = "STORAGEID")
	private String storageId;			// 창고 코드
	@OneToOne
	@JoinColumn(name = "STORAGEID", insertable = false, updatable = false)
	private StorageDTO storage;

	private Integer validation;			// 유효성 체크

	
//	@PrePersist
//	private void generateId() {
//		if(productionItemId ==  null) {
//			// 현재 날짜와 시간
//			java.util.Date currentDate = new java.util.Date();
//
//			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
//			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
//			String key = sdf.format(currentDate);
//
//			// 데이터 베이스에 항목에 PK 컬럼이 VARCHAR2(20)으로 되있는지 확인
//			// "DTO의 앞 두글자를 대문자로" + key 값
//			this.productionItemId = "MR" + key; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
//			System.out.println(productionItemId);
//
//		}
//	}

}
