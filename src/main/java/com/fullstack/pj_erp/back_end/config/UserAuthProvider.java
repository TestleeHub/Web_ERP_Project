package com.fullstack.pj_erp.back_end.config;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.InvalidClaimException;
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

	public String createToken(String id, String department) {
		System.out.println("<<<UserAuthProvider - createToken>>>");

		Date now = new Date();
		Date validity = new Date(now.getTime() + 36000000); // 토큰 유효 시간 1시간
		String role = parsingDepartmentToRole(department);

		// JWT를 사용하려면 pom.xml에 java-jwt 추가

		return JWT.create().withIssuer(id).withIssuedAt(now).withExpiresAt(validity).withClaim("role", role)
				.sign(Algorithm.HMAC256(secretKey));
	}

	public Authentication validateToken(String token) {
		System.out.println("<<<UserAuthProvider - validateToken>>>");
		System.out.println("<<<UserAuthProvider - token = " + token);

		JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();

		System.out.println("<<<UserAuthProvider - validateToken 1>>>");
		UserDTO user = null;

		if (token != null) {
			try {
				DecodedJWT decoded = verifier.verify(token); // JWT를 확인하기 위해 먼저 디코딩 한다. 유효기간을 초과하면 예외가 발생한다.
				System.out.println("decoded" + decoded);

				System.out.println("<<<UserAuthProvider - validateToken 2>>>");
				user = userService.findById(decoded.getIssuer());

				System.out.println("decoded.getIssuer()" + decoded.getIssuer());
				System.out.println("decoded.getPayload()" + decoded.getPayload());
				System.out.println("decoded.getToken()" + decoded.getToken());
				System.out.println("decoded.getSignature()" + decoded.getSignature());

				List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
				// 사용자의 역할(Role) 정보 가져오기
				String userRole = decoded.getClaim("role").asString();
				System.out.println("userRole:" + userRole);

				// Spring Security에 사용자 역할 설정
				if (userRole != null) {
					authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_" + userRole);
					return new UsernamePasswordAuthenticationToken(user, null, authorities);
				}
			} catch (Exception e) {
				// 토큰이 유효하지 않은 경우 예외 처리
				e.printStackTrace();
				//throw new RuntimeException("Invalid token");
			}
		}
		return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
	}

	public String parsingDepartmentToRole(String department) {
		String role = "";
		if (department == null)
			return "ROLE_USER";

		switch (department) {
		case "관리자":
			role = "ROLE_ADMIN";
			break;
		case "인사팀":
			role = "ROLE_HR";
			break;
		case "제조팀":
			role = "ROLE_MF";
			break;
		case "재무팀":
			role = "ROLE_AC";
			break;
		case "구매팀":
			role = "ROLE_PC";
			break;
		case "영업팀":
			role = "ROLE_CR";
			break;
		case "자재팀":
			role = "ROLE_LG";
			break;
		default:
			role = "ROLE_USER";
			break;
		}
		return role;
	}

}
