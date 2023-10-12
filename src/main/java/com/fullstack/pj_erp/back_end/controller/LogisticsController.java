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

import com.fullstack.pj_erp.back_end.dto.InventoryDTO;
import com.fullstack.pj_erp.back_end.dto.MaterialDTO;
import com.fullstack.pj_erp.back_end.dto.ReceiptDTO;
import com.fullstack.pj_erp.back_end.dto.StorageDTO;
import com.fullstack.pj_erp.back_end.service.LogisticsService;

import lombok.RequiredArgsConstructor;

// 정요셉 - LogisticsController

@RequiredArgsConstructor
@RestController
@RequestMapping
public class LogisticsController {

	@Autowired
	LogisticsService service;

	// [ Inventory ]
	@GetMapping(value = {"/logistics/inventoryList"})
	public List<InventoryDTO> inventoryList() {
		return service.getInventoryList();
	}

	@PostMapping(value = {"/logistics/inventoryListAdd"})
	public void inventoryListAdd(@RequestBody InventoryDTO dto) {
		System.out.println(dto);
		dto.setRegistDate(new Date(System.currentTimeMillis()));
		dto.setValidation(1);

		System.out.println(dto);

		service.addInventoryList(dto);
	}

	@PutMapping(value = {"/logistics/inventoryListDelete"})
	public void inventoryListDelete(@RequestBody InventoryDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateInventoryList(dto);
	}

	@PutMapping(value = {"/logistics/inventoryListUpdate"})
	public void inventoryListUpdate(@RequestBody InventoryDTO dto) {
		System.out.println(dto);
		service.updateInventoryList(dto);
	}

	
	// [ Material ]
	@GetMapping(value = {"/logistics/materialList"})
	public List<MaterialDTO> materialList() {
		return service.getMaterialList();
	}

	@PostMapping(value = {"/logistics/materialListAdd"})
	public void materialListAdd(@RequestBody MaterialDTO dto) {
		System.out.println(dto);
		dto.setValidation(1);

		System.out.println(dto);

		service.addMaterialList(dto);
	}

	@PutMapping(value = {"/logistics/materialListDelete"})
	public void materialListDelete(@RequestBody MaterialDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateMaterialList(dto);
	}

	@PutMapping(value = {"/logistics/materialListUpdate"})
	public void materialListUpdate(@RequestBody MaterialDTO dto) {
		System.out.println(dto);
		service.updateMaterialList(dto);
	}
	
	
	// [ Receipt ]
	@GetMapping(value = {"/logistics/receiptList"})
	public List<ReceiptDTO> receiptList() {
		return service.getReceiptList();
	}

	@PostMapping(value = {"/logistics/receiptListAdd"})
	public void receiptListAdd(@RequestBody ReceiptDTO dto) {
		System.out.println(dto);
		dto.setReceiptDate(new Date(System.currentTimeMillis()));
		dto.setValidation(1);

		System.out.println(dto);

		service.addReceiptList(dto);
	}

	@PutMapping(value = {"/logistics/receiptListDelete"})
	public void receiptListDelete(@RequestBody ReceiptDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateReceiptList(dto);
	}

	@PutMapping(value = {"/logistics/receiptListUpdate"})
	public void receiptListUpdate(@RequestBody ReceiptDTO dto) {
		System.out.println(dto);
		service.updateReceiptList(dto);
	}

	
	// [ Storage ]
	@GetMapping(value = {"/logistics/storageList"})
	public List<StorageDTO> storageList() {
		return service.getStorageList();
	}

	@PostMapping(value = {"/logistics/storageListAdd"})
	public void storageListAdd(@RequestBody StorageDTO dto) {
		System.out.println(dto);
		dto.setValidation(1);

		System.out.println(dto);

		service.addStorageList(dto);
	}

	@PutMapping(value = {"/logistics/storageListDelete"})
	public void storageListDelete(@RequestBody StorageDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updateStorageList(dto);
	}

	@PutMapping(value = {"/logistics/storageListUpdate"})
	public void storageListUpdate(@RequestBody StorageDTO dto) {
		System.out.println(dto);
		service.updateStorageList(dto);
	}
	
}


