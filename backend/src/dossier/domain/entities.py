from __future__ import annotations

from enum import Enum
from pydantic import BaseModel, Field


class RiskCategory(str, Enum):
    REGULATORY = "REGULATORY"
    OPERATIONAL = "OPERATIONAL"
    MARKET = "MARKET"
    LEGAL = "LEGAL"
    FINANCIAL = "FINANCIAL"


class RiskSeverity(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class RiskFactor(BaseModel):
    id: str
    category: RiskCategory
    severity: RiskSeverity
    title: str
    description: str
    evidence_source: str
    impact_score: int  # 1 to 10


class ExecutiveProfile(BaseModel):
    name: str
    title: str
    bio: str
    tenure_years: float = 1.0
    prior_roles: list[str] = Field(default_factory=list)


class FinancialMetric(BaseModel):
    metric_name: str
    value: str
    unit: str
    period: str
    yoy_growth: str | None = None


class SourceEvidence(BaseModel):
    id: str
    title: str
    url: str
    publication_date: str
    excerpt: str
    confidence_score: float = 0.95


class DueDiligenceDossier(BaseModel):
    id: str
    company_name: str
    ticker: str | None = None
    industry: str
    founded_year: int
    headquarters: str
    employees: str
    risk_score: int  # 0 to 100
    executive_summary: str
    executives: list[ExecutiveProfile] = Field(default_factory=list)
    financials: list[FinancialMetric] = Field(default_factory=list)
    risks: list[RiskFactor] = Field(default_factory=list)
    evidence_sources: list[SourceEvidence] = Field(default_factory=list)
    generated_at: str
    model: str = "qwen2.5:0.5b"
    latency_ms: float = 0.0


class ResearchRequest(BaseModel):
    company_name: str
    ticker: str | None = None
    industry: str = "Technology & Cloud Software"
    focus_areas: list[str] = Field(
        default_factory=lambda: ["Regulatory Compliance", "Executive Background", "Revenue Growth", "Litigation Risk"]
    )
    model: str = "qwen2.5:0.5b"
