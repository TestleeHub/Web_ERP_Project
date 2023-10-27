package com.fullstack.pj_erp.back_end.util;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.Predicate;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class EntityDailyDataFilter<T> {

   public static <T> Specification<T> excludeEntitiesWithCondition() {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 어제의 날짜 구하기
            LocalDate yesterday = LocalDate.now().minusDays(1);
            LocalDate today = LocalDate.now();

            // 필터 조건: 날짜가 어제인 데이터만 가져오기
            predicates.add(criteriaBuilder.between(root.get("registDate"), Date.valueOf(yesterday), Date.valueOf(today)));

            // 기존 조건: validation이 "0"이 아닌 데이터
            predicates.add(criteriaBuilder.notEqual(root.get("validation"), "0"));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}