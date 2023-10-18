package com.fullstack.pj_erp.back_end.dto;

import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
@Table(name = "SALESFORMDETAIL")
public class SalesForm_DetailDTO {

	// 주문서 디테일 테이블 pk
	@Id
	@Column(name = "SALESFORMDETAILID")
	private String salesFormDetailId;
	
	// 주문서 id : SalesForm 테이블 FK
	@Column(name = "SALESFORMID")
	private String salesFormId;
	
	// 제품 코드 : Inventory 테이블 FK
	@Column(name = "PRODUCTIONITEMID")
	private String productionItemId;
	@OneToOne
	@JoinColumn(name = "PRODUCTIONITEMID", insertable = false, updatable = false)
	private InventoryDTO productionItem; 	
	
	// 규격
	@Column(name = "STANDARD")
	private String standard;
	
	// 수량
	@Column(name = "QUANTITY")
	private int quantity;
	
	// 가격
	@Column(name = "PRICE")
	private int price;
	
	@PrePersist
	private void generateId() {
		// 현재 날짜와 시간
		// 최초 에만 생성하고 없데이트 시에는 생성되면 안되므로 '_숫자' 최대숫자 2자리 를 확인하여 작을때만 시행
		if (salesFormDetailId.length() <= 3) {
			java.util.Date currentDate = new java.util.Date();
			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			salesFormDetailId = "SFD" + key + salesFormDetailId; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
			System.out.println("주문서D ID : " + salesFormDetailId);
		}
	}
}
