package com.example.drugmgmt.controller;

import com.example.drugmgmt.entity.ClinicalBlock;
import com.example.drugmgmt.entity.Drug;
import com.example.drugmgmt.repository.ClinicalBlockRepository;
import com.example.drugmgmt.repository.DrugRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clinical-blocks")
@CrossOrigin(origins = "*")
public class ClinicalBlockController {

    private final ClinicalBlockRepository clinicalBlockRepository;
    private final DrugRepository drugRepository;

    public ClinicalBlockController(ClinicalBlockRepository clinicalBlockRepository, DrugRepository drugRepository) {
        this.clinicalBlockRepository = clinicalBlockRepository;
        this.drugRepository = drugRepository;
    }

    @GetMapping("/{drugId}")
    public ResponseEntity<ClinicalBlock> getByDrug(@PathVariable Long drugId) {
        return clinicalBlockRepository.findByDrugId(drugId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{drugId}")
    public ResponseEntity<ClinicalBlock> upsert(@PathVariable Long drugId, @RequestBody ClinicalBlock payload) {
        Drug drug = drugRepository.findById(drugId).orElse(null);
        if (drug == null) {
            return ResponseEntity.notFound().build();
        }
        ClinicalBlock block = clinicalBlockRepository.findByDrugId(drugId).orElseGet(ClinicalBlock::new);
        block.setDrug(drug);
        block.setBlackBoxWarning(payload.isBlackBoxWarning());
        block.setHighAlert(payload.isHighAlert());
        block.setLookAlikeSoundAlike(payload.isLookAlikeSoundAlike());
        block.setPregnancyCategory(payload.getPregnancyCategory());
        block.setAvoidInLactation(payload.isAvoidInLactation());
        block.setRequiresRenalAdjustment(payload.isRequiresRenalAdjustment());
        block.setRequiresHepaticAdjustment(payload.isRequiresHepaticAdjustment());
        block.setNotes(payload.getNotes());
        return ResponseEntity.ok(clinicalBlockRepository.save(block));
    }
}
