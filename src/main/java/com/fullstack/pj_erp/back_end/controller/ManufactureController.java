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

	@GetMapping(value = { "/manufacture/warehousingList" })
	public List<MaterialRecivesDTO> index() {

		return service.getwarehousingList();
	}

	@PostMapping(value = { "/manufacture/warehousingAdd" })
	public void warehousingAdd(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		dto.setRegistDate(new Date(System.currentTimeMillis()));

		dto.setValidation(1);
		// 최초 생성일때만 id를 만들어 주고 update시에는 아이디 생성 X
		if (dto.getMaterialReciveId() == null) {
			for (int i = 0; i < dto.getDetails().size(); i++) {
				dto.getDetails().get(i).setRecivesDetailId("_" + i);
			}
		}
		System.out.println(dto);

		service.addwarehousingList(dto);
	}

	// 입고 항목은 실제 삭제가 아닌 validation만 0으로 바꿔줄거임
	@PutMapping(value = { "/manufacture/warehousingDelete" })
	public void warehousingDelete(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		dto.setValidation(0);
		service.updatewarehousingList(dto);
	}

	@PutMapping(value = { "/manufacture/warehousingUpdate" })
	public void warehousingUpdate(@RequestBody MaterialRecivesDTO dto) {
		System.out.println(dto);
		service.updatewarehousingList(dto);
	}
}
