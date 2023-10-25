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
@Table(name = "TRADEHISTORY")
public class TradeHistoryDTO {

    @Id
    @Column(name = "TRADEHISTORYID", length = 8)
    private String tradeHistoryId;  // 거래내역 Id, PK
    
    @Column(name = "CUSTOMERID")
	private String customerId;	// 거래처코드
    
    @OneToOne
    @JoinColumn(name = "CUSTOMERID", insertable = false, updatable = false)
    private CustomerDTO customer;  // 거래처코드를 FK로 등록
    
    @Column(name = "TITLE", length = 200)
    private String title;  // 제목
    
    @Column(name = "INCOME")
    private Long income;  // 거래 수입금
    
    @Column(name = "EXPEND")
    private Long expend;  // 거래 지줄금
    
    @Column(name = "REGDATE")
    private Date regDate;  // 등록일
    
    @PrePersist
	private void generateId() {
		if (tradeHistoryId == null || tradeHistoryId.length() == 0) {
			// 현재 날짜와 시간
			java.util.Date currentDate = new java.util.Date();

			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			// 데이터 베이스에 항목에 PK 컬럼이 VARCHAR2(8)으로 되있는지 확인
			// "DTO의 앞 두글자를 대문자로" + key 값
			this.tradeHistoryId = "HT" + key; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
			System.out.println(tradeHistoryId);
		}
	}
}