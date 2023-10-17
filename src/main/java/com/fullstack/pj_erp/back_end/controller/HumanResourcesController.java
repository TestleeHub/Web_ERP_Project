package com.fullstack.pj_erp.back_end.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	// emp 조회
	@GetMapping(value = {"/humanResources/empList"})
	public List<UserDTO> empList(){

		// 계산 시작
		int DependentFamiliyPay = 300000; // 부양가족수당
		int carPay = 800000;			
		int totalSalary = 0;
		double nationalPension = 0; // 국민연금
		double healthInsurance = 0;// 건강보험
		double employInsurance = 0;// 고용보험
		// 계산 끝
		
		System.out.println("\n<<</humanResources/empList>>>");
		List<UserDTO> list = service.listEmp();
		for(UserDTO dto : list) {
		
			// 차량유지비
			dto.setCarPay(carPay); 
			
			// 총지급액
			totalSalary = dto.getSalary() + carPay + DependentFamiliyPay; 
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
	
	// emp 추가/수정
	@PostMapping(value = {"/humanResources/empAdd"})
	public void empAdd(@RequestBody UserDTO dto) {
		System.out.println("<<</humanResources/empAdd>>>");
		dto.setJoinDate(new Date(System.currentTimeMillis()));
		dto.setValidation(1);
		
		System.out.println(dto);
		
		service.addEmp(dto);
	}
	
	// emp 삭제
	@PutMapping(value = {"/humanResources/empDelete"})
	public void empDelete(@RequestBody UserDTO dto) {
		System.out.println("<<</humanResources/empDelete>>>");
		dto.setValidation(0);
		System.out.println(dto);
		
		service.addEmp(dto);
	}
	
	// emp 회원 수정(1명) 
	@GetMapping(value = {"/humanResources/empEdit/{employeeId}"})
	public UserDTO empEdit(@PathVariable(name = "employeeId") String employeeId){
		
		System.out.println("\n<<</humanResources/empEdit>>>");
		System.out.println("\n id:" + employeeId);
		UserDTO dto = service.getEmp(employeeId);
		System.out.println("dto:" + dto);
		
		return dto;
	}
	
	// emp pwCheck 
	@GetMapping(value = {"/humanResources/empPwCheck"})
	public String empEdit(@RequestBody UserDTO dto){
		
		System.out.println("\n<<</humanResources/empPwCheck>>>");
		System.out.println("dto: " + dto);
//		UserDTO dto = service.getEmp(employeeId);
		
		
		return null;
	}
	
	// 급여 조회
	@GetMapping(value = {"/humanResources/salary"})
	public List<SalaryDTO> salary(){
		
		System.out.println("\n<<</humanResources/salary>>>");
		List<SalaryDTO> list = service.listSalary();
		System.out.println("salary:" + list);
		
		return list;
	}

	
}
