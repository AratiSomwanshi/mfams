package com.mutualfunds.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.mutualfunds.model.TransactionType;

public class TransactionDTO {
    private Long id;
    private TransactionType type;
    private BigDecimal units;
    private BigDecimal amount;
    private LocalDate transactionDate;
    private String mutualFundCode;
    private String mutualFundName;

    public TransactionDTO() {}

    public TransactionDTO(Long id, TransactionType type, BigDecimal units, BigDecimal amount, LocalDate transactionDate, String mutualFundCode, String mutualFundName) {
        this.id = id;
        this.type = type;
        this.units = units;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.mutualFundCode = mutualFundCode;
        this.mutualFundName = mutualFundName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TransactionType getType() { 
    	return type; 
   	}
    public void setType(TransactionType type) {
    	this.type = type; 
    }

    public BigDecimal getUnits() {
        return units;
    }

    public void setUnits(BigDecimal units) {
        this.units = units;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getMutualFundCode() {
        return mutualFundCode;
    }

    public void setMutualFundCode(String mutualFundCode) {
        this.mutualFundCode = mutualFundCode;
    }

    public String getMutualFundName() {
        return mutualFundName;
    }

    public void setMutualFundName(String mutualFundName) {
        this.mutualFundName = mutualFundName;
    }
}