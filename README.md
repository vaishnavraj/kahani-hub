# Drug Management System (Demo)

This is a browser-based **drug management system** implemented with plain HTML, CSS, and JavaScript. 

It simulates a local formulary with multiple forms/blocks inspired by FDB / Medi-Span style data models but **does not use any real proprietary data**.

## Features

- **Drug Master**
  - Add/edit local drug records (generic, brand, NDC, strength, route, form, DEA/schedule, notes)
  - Search/filter across the drug list
  - Click a row to load a drug back into the form for editing

- **FDB Mapping (Simulated)**
  - Attach simulated FDB-style identifiers (Drug ID, GCN Seq No, GPI) to your local drugs
  - Edit mappings by clicking a row

- **Medi-Span Mapping (Simulated)**
  - Attach simulated Medi-Span identifiers (Drug ID, GPI) to your local drugs
  - Edit mappings by clicking a row

- **Clinical Blocks**
  - Capture high-level clinical attributes per drug (black box, high-alert, LASA, pregnancy, lactation, renal/hepatic flags, notes)
  - See an overview table of clinical attributes per drug

- **Persistence**
  - All data is stored in `localStorage` in the browser; it remains on the same device and browser until you clear it.

## Run

Open `index.html` directly in your browser, or start a small local server (recommended for some browsers):

```bash
cd path/to/copilot
python -m http.server 4200
```

Then open:

- http://localhost:4200

## Project structure

- [index.html](index.html) – Main page shell and layout
- [assets/css/drug-mgmt.css](assets/css/drug-mgmt.css) – Styles
- [assets/js/drug-mgmt.js](assets/js/drug-mgmt.js) – Application logic and state management

## Important note

This project **does not ship with FDB or Medi-Span data** and does not integrate their commercial APIs. 
All identifiers and mappings are **purely simulated** so you can explore the structure and forms safely. 
To connect to a real drug database, you would replace the simulated identifiers with calls to your licensed data source.
