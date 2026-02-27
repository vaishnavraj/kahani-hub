package com.example.drugmgmt.repository;

import com.example.drugmgmt.entity.FdbMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FdbMappingRepository extends JpaRepository<FdbMapping, Long> {

    Optional<FdbMapping> findByDrugId(Long drugId);
}
