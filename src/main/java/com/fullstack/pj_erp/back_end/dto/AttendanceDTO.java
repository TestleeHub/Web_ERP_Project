package com.fullstack.pj_erp.back_end.dto;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
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
@Table(name = "attendance")
public class AttendanceDTO {
	@Id
	@Column(name = "ATTENDANCEKEY")
	private String attendanceKey;
	@Column(name = "EMPLOYEEID")
	private String employeeId;
	@Column(name = "GOTOWORKDAY", updatable = false)
	private Timestamp gotoWorkDay;
	@Column(name = "LEAVEWORKDAY")
	private Timestamp leaveWorkDay;
//	@Column(name = "ATTENDANCESTATE")
//	private Integer attendanceState;
	
	@Transient
	private long hoursWorking;
	@Transient
	private long minuteWorking;
	
	@PrePersist
	private void generateId() {
		if (attendanceKey == null || attendanceKey.length() == 0) {
			// 현재 날짜와 시간
			java.util.Date currentDate = new java.util.Date();

			// SimpleDateFormat을 사용하여 날짜와 시간을 "yyMMddHHmmss" 형식으로 포맷
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
			String key = sdf.format(currentDate);
			// 데이터 베이스에 항목에 PK 컬럼이 VARCHAR2(8)으로 되있는지 확인
			// "DTO의 앞 두글자를 대문자로" + key 값
			this.attendanceKey = "AT" + key; // 숫자 시퀀스 값을 문자열로 변환하여 PK 값 생성
			System.out.println("attendanceKey null일때 새로운값: " + attendanceKey);
		}
	}
	
}
