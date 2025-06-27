package com.mutualfunds.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class MutualFundDTO {
    private String fundName;
    private String fundCode;
    private String category;
    private BigDecimal nav;
    private LocalDate lastUpdated;

    public MutualFundDTO() {}

    public MutualFundDTO(String fundName, String fundCode, String category, BigDecimal nav, LocalDate lastUpdated) {
        this.fundName = fundName;
        this.fundCode = fundCode;
        this.category = category;
        this.nav = nav;
        this.lastUpdated = lastUpdated;
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
}
