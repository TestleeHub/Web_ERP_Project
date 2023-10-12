package com.fullstack.pj_erp.back_end.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
@Table(name = "STORAGE")
public class StorageDTO {
	//DB 관련 name = 은 모두 소문자로 쓰거나 모두 대문자로 써줘야하는데 가독성을 위해 대문자로 표시함
	@Id
	@Column(name = "STORAGEID")    
	private Integer storageId;	   // 창고 코드
	@Column(name = "STORAGENAME")  
	private String storageName;	   // 창고명
	@Column(name = "CATEGORY")
	private String category;	   // 구분
	private Integer validation;    // 유효성 체크
}
