package com.fullstack.pj_erp.back_end.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class WebConfig {
	
	@Bean
	public FilterRegistrationBean corsFilter(){
		System.out.println("<<<WebConfig - corsFilter>>>");
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		// 프론트엔드가 일부 자격증명을 보내면 그것을 받아들여야 한다.
		CorsConfiguration config = new CorsConfiguration();
		
		System.out.println("<<<WebConfig - 1>>>");
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:3000");
		config.setAllowedHeaders(Arrays.asList(
					HttpHeaders.AUTHORIZATION,
					HttpHeaders.CONTENT_TYPE,
					HttpHeaders.ACCEPT
				));
		
		System.out.println("<<<WebConfig - 2>>>");
		config.setAllowedMethods(Arrays.asList(
					HttpMethod.GET.name(),
					HttpMethod.POST.name(),
					HttpMethod.PUT.name(),
					HttpMethod.DELETE.name()
				));
		
		config.setMaxAge(3600L); // 옵션 요청이 수락되는 시간 30분
		source.registerCorsConfiguration("/**", config); // Spring Security 필터 전에 사용하기 위해 요청에 
		
		System.out.println("<<<WebConfig - 3>>>");
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));		
		bean.setOrder(-102);
		
		System.out.println("<<<WebConfig - 4>>>");
		
		return bean;
		/*
		 * CORS : 교차 출처 자원 공유
		 * 백엔드는 프런트 엔드에서 오는 요청을 신뢰하지 않는다.
		 * 기본적으로 백엔드는 자신에게서 오는 요청만 수락한다.
		 * 따라서 프런트엔드의 요청을 수락하도록 백엔드를 구성해야 한다.(Cors Policy에 의해 Not Access해결)
		 */ 
	}
}
