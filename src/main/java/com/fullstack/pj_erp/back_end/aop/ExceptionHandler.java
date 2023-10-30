package com.fullstack.pj_erp.back_end.aop;

import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

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
