package com.fullstack.pj_erp.back_end.dto;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
@Table(name = "employee")
public class UserDTO {
	@Id
	@Column(name = "EMPLOYEEID")
	private String employeeId;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "EMPLOYEEID", referencedColumnName = "EMPLOYEEID", insertable = false, updatable = false)
	private SalaryDTO salar;
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
	@Transient
	private String role;
	@Transient
	private int dependentFamiliyPay; // 부양가족수당
	@Transient
	private int totalSalary; // 지급총액
	@Transient
	private double totaldeduction; // 공제총액
	@Transient
	private double totalSalaryReal; // 실지급액
	@Transient
	private double nationalPension; // 국민연금
	@Transient
	private double healthInsurance; // 건강보험
	@Transient
	private double employInsurance; // 고용보험
	@Transient
	private int carPay; // 차량유지비
}
