package com.example.drugmgmt.repository;

import com.example.drugmgmt.entity.MedispanMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedispanMappingRepository extends JpaRepository<MedispanMapping, Long> {

    Optional<MedispanMapping> findByDrugId(Long drugId);
}
