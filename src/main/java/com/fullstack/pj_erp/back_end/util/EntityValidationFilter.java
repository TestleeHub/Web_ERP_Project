package com.fullstack.pj_erp.back_end.util;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class EntityValidationFilter<T> {

	public static <T> Specification<T> excludeEntitiesWithCondition() {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 제외할 조건
             predicates.add(criteriaBuilder.notEqual(root.get("validation"), "0"));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
