package com.example.drugmgmt.repository;

import com.example.drugmgmt.entity.Drug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

    List<Drug> findByGenericNameContainingIgnoreCaseOrBrandNameContainingIgnoreCase(String generic, String brand);
}
