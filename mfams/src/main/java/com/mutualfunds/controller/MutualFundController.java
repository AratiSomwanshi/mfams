package com.mutualfunds.controller;

import com.mutualfunds.model.MutualFund;

import com.mutualfunds.service.MutualFundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/funds")
public class MutualFundController {

    @Autowired
    private MutualFundService mutualFundService;

    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MutualFund> saveMutualFund (@RequestBody MutualFund fund) {
    	MutualFund addFund= mutualFundService.addFund(fund);
    	return new ResponseEntity<>(addFund , HttpStatus.CREATED);
    }

   
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public ResponseEntity<List<MutualFund>> getAllFunds() {
        List<MutualFund> fund=mutualFundService.getAllFunds();
    	return ResponseEntity.ok(fund);
    }

   
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public ResponseEntity<MutualFund> getFundById(@PathVariable Long id) {
        try {
            MutualFund fund = mutualFundService.getFundById(id);
            return ResponseEntity.ok(fund);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
