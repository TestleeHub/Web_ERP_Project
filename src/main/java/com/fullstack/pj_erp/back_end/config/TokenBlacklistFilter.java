package com.fullstack.pj_erp.back_end.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class TokenBlacklistFilter extends OncePerRequestFilter {
	@Autowired
	TokenBlacklist tokenBlacklist; 
	
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
    	System.out.println("<<<TokenBlacklistFilter - doFilterInternal>>>");
    	
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		System.out.println("<<<header>>>" + header);
		
		if(header != null && !header.equals("Bearer undefined")) {
			String[] elements = header.split(" ");
			
			if(elements.length == 2 && "Bearer".equals(elements[0])) {
				String token = elements[1];
				System.out.println(tokenBlacklist);
		        if (token != null && tokenBlacklist.isTokenBlacklisted(token)) {
		            // 블랙리스트에 있는 토큰이면 요청 거부
		            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		            return;
		        }
			}
		}
		
        filterChain.doFilter(request, response);
    }
}
