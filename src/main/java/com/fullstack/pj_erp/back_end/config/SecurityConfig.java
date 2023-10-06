package com.fullstack.pj_erp.back_end.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
	private final UserAuthProvider userAuthProvider;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		System.out.println("<<<SecurityConfig - securityFilterChain()>>>");
		http
			.exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
			.and()
			.addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class) // Spring Security의 인증필터앞에 JWT 필터를 추가
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeHttpRequests((requests) -> requests
					.antMatchers(HttpMethod.POST,"/login", "/register").permitAll()
					.anyRequest().authenticated() // 나머지 엔드포인트는 인증을 받아야 함
					);
			// stateless 애플리케이션을 스프링에게 전달하여 
		return http.build();
	}
}
