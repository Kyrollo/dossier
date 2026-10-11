# Dossier Data Model

This document outlines the domain entities, relationships, and data structures utilized by Dossier for corporate due diligence and autonomous intelligence synthesis.

---

## 1. Domain Entity Relationship Diagram

```mermaid
classDiagram
    class DueDiligenceDossier {
        +string id
        +string company_name
        +string ticker
        +string industry
        +int founded_year
        +string headquarters
        +string employees
        +int risk_score
        +string executive_summary
        +list~ExecutiveProfile~ executives
        +list~FinancialMetric~ financials
        +list~RiskFactor~ risks
        +list~SourceEvidence~ evidence_sources
        +string generated_at
        +string model
        +float latency_ms
    }

    class ExecutiveProfile {
        +string name
        +string title
        +string bio
        +float tenure_years
        +list~string~ prior_roles
    }

    class FinancialMetric {
        +string metric_name
        +string value
        +string unit
        +string period
        +string yoy_growth
    }

    class RiskFactor {
        +string id
        +RiskCategory category
        +RiskSeverity severity
        +string title
        +string description
        +string evidence_source
        +int impact_score
    }

    class SourceEvidence {
        +string id
        +string title
        +string url
        +string publication_date
        +string excerpt
        +float confidence_score
    }

    DueDiligenceDossier "1" *-- "many" ExecutiveProfile : leadership
    DueDiligenceDossier "1" *-- "many" FinancialMetric : metrics
    DueDiligenceDossier "1" *-- "many" RiskFactor : risks
    DueDiligenceDossier "1" *-- "many" SourceEvidence : citations
```

---

## 2. Enums and Classification

### RiskCategory
- `REGULATORY`: Cross-jurisdictional compliance, EU AI Act, GDPR, SEC disclosures.
- `LEGAL`: Intellectual property lawsuits, patent litigation, active court dockets.
- `MARKET`: Cloud marketplace take-rates, margin compression, pricing pressure.
- `OPERATIONAL`: Infrastructure dependencies, key personnel reliance, cluster outages.
- `FINANCIAL`: Debt covenants, customer concentration, burn rate.

### RiskSeverity
- `HIGH`: Major regulatory action, federal lawsuit, or existential market disruption (Weight: 28).
- `MEDIUM`: Operational friction, margin compression, or compliance audit overhead (Weight: 14).
- `LOW`: Routine supplier dependency or manageable talent turnover (Weight: 6).
