package com.mutualfunds.repository;

import com.mutualfunds.model.Transaction;
import com.mutualfunds.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}
