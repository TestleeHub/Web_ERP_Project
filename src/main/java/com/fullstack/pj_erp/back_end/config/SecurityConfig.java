package com.fullstack.pj_erp.back_end.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
	private final UserAuthProvider userAuthProvider;
	@Autowired
	TokenBlacklistFilter tokenBlacklistFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		System.out.println("<<<SecurityConfig - securityFilterChain()>>>");
		http
			.exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
			.and()
			.addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class) // Spring Security의 인증필터앞에 JWT 필터를 추가
			.addFilterAfter(tokenBlacklistFilter, JwtAuthFilter.class)
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeHttpRequests((requests) -> requests
					//.antMatchers(HttpMethod.POST,"/login", "/register").permitAll()
					.antMatchers("/humanResources/*").hasAnyRole("ROLE_ADMIN", "ROLE_HR")
					.antMatchers("/manufacture/*").hasAnyRole("ROLE_ADMIN", "ROLE_MF")
					.antMatchers("/account/*").hasAnyRole("ROLE_ADMIN", "ROLE_AC")
					.antMatchers("/purchase/*").hasAnyRole("ROLE_ADMIN", "ROLE_PC", "ROLE_AC")
					.antMatchers("/customer/*").hasAnyRole("ROLE_ADMIN", "ROLE_CR", "ROLE_MF", "ROLE_PC", "ROLE_LG")
					.antMatchers("/logistics/*").hasAnyRole("ROLE_ADMIN", "ROLE_LG", "ROLE_MF", "ROLE_PC")
					.antMatchers("/attendance/*").permitAll()
					.antMatchers("/**").permitAll()//위 설정 외 다른 페이지는 모두 사용 가능
					.anyRequest().authenticated() // 나머지 엔드포인트는 인증을 받아야 함
					);
			// stateless 애플리케이션을 스프링에게 전달하여 
		return http.build();
	}
}
