package com.mutualfunds.service;

import com.mutualfunds.model.MutualFund;
import com.mutualfunds.repository.MutualFundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MutualFundService {

    @Autowired
    private MutualFundRepository mutualFundRepository;

    public MutualFund addFund(MutualFund fund) {
        fund.setLastUpdated(LocalDate.now());
        return mutualFundRepository.save(fund);
    }

    public List<MutualFund> getAllFunds() {
        return mutualFundRepository.findAll();
    }

    public MutualFund getFundById(Long id) {
        return mutualFundRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mutual fund not found"));
    }

	
}
