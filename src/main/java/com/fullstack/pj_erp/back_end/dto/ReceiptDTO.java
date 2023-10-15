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

// 정요셉 - ReceiptDTO

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Data
@Table(name = "RECEIPT")
public class ReceiptDTO {
	
	// DB 관련 name = 은 모두 소문자로 쓰거나 모두 대문자로 써줘야하는데 가독성을 위해 대문자로 표시함
	@Id
	@Column(name = "RECEIPTID")
	private String receiptId;    		// 출고 코드
	@Column(name = "RECEIPTDATE")
	private Date receiptDate;			// 일자
	@Column(name = "STORAGEID")
	private String storageId;    		// 창고 코드
	@Column(name = "PRODUCTIONITEMID")
	private String productionItemId;    // 제품 코드
	@Column(name = "AMOUNT")
	private Integer amount;    			// 수량 합계
	@Column(name = "CLIENT")
	private String client;    			// 거래처명
	private Integer validation;    		// 유효성 체크
	
	
	@PrePersist
	private void generateId() {
		if (receiptId == null || storageId.length() == 0) {
			// 현재 날짜와 시간
			java.util.Date currentDate = new java.util.Date();

			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			// 데이터 베이스에 항목에 PK 컬럼이 VARCHAR2(20)으로 되있는지 확인
			// "DTO의 앞 두글자를 대문자로" + key 값
			this.receiptId = "RE" + key; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
			System.out.println(receiptId);
		}
	}
	
}
