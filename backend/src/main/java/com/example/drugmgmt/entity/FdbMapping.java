package com.example.drugmgmt.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "fdb_mappings")
public class FdbMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "drug_id")
    private Drug drug;

    private String fdbDrugId;

    private String gcnSeqNo;

    private String gpi;

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

    public String getFdbDrugId() {
        return fdbDrugId;
    }

    public void setFdbDrugId(String fdbDrugId) {
        this.fdbDrugId = fdbDrugId;
    }

    public String getGcnSeqNo() {
        return gcnSeqNo;
    }

    public void setGcnSeqNo(String gcnSeqNo) {
        this.gcnSeqNo = gcnSeqNo;
    }

    public String getGpi() {
        return gpi;
    }

    public void setGpi(String gpi) {
        this.gpi = gpi;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
