package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
    
    @OneToOne
    @JoinColumn(name = "CUSTOMERID", referencedColumnName = "customerId", nullable = false)
    private CustomerDTO customer;  // 거래처코드, FK
    
    @Column(name = "TITLE", length = 200)
    private String title;  // 제목
    
    @Column(name = "INCOME")
    private Long income;  // 거래 수입금
    
    @Column(name = "EXPEND")
    private Long expend;  // 거래 지줄금
    
    @Column(name = "REGDATE")
    private Date regDate;  // 등록일
}