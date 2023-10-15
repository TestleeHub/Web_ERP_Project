package com.fullstack.pj_erp.back_end.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.dto.MaterialRecivesDTO;
import com.fullstack.pj_erp.back_end.dto.MaterialReleaseDTO;
import com.fullstack.pj_erp.back_end.dto.ProductionItemsDTO;
import com.fullstack.pj_erp.back_end.dto.WorkOrderDTO;
import com.fullstack.pj_erp.back_end.service.ManufactureService;

import lombok.RequiredArgsConstructor;

//제조관리 컨트롤러
@RequiredArgsConstructor
@RestController
@RequestMapping
public class ManufactureController {
	// 컨트롤러는 각자 맡은 파트에 대해 하나만 생성
	@Autowired
	ManufactureService service;
	
	/* 생산 입고 시작*/
	@GetMapping(value = { "/manufacture/warehousingList" })
	public List<MaterialRecivesDTO> warehousingList() {

		return service.getWarehousingList();
	}

	@PostMapping(value = { "/manufacture/warehousingAdd" })
	public void warehousingAdd(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		dto.setRegistDate(new Date(System.currentTimeMillis()));

		dto.setValidation(1);
		// 최초 생성일때만 id를 만들어 주고 update시에는 아이디 생성 X
		if (dto.getMaterialReciveId() == null || dto.getMaterialReciveId().length() == 0) {
			for (int i = 0; i < dto.getDetails().size(); i++) {
				dto.getDetails().get(i).setRecivesDetailId("_" + i);
			}
		}
		System.out.println(dto);

		service.addWarehousingList(dto);
	}

	// 입고 항목은 실제 삭제가 아닌 validation만 0으로 바꿔줄거임
	@PutMapping(value = { "/manufacture/warehousingDelete" })
	public void warehousingDelete(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateWarehousingList(dto);
	}

	@PutMapping(value = { "/manufacture/warehousingUpdate" })
	public void warehousingUpdate(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		service.updateWarehousingList(dto);
	}
	/* 생산 입고 끝*/
	
	/* 생산 품목 시작*/
	@GetMapping(value = { "/manufacture/productionList" })
	public List<ProductionItemsDTO> productionList() {

		return service.getProductionItemsList();
	}
	
	@PostMapping(value = { "/manufacture/productionListAdd" })
	public void productionListAdd(@RequestBody ProductionItemsDTO dto) {
		System.out.println(dto);
		dto.setRegistDate(new Date(System.currentTimeMillis()));

		dto.setValidation(1);
		
		System.out.println(dto);

		service.addProductionItemsList(dto);
	}
	
	@PutMapping(value = { "/manufacture/productionListDelete" })
	public void warehousingDelete(@RequestBody ProductionItemsDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateProductionItemsList(dto);
	}

	@PutMapping(value = { "/manufacture/productionListUpdate" })
	public void warehousingUpdate(@RequestBody ProductionItemsDTO dto) {
		System.out.println(dto);
		service.updateProductionItemsList(dto);
	}
	
	/*작업 지시서 시작*/
	@GetMapping(value = { "/manufacture/instructionList" })
	public List<WorkOrderDTO> instructionList() {

		return service.getWorkOrderList();
	}
	
	@PostMapping(value = { "/manufacture/instructionAdd" })
	public void instructionAdd(@RequestBody WorkOrderDTO dto) {
		System.out.println(dto);
		dto.setRegistDate(new Date(System.currentTimeMillis()));

		dto.setValidation(1);
		dto.setCompletion("N");
		
		System.out.println(dto);

		service.addWorkOrderList(dto);
	}
	
	@PutMapping(value = { "/manufacture/instructionListDelete" })
	public void instructionListDelete(@RequestBody WorkOrderDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateWorkOrderList(dto);
	}

	@PutMapping(value = { "/manufacture/instructionListUpdate" })
	public void instructionListUpdate(@RequestBody WorkOrderDTO dto) {
		System.out.println(dto);
		service.updateWorkOrderList(dto);
	}
	/*작업 지시서 끝*/
	
	/*생산 불출 시작*/
	@GetMapping(value = { "/manufacture/dispatchList" })
	public List<MaterialReleaseDTO> dispatchList() {

		return service.getMaterialReleaseList();
	}
	
	@PostMapping(value = { "/manufacture/dispatchAdd" })
	public void dispatchAdd(@RequestBody MaterialReleaseDTO dto) {
		System.out.println(dto);
		dto.setRegistDate(new Date(System.currentTimeMillis()));

		dto.setValidation(1);
		// 최초 생성일때만 id를 만들어 주고 update시에는 아이디 생성 X
		if (dto.getMaterialReleaseId() == null || dto.getMaterialReleaseId().length() == 0) {
			for (int i = 0; i < dto.getDetails().size(); i++) {
				dto.getDetails().get(i).setReleaseDetailId("_" + i);
			}
		}
		System.out.println(dto);

		service.addMaterialReleaseList(dto);
	}
	
	@PutMapping(value = { "/manufacture/dispatchListDelete" })
	public void dispatchListDelete(@RequestBody MaterialReleaseDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateMaterialReleaseList(dto);
	}

	@PutMapping(value = { "/manufacture/dispatchListUpdate" })
	public void dispatchListUpdate(@RequestBody MaterialReleaseDTO dto) {
		System.out.println(dto);
		service.updateMaterialReleaseList(dto);
	}
	/*생산 불출 끝*/
	
}
