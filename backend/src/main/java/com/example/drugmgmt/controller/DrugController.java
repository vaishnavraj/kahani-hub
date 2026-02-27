package com.example.drugmgmt.controller;

import com.example.drugmgmt.entity.Drug;
import com.example.drugmgmt.repository.DrugRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drugs")
@CrossOrigin(origins = "*")
public class DrugController {

    private final DrugRepository drugRepository;

    public DrugController(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    @GetMapping
    public List<Drug> list(@RequestParam(value = "q", required = false) String q) {
        if (q == null || q.isBlank()) {
            return drugRepository.findAll();
        }
        return drugRepository.findByGenericNameContainingIgnoreCaseOrBrandNameContainingIgnoreCase(q, q);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Drug> get(@PathVariable Long id) {
        return drugRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Drug create(@RequestBody Drug drug) {
        drug.setId(null);
        return drugRepository.save(drug);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Drug> update(@PathVariable Long id, @RequestBody Drug updated) {
        return drugRepository.findById(id)
                .map(existing -> {
                    existing.setGenericName(updated.getGenericName());
                    existing.setBrandName(updated.getBrandName());
                    existing.setNdc(updated.getNdc());
                    existing.setStrength(updated.getStrength());
                    existing.setDosageForm(updated.getDosageForm());
                    existing.setRoute(updated.getRoute());
                    existing.setDeaSchedule(updated.getDeaSchedule());
                    existing.setStatus(updated.getStatus());
                    existing.setNotes(updated.getNotes());
                    return ResponseEntity.ok(drugRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
