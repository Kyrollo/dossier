# Dossier Evaluation & Benchmark Harness

This document describes the reproducible evaluation methodology, metrics, and Service Level Agreement (SLA) verification for Dossier.

---

## 1. Running the Benchmark

Ensure local Ollama GPU is running warm at `http://127.0.0.1:11434` with model `qwen2.5:0.5b`:

```bash
cd e:\Jobs\projects\dossier
python evaluation/harness/runner.py
```

Outputs generated:
- `evaluation/reports/latest_eval.json`: Raw telemetry data.
- `evaluation/reports/dossier_research_metrics.svg`: Metric visualization card.
- `evaluation/reports/report.md`: Markdown summary.

---

## 2. Benchmark Metrics & SLA Targets

| Benchmark Phase | Target SLA | Measured Baseline | Result |
| :--- | :--- | :--- | :--- |
| **Information Extraction Latency** | < 2,000 µs | **749.7 µs** | PASS |
| **Executive Profiles Extracted** | > 2 profiles | **3 profiles** | PASS |
| **Risk Factors Categorized** | Multi-pillar taxonomy | **3 factors (Reg, Leg, Mkt)** | PASS |
| **Composite Risk Rating** | 0 to 100 range | **56 / 100** | PASS |
| **Local GPU Synthesis Latency** | < 10,000 ms | **3,867 ms** | PASS |
| **Verifiable Footnotes Precision** | 100% grounded filings | **100% verified** | PASS |

---

## 3. Zero-Simulation Enforcement

Dossier strictly bans simulated, fake, or mock implementations. Validate at any time:

```bash
python e:\Jobs\shared\foundation\scripts\check_no_simulation.py -p e:\Jobs\projects\dossier
```
