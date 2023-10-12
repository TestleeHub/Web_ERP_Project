package com.fullstack.pj_erp.back_end.config;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fullstack.pj_erp.back_end.dto.UserDTO;
import com.fullstack.pj_erp.back_end.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {
	// JWT를 생성하고 검증하기 위해 pom.xml에 java-jwt 라이브러리 추가
	@Value("{security.jwt.token.secret-key:secret-value}")
	private String secretKey;
	
	private final UserService userService;
	
	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}
	
	public String createToken(String id) {
		System.out.println("<<<UserAuthProvider - createToken>>>");
		
		Date now = new Date();
		Date validity = new Date(now.getTime() + 36000000); // 토큰 유효 시간 1시간
		
		// JWT를 사용하려면 pom.xml에 java-jwt 추가
		
		return JWT.create()
				.withIssuer(id)
				.withIssuedAt(now)
				.withExpiresAt(validity)
				.sign(Algorithm.HMAC256(secretKey));
	}
	
	public Authentication validateToken(String token) {
		System.out.println("<<<UserAuthProvider - validateToken>>>");
		System.out.println("<<<UserAuthProvider - token = " + token);
		
		JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
		
		System.out.println("<<<UserAuthProvider - validateToken 1>>>");
		
		DecodedJWT decoded = verifier.verify(token); // JWT를 확인하기 위해 먼저 디코딩 한다. 유효기간을 초과하면 예외가 발생한다.
		System.out.println("decoded" + decoded);
		
		System.out.println("<<<UserAuthProvider - validateToken 2>>>");
		UserDTO user = userService.findById(decoded.getIssuer());
		
		System.out.println("decoded.getIssuer()" + decoded.getIssuer());
		
		return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
	}
	
}
