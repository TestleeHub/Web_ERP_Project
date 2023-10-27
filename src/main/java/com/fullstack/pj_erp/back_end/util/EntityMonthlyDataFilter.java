package com.fullstack.pj_erp.back_end.util;

import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.Predicate;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class EntityMonthlyDataFilter<T> {

	public static <T> Specification<T> excludeEntitiesWithCondition() {
		return (root, query, criteriaBuilder) -> {

			List<Predicate> predicates = new ArrayList<>();

			// 저번 달의 날짜 구하기
			LocalDate today = LocalDate.now();
			LocalDate lastMonth = LocalDate.now().minusMonths(1);
			LocalDate firstDayOfLastMonth = lastMonth.withDayOfMonth(1);
			//LocalDate lastDayOfLastMonth = lastMonth.withDayOfMonth(lastMonth.lengthOfMonth());

			// 필터 조건: 날짜가 저번 달에 속하는 데이터만 가져오기
			predicates.add(criteriaBuilder.between(root.get("registDate"), Date.valueOf(firstDayOfLastMonth),
					Date.valueOf(today)));

			// 기존 조건: validation이 "0"이 아닌 데이터
			predicates.add(criteriaBuilder.notEqual(root.get("validation"), "0"));

			return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
		};
	}
}