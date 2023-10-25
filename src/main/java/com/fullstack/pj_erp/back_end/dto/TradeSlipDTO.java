package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  // @Getter, @Setter, @ToString, @EqualsAndHashCode를 모두 포함	
@NoArgsConstructor  // 기본 생성자를 자동으로 추가 
@AllArgsConstructor  // 모든 필드 값을 파라미터로 받는 생성자를 추가
@Entity  // JPA 엔티티로 동작
@Table(name = "TRADESLIP")

public class TradeSlipDTO {

	@Id
	@Column(name = "SLIPID", length = 20)
	private String slipId;   // 전표번호, PK
	
	@Column(name = "CUSTOMERID")
	private String customerId;	// 거래처코드
	
	@OneToOne
	@JoinColumn(name = "CUSTOMERID", insertable = false, updatable = false)
	private CustomerDTO customer;  // 거래처코드를 FK로 등록
	
	@Column(name = "TRADETYPE")
	private String tradeType;   // 거래유형(입금, 출금) 
	
	@Column(name = "MONEY")
	private Long money;  // 금액 
	
	@Column(name = "TITLE", length = 200)
	private String title;   // 제목
	
	@Column(name = "VALIDATION")
	private int validation;  // 유효성 체크 (1이면 유효, 그렇지 않으면 무효)
	
	@Column(name = "REGDATE")
	private Date regDate;  // 등록일
	
	@PrePersist
	private void generateId() {
		if (slipId == null || slipId.length() == 0) {
			// 현재 날짜와 시간
			java.util.Date currentDate = new java.util.Date();

			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			// 데이터 베이스에 항목에 PK 컬럼이 VARCHAR2(20)으로 되있는지 확인
			// "DTO의 앞 두글자를 대문자로" + key 값
			this.slipId = "SL" + key; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
			System.out.println(slipId);
		}
	}
}
