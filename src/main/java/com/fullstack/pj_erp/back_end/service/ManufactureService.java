package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.MaterialRecivesDTO;
import com.fullstack.pj_erp.back_end.dto.MaterialReleaseDTO;
import com.fullstack.pj_erp.back_end.dto.ProductionItemsDTO;
import com.fullstack.pj_erp.back_end.dto.WorkOrderDTO;
import com.fullstack.pj_erp.back_end.repository.MaterialRecivesRepository;
import com.fullstack.pj_erp.back_end.repository.MaterialReleaseRepository;
import com.fullstack.pj_erp.back_end.repository.ProductionItemsRepository;
import com.fullstack.pj_erp.back_end.repository.WorkOrderRepository;
import com.fullstack.pj_erp.back_end.util.EntityValidationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ManufactureService {
	private final MaterialRecivesRepository materialRecivesrepository;
	private final ProductionItemsRepository productionItemsRepository;
	private final WorkOrderRepository workorderRepository;
	private final MaterialReleaseRepository materialReleaseRepository;
	
	public List<MaterialRecivesDTO> getWarehousingList(){
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		//validation 체크
		Specification<MaterialRecivesDTO> filter = new EntityValidationFilter<MaterialRecivesDTO>().excludeEntitiesWithCondition();
		return materialRecivesrepository.findAll(filter, sort);
	}
	
	public void addWarehousingList(MaterialRecivesDTO dto) {
		materialRecivesrepository.save(dto);
	}
	
	public void updateWarehousingList(MaterialRecivesDTO dto) {
		materialRecivesrepository.save(dto);
	}
	
	public List<ProductionItemsDTO> getProductionItemsList(){
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		//validation 체크
		Specification<ProductionItemsDTO> filter = new EntityValidationFilter<ProductionItemsDTO>().excludeEntitiesWithCondition();
		return productionItemsRepository.findAll(filter, sort);
	}
	
	public void addProductionItemsList(ProductionItemsDTO dto) {
		productionItemsRepository.save(dto);
	}
	
	public void updateProductionItemsList(ProductionItemsDTO dto) {
		productionItemsRepository.save(dto);
	}
	
	public List<WorkOrderDTO> getWorkOrderList(){
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		//validation 체크
		Specification<WorkOrderDTO> filter = new EntityValidationFilter<WorkOrderDTO>().excludeEntitiesWithCondition();
		return workorderRepository.findAll(filter, sort);
	}
	
	public void addWorkOrderList(WorkOrderDTO dto) {
		workorderRepository.save(dto);
	}
	
	public void updateWorkOrderList(WorkOrderDTO dto) {
		workorderRepository.save(dto);
	}
	
	public List<MaterialReleaseDTO> getMaterialReleaseList(){
		Sort sort = Sort.by(Sort.Order.desc("registDate"));
		//validation 체크
		Specification<MaterialReleaseDTO> filter = new EntityValidationFilter<MaterialReleaseDTO>().excludeEntitiesWithCondition();
		return materialReleaseRepository.findAll(filter, sort);
	}
	
	public void addMaterialReleaseList(MaterialReleaseDTO dto) {
		materialReleaseRepository.save(dto);
	}
	
	public void updateMaterialReleaseList(MaterialReleaseDTO dto) {
		materialReleaseRepository.save(dto);
	}
	
	
}
