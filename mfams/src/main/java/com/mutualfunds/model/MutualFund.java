package com.mutualfunds.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "mutual_funds")
public class MutualFund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fundName;

    @Column(unique = true)
    private String fundCode;

    private String category; // Equity, Debt, Hybrid

    private BigDecimal nav;

    private LocalDate lastUpdated;

    @OneToMany(mappedBy = "mutualFund", cascade = CascadeType.ALL)
    private List<Transaction> transactions;

    public MutualFund() {
    }

    public MutualFund(Long id, String fundName, String fundCode, String category, BigDecimal nav, LocalDate lastUpdated, List<Transaction> transactions) {
        this.id = id;
        this.fundName = fundName;
        this.fundCode = fundCode;
        this.category = category;
        this.nav = nav;
        this.lastUpdated = lastUpdated;
        this.transactions = transactions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getNav() {
        return nav;
    }

    public void setNav(BigDecimal nav) {
        this.nav = nav;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
}
