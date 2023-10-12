package com.fullstack.pj_erp.back_end.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.pj_erp.back_end.service.CustomerService;

import lombok.RequiredArgsConstructor;

// 고객 관리 컨트롤러
@RequiredArgsConstructor
@RestController
@RequestMapping
public class CustomerController {
	
	@Autowired
	CustomerService service;
}
