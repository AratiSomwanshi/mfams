package com.mutualfunds.dto;

import java.math.BigDecimal;

public class BuySellRequestDTO {
    private String fundCode;  
    private BigDecimal units;

    public BuySellRequestDTO() {}

    public BuySellRequestDTO(String fundCode, BigDecimal units) {
        this.fundCode = fundCode;
        this.units = units;
    }

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    public BigDecimal getUnits() {
        return units;
    }

    public void setUnits(BigDecimal units) {
        this.units = units;
    }
}