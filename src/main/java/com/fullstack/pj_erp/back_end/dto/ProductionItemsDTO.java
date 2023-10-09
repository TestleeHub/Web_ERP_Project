package com.fullstack.pj_erp.back_end.dto;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
@Table(name = "PRODUCTIONITEMS")
public class ProductionItemsDTO {
	@Id
	@Column(name = "PRODUCTIONITEMID")
	private String productionItemId;
	private String process;
	private String name;
	private String standard;
	@Column(name = "FACTORYID")
	private String factoryId;
	@Column(name = "STORAGEID")
	private String storageId;
	private Integer validation;
	@Column(name = "REGISTDATE")
	private Date registDate;
}
