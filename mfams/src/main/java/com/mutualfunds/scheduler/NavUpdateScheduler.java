package com.mutualfunds.scheduler;

import com.mutualfunds.model.MutualFund;
import com.mutualfunds.repository.MutualFundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Component
public class NavUpdateScheduler {

    @Autowired
    private MutualFundRepository mutualFundRepository;

    private final Random random = new Random();

   
    @Scheduled(cron = "0 0 0 * * ?")  
    public void updateNavs() {
        List<MutualFund> funds = mutualFundRepository.findAll();

        for (MutualFund fund : funds) {
            BigDecimal nav = fund.getNav();
            BigDecimal change = nav.multiply(BigDecimal.valueOf((random.nextDouble() * 4 - 2) / 100)); 
            BigDecimal newNav = nav.add(change).setScale(2, RoundingMode.HALF_UP);
            fund.setNav(newNav);
            fund.setLastUpdated(LocalDate.now());
        }

        mutualFundRepository.saveAll(funds);
        System.out.println("✅ NAVs updated by scheduler: " + LocalDate.now());
    }
}
