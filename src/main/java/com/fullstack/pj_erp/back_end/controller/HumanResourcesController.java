package com.fullstack.pj_erp.back_end.controller;

import java.nio.CharBuffer;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.dto.AttendanceDTO;
import com.fullstack.pj_erp.back_end.dto.SalaryDTO;
import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.service.HumanResourcesService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class HumanResourcesController {

	@Autowired
	HumanResourcesService service;
	private final PasswordEncoder passwordEncoder; 
	
	// 사원 조회
	@GetMapping(value = {"/humanResources/empList"})
	public List<UserDTO> empList(){

		// 계산 시작
		int dependentFamiliyPay = 300000; // 부양가족수당
		int carPay = 800000;			
		int totalSalary = 0;
		double nationalPension = 0; // 국민연금
		double healthInsurance = 0; // 건강보험
		double employInsurance = 0; // 고용보험
		int overTimePay = 0;		// 야근수당
		int WeekendPay = 0;			// 주말수당
		int VacationPay = 0;		// 연차수당
		// 계산 끝
		
		System.out.println("\n<<</humanResources/empList>>>");
		// 사원 목록 가져오기
		List<UserDTO> list = service.listEmp();
		// 사원 목록에서 급여 계산하기
		for(UserDTO dto : list) {
			
			overTimePay = dto.getSalar().getOvertimePay() != null ? dto.getSalar().getOvertimePay() : 0;
			WeekendPay = dto.getSalar().getWeekendPay() != null ? dto.getSalar().getWeekendPay() : 0;
			VacationPay = dto.getSalar().getVacationPay() != null ? dto.getSalar().getVacationPay() : 0;
			
			// 부양가족수당
			dto.setDependentFamiliyPay(dependentFamiliyPay);
			
			// 차량유지비
			dto.setCarPay(carPay); 
			
			// 총지급액
			totalSalary = dto.getSalary() + carPay + dto.getDependentFamiliyPay() + overTimePay + WeekendPay + VacationPay; 
			dto.setTotalSalary(totalSalary);
			
			// 국민연금
			nationalPension = dto.getSalary() * 0.09;
			dto.setNationalPension(nationalPension);
			
			// 건강보험
			healthInsurance = dto.getSalary() * 0.0648;
			dto.setHealthInsurance(healthInsurance);
			
			// 고용보험
			employInsurance = dto.getSalary() * 0.0081;
			dto.setEmployInsurance(employInsurance);
			
			// 공제총액
			dto.setTotaldeduction(dto.getNationalPension() + dto.getHealthInsurance() + dto.getEmployInsurance());
			
			// 실지급액
			dto.setTotalSalaryReal(totalSalary - dto.getTotaldeduction());
		}
		System.out.println("empList:" + list);
		
		
		
		return list;
	}
	
	// 사원 추가/수정
	@PostMapping(value = {"/humanResources/empAdd"})
	public void empAdd(@RequestBody UserDTO dto) {
		System.out.println("<<</humanResources/empAdd>>>");
		
		// 처음 등록할때만 현재 날짜로 등록
		if(dto.getJoinDate() == null) {
			dto.setJoinDate(new Date(System.currentTimeMillis()));
		}
		
		dto.setValidation(1);
		
		dto.setPassword(passwordEncoder.encode(CharBuffer.wrap(dto.getPassword())));
		System.out.println(dto);
		
		service.addEmp(dto);
	}
	
	// 사원 삭제
	@PutMapping(value = {"/humanResources/empDelete"})
	public void empDelete(@RequestBody UserDTO dto) {
		System.out.println("<<</humanResources/empDelete>>>");
		dto.setValidation(0);
		System.out.println(dto);
		
		service.addEmp(dto);
	}
	
	// emp 회원 수정 페이지 - 한명 조회(1명) 
	@GetMapping(value = {"/myeEditPage/myDetail/{employeeId}"})
	public UserDTO empEdit(@PathVariable(name = "employeeId") String employeeId){
		
		System.out.println("\n<<</humanResources/empEdit>>>");
		System.out.println("\n id:" + employeeId);
		UserDTO dto = service.getEmp(employeeId);
		
		System.out.println("dto:" + dto);
		
		return dto;
	}
	
	// myPage 회원수정 - URL 바꾼거
	@PostMapping(value = {"/myeEditPage/empUpdate"})
	public void empUpdate(@RequestBody UserDTO dto) {
		System.out.println("<<</humanResources/empUpdate>>>");

		// 처음 등록할때만 현재 날짜로 등록
		if(dto.getJoinDate() == null) dto.setJoinDate(new Date(System.currentTimeMillis()));
		
		dto.setValidation(1);
		
		dto.setPassword(passwordEncoder.encode(CharBuffer.wrap(dto.getPassword())));
		System.out.println(dto);
		
		service.addEmp(dto);
	}
	
	// 급여 등록
	@PostMapping(value = {"/humanResources/salaryAdd"})
	public void salaryAdd(@RequestBody SalaryDTO dto){
		System.out.println("\n<<</humanResources/salaryAdd>>>");
		System.out.println("dto:" + dto);
		
		dto.setValidation(1);
		service.AddSalary(dto);	
	}
	
	// 급여 조회
	@GetMapping(value = {"/humanResources/salary"})
	public List<SalaryDTO> salary(){
		
		System.out.println("\n<<</humanResources/salary>>>");
		List<SalaryDTO> list = service.listSalary();
		System.out.println("salary:" + list);
		
		return list;
	}
	
	// 출근 
	@PostMapping(value = {"/attendance/checkIn"})
	public String checkIn(@RequestBody AttendanceDTO dto){
		System.out.println("\n<<</attendance/checkIn>>>");
		
		Timestamp checkInTime = new Timestamp(System.currentTimeMillis()); // 현재 시간으로 Timestamp 생성
		dto.setGotoWorkDay(checkInTime);
		
		String getGotoWorkDay1 = dto.getGotoWorkDay().toString().split(" ")[0];
		String getGotoWorkDay2 = "";
		
		// 같은 아이디로 현재 날짜를 추가할려고 하면 안되게 하기
		List<AttendanceDTO> existingAttendances = service.oneAttendance(dto.getEmployeeId());
		System.out.println("existingAttendances:" + existingAttendances);
		// 처음 아무것도 없을때
		if(existingAttendances.isEmpty()) {
			service.addAttendance(dto);
			return "출근 완료";
		}else {
			for(int i=0; i<existingAttendances.size(); i++) {
				
				AttendanceDTO dtoExit = existingAttendances.get(i);
				getGotoWorkDay2 = dtoExit.getGotoWorkDay().toString().split(" ")[0];
				
				if(getGotoWorkDay1.equals(getGotoWorkDay2)) {
					return "이미 출근 했습니다";
				}
					
			}
			service.addAttendance(dto);
			return "출근 완료";
		}
	}
	
	// 퇴근
	@PostMapping(value = {"/attendance/checkOut"})
	public void checkOut(@RequestBody AttendanceDTO dto){
		System.out.println("\n<<</attendance/checkOut>>>");
		
		List<AttendanceDTO> existingAttendances = service.oneAttendance(dto.getEmployeeId());
		for(int i=0; i<existingAttendances.size(); i++) {
			AttendanceDTO dtoExit = existingAttendances.get(i);
			if(dtoExit.getLeaveWorkDay() == null) {
				dto.setAttendanceKey(dtoExit.getAttendanceKey());
			}
		}
		System.out.println("dto키: " + dto.getAttendanceKey());
		Timestamp checkInTime = new Timestamp(System.currentTimeMillis()); // 현재 시간으로 Timestamp 생성
		dto.setLeaveWorkDay(checkInTime);
		service.addAttendance(dto);
	}
	
	// 근태 조회
	@GetMapping(value = {"/humanResources/attendanceList"})
	public List<AttendanceDTO> attendanceList(){
		
		System.out.println("\n<<</humanResources/attendanceList>>>");
		List<AttendanceDTO> list = service.listAttendance();

		System.out.println("attendanceList:" + list);
		return list;
	}
	
	// 한명 출근시간 조회
	@GetMapping(value = {"/attendance/attendanceCheckTime/{employeeId}"})
	public Timestamp attendanceCheckTime(@PathVariable(name = "employeeId") String employeeId){
		System.out.println("\n<<</attendance/attendanceCheckTime>>>");
		System.out.println("\n id:" + employeeId);
		Timestamp LastCheckIn = new Timestamp(0);
		
		if(employeeId != null) {
			List<AttendanceDTO> existingAttendances = service.oneAttendance(employeeId);
			
			if (!existingAttendances.isEmpty()) {
				int ListIndex = existingAttendances.size() - 1;
				LastCheckIn = existingAttendances.get(ListIndex).getGotoWorkDay();
			}
			
		}
		
		return LastCheckIn;
	}
	
}
