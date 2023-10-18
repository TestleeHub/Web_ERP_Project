package com.fullstack.pj_erp.back_end.config;

import java.util.Set;
import java.util.HashSet;
import org.springframework.stereotype.Component;

@Component
public class TokenBlacklist {

	private Set<String> blacklistedTokens = new HashSet<>();

	public boolean isTokenBlacklisted(String token) {
		// 블랙리스트에 해당 토큰이 있는지 확인
		return blacklistedTokens.contains(token);
	}

	public void addToBlacklist(String token) {
		// 토큰을 블랙리스트에 추가
		blacklistedTokens.add(token);
	}

	public void removeFromBlacklist(String token) {
		// 토큰을 블랙리스트에서 제거
		blacklistedTokens.remove(token);
	}

	public void clearBlacklist() {
		// 블랙리스트를 초기화
		blacklistedTokens.clear();
	}
	public int getBlacklistSize() {
		return blacklistedTokens.size();
	}

	@Override
	public String toString() {
		return "TokenBlacklist [blacklistedTokens=" + blacklistedTokens + "]";
	}

}
