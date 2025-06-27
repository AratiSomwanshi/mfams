
package com.mutualfunds.controller;

import com.mutualfunds.config.JwtUtil;
import com.mutualfunds.dto.BuySellRequestDTO;
import com.mutualfunds.dto.TransactionDTO;
import com.mutualfunds.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private JwtUtil jwtUtil;


    @PreAuthorize("hasRole('USER')")
    @PostMapping("/buy")
    public ResponseEntity<TransactionDTO> buy(@RequestBody BuySellRequestDTO request,
                                              @RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractUsername(authHeader.substring(7));
        TransactionDTO txn = transactionService.buyFund(email, request);
        return ResponseEntity.ok(txn);
    }

  
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/sell")
    public ResponseEntity<TransactionDTO> sell(@RequestBody BuySellRequestDTO request,
                                               @RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractUsername(authHeader.substring(7));
        TransactionDTO txn = transactionService.sellFund(email, request);
        return ResponseEntity.ok(txn);
    }

    
    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAll(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractUsername(authHeader.substring(7));
        return ResponseEntity.ok(transactionService.getUserTransactions(email));
    }

    
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }
}
