package com.fullstack.pj_erp.back_end.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
@Aspect
public class LogHandler {
	public LogHandler() {	}
	
	// Around는 Proxy 객체를 생성하므로 최초 호출인 controller 에서만 사용 
	// front -> back , back -> front 확인용 로그
	@Around(value = "execution(* com.fullstack.pj_erp.back_end.controller.*.*(..))")
	public Object loggerAop(ProceedingJoinPoint joinpoint) {
		String signatureStr = joinpoint.getSignature().toShortString();
		System.out.println(signatureStr + "is start");
		long st = System.currentTimeMillis();
		Object result = null;
		
		try {
			result = joinpoint.proceed(); // 핵심 관심 작동
		} catch (Throwable e) {
			e.printStackTrace();
		} finally {
			long et = System.currentTimeMillis();
			System.out.println(signatureStr + "is end");
			System.out.println(signatureStr + "경과 시간" + (et-st));
		}
		
		return result;
	}
	
	// SQL 결과 확인용 로그 
	@AfterReturning(pointcut = "execution(* com.fullstack.pj_erp.back_end.mappers.*.*(..)) || "
			+ "execution(* com.fullstack.pj_erp.back_end.service.*.*(..))",
					returning = "result")
	public void returnAOP(JoinPoint joinPoint, Object result) {
		String methodName = joinPoint.getSignature().toShortString();
		String className = joinPoint.getTarget().getClass().getSimpleName();
		System.out.println("Method " + methodName + " in class " + className + " returned: " + result);
		return;	
	}

}
