package com.fullstack.pj_erp.back_end;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.fullstack.pj_erp.back_end.dto.DailyBalanceDetailDTO;
import com.fullstack.pj_erp.back_end.dto.DailyTrialBalanceDTO;
import com.fullstack.pj_erp.back_end.dto.MonthlyBalanceDetailDTO;
import com.fullstack.pj_erp.back_end.dto.MonthlyTrialBalanceDTO;
import com.fullstack.pj_erp.back_end.dto.PurchaseFormDTO;
import com.fullstack.pj_erp.back_end.dto.Purchase_DetailDTO;
import com.fullstack.pj_erp.back_end.dto.SalesDTO;
import com.fullstack.pj_erp.back_end.dto.Sales_DetailDTO;
import com.fullstack.pj_erp.back_end.repository.DailyTrialBalanceRepository;
import com.fullstack.pj_erp.back_end.repository.MonthlyTrialBalanceRepository;
import com.fullstack.pj_erp.back_end.service.AccountService;

//Scheduled된 작업은 별도의 Persistence Context에서 동작하기 때문에 트랜잭션을 관리해 주지 않으면 lazyLoding(LazyInitializationException) 오류가 발생함, 
//메인쓰레드에서는 스프링 부트의 Context가 관리해주기 때문에 따로 명시하지 않아도 됨
@Component
public class AccountThread {
   @Autowired
   private AccountService service;
   @Autowired
   private PlatformTransactionManager transactionManager;
   @Autowired
   private MonthlyTrialBalanceRepository mtb_repository;
   @Autowired
   private DailyTrialBalanceRepository dtb_repository;

   @Scheduled(cron = "0 0 0 1 * ?") // 매월 1일 00:00에 실행
   public void monthlyTask() {
      System.out.println("Scheduled monthlyTask executed at " + LocalDateTime.now());
      TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
      try {
         List<SalesDTO> salesList = service.getMonthlySaleData();
         System.out.println("salesList = " + salesList);
         List<PurchaseFormDTO> purchaseFormList = service.getMonthlyPurchaseData();
         System.out.println("purchaseFormList = " + purchaseFormList);
         
         //계산 시작
         //List<MonthlyTrialBalanceDTO> list = new ArrayList<MonthlyTrialBalanceDTO>();
         MonthlyTrialBalanceDTO mtbDTO = new MonthlyTrialBalanceDTO();
         MonthlyBalanceDetailDTO detailDTO = new MonthlyBalanceDetailDTO();
         
         int income = 0;
         int expend = 0;
         Date registDate = Date.valueOf(LocalDate.now().minusDays(1));
         
         for(SalesDTO salesdto : salesList) {
            for(Sales_DetailDTO detaildto : salesdto.getDetails()) {
               income += detaildto.getQuantity()*detaildto.getPrice();
            }
         }
         for(PurchaseFormDTO purchasedto : purchaseFormList) {
            for(Purchase_DetailDTO detaildto : purchasedto.getDetails()) {
               expend += detaildto.getQuantity()*detaildto.getPrice();
            }
         }
         detailDTO.setMonthlyBalanceDetailId("_0");
         detailDTO.setAccountingTitle("부가세대급금");
         detailDTO.setCreditCash(income/10);
         detailDTO.setDebitCash(expend/10);
         mtbDTO.getDetails().add(detailDTO);
         
         detailDTO = new MonthlyBalanceDetailDTO();
         detailDTO.setMonthlyBalanceDetailId("_1");
         detailDTO.setAccountingTitle("원재료대금");
         detailDTO.setCreditCash(0);
         detailDTO.setDebitCash(expend);
         mtbDTO.getDetails().add(detailDTO);

         detailDTO = new MonthlyBalanceDetailDTO();
         detailDTO.setMonthlyBalanceDetailId("_2");
         detailDTO.setAccountingTitle("제품매출");
         detailDTO.setCreditCash(income);
         detailDTO.setDebitCash(0);
         mtbDTO.getDetails().add(detailDTO);
         
         mtbDTO.setRegistDate(registDate);
         mtbDTO.setValidation(1);
         
         System.out.println(mtbDTO);
         
         mtb_repository.save(mtbDTO);
         
         //계산 끝
         transactionManager.commit(status);
      } catch (Exception e) {
         transactionManager.rollback(status);
      }
      
   }

   @Scheduled(cron = "0 0 0 * * ? ") // 매일 00:00에 실행
   public void dailyTask() {
      System.out.println("Scheduled dailyTask executed at " + LocalDateTime.now());
      TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
      try {
         List<PurchaseFormDTO> purchaseFormList = service.getDailyPurchaseData();
         System.out.println("purchaseFormList = " + purchaseFormList);
         List<SalesDTO> salesList = service.getDailySaleData();
         System.out.println("salesList = " + salesList);
         
         //계산 시작
         //List<DailyTrialBalanceDTO> list = new ArrayList<DailyTrialBalanceDTO>();
         DailyTrialBalanceDTO dtbDTO = new DailyTrialBalanceDTO();
         DailyBalanceDetailDTO detailDTO = new DailyBalanceDetailDTO();
         
         int income = 0;
         int expend = 0;
         Date registDate = Date.valueOf(LocalDate.now().minusDays(1));
         
         for(SalesDTO salesdto : salesList) {
            for(Sales_DetailDTO detaildto : salesdto.getDetails()) {
               income += detaildto.getQuantity()*detaildto.getPrice();
            }
         }
         for(PurchaseFormDTO purchasedto : purchaseFormList) {
            for(Purchase_DetailDTO detaildto : purchasedto.getDetails()) {
               expend += detaildto.getQuantity()*detaildto.getPrice();
            }
         }
         
         detailDTO.setDailyBalanceDetailId("_0");
         detailDTO.setAccountingTitle("부가세대급금");
         detailDTO.setCreditCash(income/10);
         detailDTO.setDebitCash(expend/10);
         dtbDTO.getDetails().add(detailDTO);
         
         detailDTO = new DailyBalanceDetailDTO();
         detailDTO.setDailyBalanceDetailId("_1");
         detailDTO.setAccountingTitle("원재료대금");
         detailDTO.setCreditCash(0);
         detailDTO.setDebitCash(expend);
         dtbDTO.getDetails().add(detailDTO);
         
         detailDTO = new DailyBalanceDetailDTO();
         detailDTO.setDailyBalanceDetailId("_2");
         detailDTO.setAccountingTitle("제품매출");
         detailDTO.setCreditCash(income);
         detailDTO.setDebitCash(0);
         dtbDTO.getDetails().add(detailDTO);
         
         dtbDTO.setRegistDate(registDate);
         dtbDTO.setValidation(1);
         
         System.out.println(dtbDTO);
         dtb_repository.save(dtbDTO);
         //계산 끝
         
         transactionManager.commit(status);
         
      } catch (Exception e) {
         transactionManager.rollback(status);
      }
   }
}