package com.popble.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popble.domain.Payments;

public interface PaymentsRepository extends JpaRepository<Payments, Long> {

}
