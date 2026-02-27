package com.example.drugmgmt.controller;

import com.example.drugmgmt.entity.Drug;
import com.example.drugmgmt.entity.MedispanMapping;
import com.example.drugmgmt.repository.DrugRepository;
import com.example.drugmgmt.repository.MedispanMappingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medispan-mappings")
@CrossOrigin(origins = "*")
public class MedispanMappingController {

    private final MedispanMappingRepository medispanMappingRepository;
    private final DrugRepository drugRepository;

    public MedispanMappingController(MedispanMappingRepository medispanMappingRepository, DrugRepository drugRepository) {
        this.medispanMappingRepository = medispanMappingRepository;
        this.drugRepository = drugRepository;
    }

    @GetMapping("/{drugId}")
    public ResponseEntity<MedispanMapping> getByDrug(@PathVariable Long drugId) {
        return medispanMappingRepository.findByDrugId(drugId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{drugId}")
    public ResponseEntity<MedispanMapping> upsert(@PathVariable Long drugId, @RequestBody MedispanMapping payload) {
        Drug drug = drugRepository.findById(drugId).orElse(null);
        if (drug == null) {
            return ResponseEntity.notFound().build();
        }
        MedispanMapping mapping = medispanMappingRepository.findByDrugId(drugId).orElseGet(MedispanMapping::new);
        mapping.setDrug(drug);
        mapping.setMedispanDrugId(payload.getMedispanDrugId());
        mapping.setGpi(payload.getGpi());
        mapping.setNotes(payload.getNotes());
        return ResponseEntity.ok(medispanMappingRepository.save(mapping));
    }
}
