package com.example.drugmgmt.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "clinical_blocks")
public class ClinicalBlock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "drug_id")
    private Drug drug;

    private boolean blackBoxWarning;

    private boolean highAlert;

    private boolean lookAlikeSoundAlike;

    private String pregnancyCategory;

    private boolean avoidInLactation;

    private boolean requiresRenalAdjustment;

    private boolean requiresHepaticAdjustment;

    @Column(length = 2000)
    private String notes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public boolean isBlackBoxWarning() {
        return blackBoxWarning;
    }

    public void setBlackBoxWarning(boolean blackBoxWarning) {
        this.blackBoxWarning = blackBoxWarning;
    }

    public boolean isHighAlert() {
        return highAlert;
    }

    public void setHighAlert(boolean highAlert) {
        this.highAlert = highAlert;
    }

    public boolean isLookAlikeSoundAlike() {
        return lookAlikeSoundAlike;
    }

    public void setLookAlikeSoundAlike(boolean lookAlikeSoundAlike) {
        this.lookAlikeSoundAlike = lookAlikeSoundAlike;
    }

    public String getPregnancyCategory() {
        return pregnancyCategory;
    }

    public void setPregnancyCategory(String pregnancyCategory) {
        this.pregnancyCategory = pregnancyCategory;
    }

    public boolean isAvoidInLactation() {
        return avoidInLactation;
    }

    public void setAvoidInLactation(boolean avoidInLactation) {
        this.avoidInLactation = avoidInLactation;
    }

    public boolean isRequiresRenalAdjustment() {
        return requiresRenalAdjustment;
    }

    public void setRequiresRenalAdjustment(boolean requiresRenalAdjustment) {
        this.requiresRenalAdjustment = requiresRenalAdjustment;
    }

    public boolean isRequiresHepaticAdjustment() {
        return requiresHepaticAdjustment;
    }

    public void setRequiresHepaticAdjustment(boolean requiresHepaticAdjustment) {
        this.requiresHepaticAdjustment = requiresHepaticAdjustment;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
