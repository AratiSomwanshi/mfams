package com.mutualfunds.service;

import com.mutualfunds.dto.BuySellRequestDTO;
import com.mutualfunds.dto.TransactionDTO;
import com.mutualfunds.model.*;
import com.mutualfunds.repository.MutualFundRepository;
import com.mutualfunds.repository.TransactionRepository;
import com.mutualfunds.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private MutualFundRepository mutualFundRepository;

    @Autowired
    private UserRepository userRepository;

    public TransactionDTO buyFund(String email, BuySellRequestDTO request) {
        return createTransaction(email, request, TransactionType.BUY);
    }

    public TransactionDTO sellFund(String email, BuySellRequestDTO request) {
        return createTransaction(email, request, TransactionType.SELL);
    }

    private TransactionDTO createTransaction(String email, BuySellRequestDTO request, TransactionType type) {
        User user = userRepository.findByEmail(email).orElseThrow();
        MutualFund fund = mutualFundRepository.findByFundCode(request.getFundCode()).orElseThrow();

        BigDecimal amount = fund.getNav().multiply(request.getUnits());

        Transaction txn = new Transaction();
        txn.setType(type);
        txn.setUnits(request.getUnits());
        txn.setAmount(amount);
        txn.setTransactionDate(LocalDate.now());
        txn.setUser(user);
        txn.setMutualFund(fund);

        Transaction saved = transactionRepository.save(txn);
        return toDTO(saved);
    }

    public List<TransactionDTO> getUserTransactions(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return transactionRepository.findByUser(user).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TransactionDTO getTransactionById(Long id) {
        Transaction t = transactionRepository.findById(id).orElseThrow();
        return toDTO(t);
    }

    private TransactionDTO toDTO(Transaction t) {
        return new TransactionDTO(
                t.getId(),
                t.getType(),
                t.getUnits(),
                t.getAmount(),
                t.getTransactionDate(),
                t.getMutualFund().getFundCode(),
                t.getMutualFund().getFundName()
        );
    }
}
