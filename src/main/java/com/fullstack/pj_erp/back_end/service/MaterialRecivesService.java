package com.fullstack.pj_erp.back_end.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fullstack.pj_erp.back_end.dto.MaterialRecivesDTO;
import com.fullstack.pj_erp.back_end.repository.MaterialRecivesRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MaterialRecivesService {
	private final MaterialRecivesRepository repository;
	
	public List<MaterialRecivesDTO> getList(){
		return repository.findAll();
	}
	
	public void addList(MaterialRecivesDTO dto) {
		repository.save(dto);
	}
	
	public void updateList(MaterialRecivesDTO dto) {
		repository.save(dto);
	}
}
