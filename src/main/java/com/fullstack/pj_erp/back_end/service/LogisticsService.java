package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.InventoryDTO;
import com.fullstack.pj_erp.back_end.dto.MaterialDTO;
import com.fullstack.pj_erp.back_end.dto.ReceiptDTO;
import com.fullstack.pj_erp.back_end.dto.StorageDTO;
import com.fullstack.pj_erp.back_end.repository.InventoryRepository;
import com.fullstack.pj_erp.back_end.repository.MaterialRepository;
import com.fullstack.pj_erp.back_end.repository.ReceiptRepository;
import com.fullstack.pj_erp.back_end.repository.StorageRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

// 정요셉 - LogisticsService

@RequiredArgsConstructor
@Service
public class LogisticsService {
	private final InventoryRepository inventoryRepository;
	private final MaterialRepository materialRepository;
	private final ReceiptRepository receiptRepository;
	private final StorageRepository storageRepository;
	
	// [ Inventory ]
	public List<InventoryDTO> getInventoryList() {
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		// validation 체크
		Specification<InventoryDTO> filter = new EntityValidationFilter<InventoryDTO>().excludeEntitiesWithCondition();

		return inventoryRepository.findAll(filter, sort);
	}

	public void addInventoryList(InventoryDTO dto) {inventoryRepository.save(dto);}
	
	public void updateInventoryList(InventoryDTO dto) {inventoryRepository.save(dto);}

	
	// [ Material ]
	public List<MaterialDTO> getMaterialList() {
		// validation 체크
		Specification<MaterialDTO> filter = new EntityValidationFilter<MaterialDTO>().excludeEntitiesWithCondition();

		return materialRepository.findAll(filter);
	}

	public void addMaterialList(MaterialDTO dto) {materialRepository.save(dto);}
	
	public void updateMaterialList(MaterialDTO dto) {materialRepository.save(dto);}
	
	
	// [ Receipt ]
	public List<ReceiptDTO> getReceiptList() {
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		// validation 체크
		Specification<ReceiptDTO> filter = new EntityValidationFilter<ReceiptDTO>().excludeEntitiesWithCondition();

		return receiptRepository.findAll(filter, sort);
	}

	public void addReceiptList(ReceiptDTO dto) {receiptRepository.save(dto);}
	
	public void updateReceiptList(ReceiptDTO dto) {receiptRepository.save(dto);}
	
	
	// [ Storage ]
	public List<StorageDTO> getStorageList() {
		// validation 체크
		Specification<StorageDTO> filter = new EntityValidationFilter<StorageDTO>().excludeEntitiesWithCondition();

		return storageRepository.findAll(filter);
	}

	public void addStorageList(StorageDTO dto) {storageRepository.save(dto);}
	
	public void updateStorageList(StorageDTO dto) {storageRepository.save(dto);}
	
}