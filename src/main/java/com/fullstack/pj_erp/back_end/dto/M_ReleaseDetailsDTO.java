package com.fullstack.pj_erp.back_end.dto;

import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Data
@Table(name = "RELEASESDETAILS")
public class M_ReleaseDetailsDTO {
	// DB 관련 name = 은 모두 소문자로 쓰거나 모두 대문자로 써줘야하는데 가독성을 위해 대문자로 표시함
	@Id
	@Column(name = "RELEASEDETAILID")
	private String releaseDetailId;
//	@Column(name = "MATERIALRECIVEID")
//	private String materialReciveId;
	@Column(name = "MATERIALID")
	private String materialId;
	private String name;
	@Column(name = "STORAGEID")
	private String storageId;
	@OneToOne
	@JoinColumn(name = "MATERIALID", insertable = false, updatable = false)
	private MaterialDTO material;
	@OneToOne
	@JoinColumn(name = "STORAGEID", insertable = false, updatable = false)
	private StorageDTO storage;
	private Integer quantity;

	@PrePersist
	private void generateId() {
		// 현재 날짜와 시간
		// 최초 에만 생성하고 없데이트 시에는 생성되면 안되므로 '_숫자' 최대숫자 2자리 를 확인하여 작을때만 시행
		if (releaseDetailId.length() <= 3) {
			java.util.Date currentDate = new java.util.Date();
			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			releaseDetailId = "RLD" + key + releaseDetailId; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
			System.out.println(releaseDetailId);
		}
	}
}
