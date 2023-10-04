package com.fullstack.pj_erp.back_end.aop;

import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

// 횡단관심 클래스 - 공통 클래스 => 핵심 관심 출력 메서드의 경과 시간에 대한 로그 출력 클래스
@Configuration
@EnableAspectJAutoProxy
@Aspect
public class ExceptionHandler {
	public ExceptionHandler() {	}
	
	// mapper에서 runtime 오류 발생시에는 잡지 못하므로 수동으로 try Catch 해서 적적 Exception으로 던져주면 잡을 수 있음
	@AfterThrowing(pointcut = "execution(* com.fullstack.pj_erp.back_end.mappers.*.*(..))", 
					throwing = "ex")
	public void exceptionAOP(Exception ex) {
		// 예외 처리 로직
		System.err.println("An exception occurred: " + ex.getMessage());
		ex.printStackTrace();
	}
}
