package com.fullstack.pj_erp.back_end.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.auth0.jwt.exceptions.InvalidClaimException;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(InvalidClaimException.class)
    public ResponseEntity<String> handleInvalidClaimException(InvalidClaimException e) {
        // 에러 메시지를 JSON 형식으로 생성
        String errorMessage = "{\"error\": \"" + e.getMessage() + "\"}";
        System.out.println("handleInvalidClaimException");
        
        // JSON 응답과 HTTP 상태 코드를 함께 반환
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
    }
}
