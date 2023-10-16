package com.fullstack.pj_erp.back_end.dto;
import java.sql.Date;

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
@Table(name = "employee")
public class UserDTO {
	@Id
	@Column(name = "EMPLOYEEID")
	private String employeeId;
	private String password;
	private String name;
	@Column(name = "FOREIGNNAME")
	private String foreignName;
	@Column(name = "SOCIALNUM")
	private long socialNum;
	@Column(name = "JOINDATE")
	private Date joinDate;
	private String rank;
	private String position;
	@Column(name = "LEAVEDATE")
	private Date leaveDate;
	@Column(name = "LEAVEREASON")
	private String leaveReason;
	private Integer phone;
	@Column(name = "EMAIL")
	private String email;
	@Column(name = "DEPARTMENTID")
	private String departmentId;
	@Column(name = "BANKCODE")
	private String bankCode;
	private String account;
	@Column(name = "ACCOUNTNAME")
	private String accountName;
	@Column(name = "POSTMAIL")
	private Integer postMail;
	private String address;
	private String image;
	private Integer salary;
	private Integer validation;
	private Integer authority;
	private String token;
}
