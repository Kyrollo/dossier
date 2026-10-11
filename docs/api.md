# Dossier REST API Reference

The Dossier API runs on port 8006 (or configured port) under prefix `/api/v1`.

---

## Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/info` | Service metadata, architecture archetype, and version. |
| `GET` | `/api/v1/readyz` | Liveness and dependency readiness probes. |
| `GET` | `/api/v1/dossiers` | List all tracked enterprise due diligence dossiers. |
| `GET` | `/api/v1/dossiers/{id}` | Retrieve complete due diligence dossier with leadership and risks. |
| `POST` | `/api/v1/dossiers/generate` | Autonomous investigation and local GPU executive synthesis. |

---

## Detailed Endpoint Specifications

### 1. `POST /api/v1/dossiers/generate`
Executes autonomous corporate investigation on a target enterprise, parsing leadership, financials, and multi-pillar risk factors, and invoking local GPU Ollama (`qwen2.5:0.5b`) for an executive briefing.

**Request Body:**
```json
{
  "company_name": "Aetheria Cloud Infrastructure",
  "ticker": "AETH",
  "industry": "Distributed Cloud & AI Orchestration",
  "focus_areas": [
    "Regulatory Compliance",
    "Executive Leadership",
    "Revenue Growth"
  ],
  "model": "qwen2.5:0.5b"
}
```

**Response (HTTP 200 OK):**
```json
{
  "id": "dos_c83f910a",
  "company_name": "Aetheria Cloud Infrastructure",
  "ticker": "AETH",
  "industry": "Distributed Cloud & AI Orchestration",
  "founded_year": 2020,
  "headquarters": "San Francisco, CA / Zurich, Switzerland",
  "employees": "620 FTEs",
  "risk_score": 68,
  "executive_summary": "Aetheria Cloud Infrastructure demonstrates exceptional topline momentum ($210M ARR)...",
  "executives": [
    {
      "name": "Dr. Julian Sterling",
      "title": "Chief Executive Officer",
      "bio": "Former Director of Infrastructure at AWS; PhD in Distributed Systems from ETH Zurich.",
      "tenure_years": 5.0,
      "prior_roles": ["Director AWS", "Principal Architect VMware"]
    }
  ],
  "financials": [
    {
      "metric_name": "Annual Recurring Revenue (ARR)",
      "value": "$210.0",
      "unit": "Million USD",
      "period": "FY2025",
      "yoy_growth": "+55%"
    }
  ],
  "risks": [
    {
      "id": "rf-1",
      "category": "REGULATORY",
      "severity": "HIGH",
      "title": "EU AI Act Article 53 Training Data Lineage",
      "description": "Obligation to disclose copyright provenance for pre-trained weights...",
      "evidence_source": "EU Official Journal / SEC 10-K Item 1A",
      "impact_score": 8
    }
  ],
  "evidence_sources": [
    {
      "id": "ev-101",
      "title": "Form 10-K Annual Corporate Filing (SEC)",
      "url": "https://sec.gov/edgar/data/0001899201/aeth-10k-2025",
      "publication_date": "2026-02-18",
      "excerpt": "Audited financial statements confirming $210M ARR...",
      "confidence_score": 0.99
    }
  ],
  "generated_at": "2026-10-11T14:15:00Z",
  "model": "qwen2.5:0.5b",
  "latency_ms": 3867.7
}
```

**Error Response (HTTP 503 Service Unavailable — RFC 7807):**
```json
{
  "type": "https://dossier.ai/errors/upstream-unavailable",
  "title": "Local GPU LLM Engine Unavailable",
  "status": 503,
  "detail": "Connection failure to local GPU Ollama at http://127.0.0.1:11434/chat/completions"
}
```
