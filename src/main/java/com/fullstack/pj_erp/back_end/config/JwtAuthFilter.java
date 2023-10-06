package com.fullstack.pj_erp.back_end.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter{
	
	private final UserAuthProvider userAuthProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("<<<JwtAuthFilter - doFilterInternal>>>");
		
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		System.out.println("<<<header>>>" + header);
		
		if(header != null && !header.equals("Bearer undefined")) {
			String[] elements = header.split(" ");
			
			if(elements.length == 2 && "Bearer".equals(elements[0])) {
				try {
					SecurityContextHolder.getContext().setAuthentication(userAuthProvider.validateToken(elements[1]));
				} catch (RuntimeException e) {
					SecurityContextHolder.clearContext(); //문제가 발생하면 보안 컨텍스트를 지우고 오류를 발생시킨다.
					throw e;
				}
			}
		}
		
		filterChain.doFilter(request, response); // 필터끝에서 doFilter() 메서드 호출
	}
	
	
}
