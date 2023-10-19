package com.fullstack.pj_erp.back_end.dto;

import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  // @Getter, @Setter, @ToString, @EqualsAndHashCode를 모두 포함     
@NoArgsConstructor  // 기본 생성자를 자동으로 추가 
@AllArgsConstructor  // 모든 필드 값을 파라미터로 받는 생성자를 추가
@Entity  // JPA 엔티티로 동작
@Table(name = "CUSTOMER")
public class CustomerDTO {

	@Id
	@Column(name = "CUSTOMERID")
	private String customerId;  // 거래처코드, PK
	
	@Column(name = "NAME")
	private String name;  // 거래처명
	
	@Column(name = "CEONAME")
    private String ceoName;  // 대표자명
    
	@Column(name = "PHONE")
    private String phone;  // 전화번호
	
	@Column(name = "FAXNUMBER")
    private String faxNumber;  // 팩스번호
	
	@Column(name = "TYPE")
    private String type;  // 업종
	
	@Column(name = "VALIDATION")
    private int validation;  // 유효성 체크 (1이면 유효, 그렇지 않으면 무효)
	
	@Column(name = "BANK")
    private String bank;  // 은행코드
	
	@Column(name = "ACCOUNT")
    private Long account;  // 계좌번호
	
	@Column(name = "POSTMAIL")
    private Integer postMail;  // 우편번호
	
	@Column(name = "ADDRESS")
    private String address;  // 상세주소
	
	@PrePersist
	private void generateId() {
		if (customerId == null || customerId.length() == 0) {
			// 현재 날짜와 시간
			java.util.Date currentDate = new java.util.Date();

			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			// 데이터 베이스에 항목에 PK 컬럼이 VARCHAR2(8)으로 되있는지 확인
			// "DTO의 앞 두글자를 대문자로" + key 값
			this.customerId = "CT" + key; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
			System.out.println(customerId);
		}
	}
}