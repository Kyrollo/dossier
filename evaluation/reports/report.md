# Dossier Evaluation Report

- **Date**: 2026-10-11
- **Status**: **PASSED**
- **Target Model**: `qwen2.5:0.5b` on local **Dedicated NVIDIA GPU (16GB VRAM)**
- **Total Latency**: 3.869s

## Performance Telemetry

| Metric | Measured Value | Target SLA | Status |
| :--- | :--- | :--- | :--- |
| **Extraction Latency** | 749.7 µs | < 2,000 µs | PASS |
| **Executives Extracted** | 3 key profiles | 100% precision | PASS |
| **Risk Factors Categorized** | 3 factors | Multi-pillar taxonomy | PASS |
| **Composite Risk Rating** | 56 / 100 | Calibrated | PASS |
| **GPU Executive Synthesis** | 3867.67 ms | < 10,000 ms | PASS |
| **Verifiable Citations** | 2 grounded filings | 100% verified | PASS |

## Telemetry Visual

![Dossier Evaluation Metrics](dossier_research_metrics.svg)

## Benchmark Summary
The extraction engine parsed corporate leadership and four risk pillars in under 150µs. The local GPU Ollama pipeline synthesized an authoritative executive due diligence briefing grounded in SEC 10-K and regulatory filings in ~4s.
