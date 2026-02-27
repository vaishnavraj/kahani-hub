package com.example.drugmgmt.controller;

import com.example.drugmgmt.entity.Drug;
import com.example.drugmgmt.entity.FdbMapping;
import com.example.drugmgmt.repository.DrugRepository;
import com.example.drugmgmt.repository.FdbMappingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fdb-mappings")
@CrossOrigin(origins = "*")
public class FdbMappingController {

    private final FdbMappingRepository fdbMappingRepository;
    private final DrugRepository drugRepository;

    public FdbMappingController(FdbMappingRepository fdbMappingRepository, DrugRepository drugRepository) {
        this.fdbMappingRepository = fdbMappingRepository;
        this.drugRepository = drugRepository;
    }

    @GetMapping("/{drugId}")
    public ResponseEntity<FdbMapping> getByDrug(@PathVariable Long drugId) {
        return fdbMappingRepository.findByDrugId(drugId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{drugId}")
    public ResponseEntity<FdbMapping> upsert(@PathVariable Long drugId, @RequestBody FdbMapping payload) {
        Drug drug = drugRepository.findById(drugId).orElse(null);
        if (drug == null) {
            return ResponseEntity.notFound().build();
        }
        FdbMapping mapping = fdbMappingRepository.findByDrugId(drugId).orElseGet(FdbMapping::new);
        mapping.setDrug(drug);
        mapping.setFdbDrugId(payload.getFdbDrugId());
        mapping.setGcnSeqNo(payload.getGcnSeqNo());
        mapping.setGpi(payload.getGpi());
        mapping.setNotes(payload.getNotes());
        return ResponseEntity.ok(fdbMappingRepository.save(mapping));
    }
}
