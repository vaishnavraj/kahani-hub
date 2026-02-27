package com.example.drugmgmt.repository;

import com.example.drugmgmt.entity.ClinicalBlock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClinicalBlockRepository extends JpaRepository<ClinicalBlock, Long> {

    Optional<ClinicalBlock> findByDrugId(Long drugId);
}
