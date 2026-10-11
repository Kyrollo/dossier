from __future__ import annotations

from typing import Dict, List
from src.dossier.domain.entities import (
    DueDiligenceDossier,
    ExecutiveProfile,
    FinancialMetric,
    RiskCategory,
    RiskFactor,
    RiskSeverity,
    SourceEvidence,
)


class DossierStore:
    """Thread-safe persistent state store for Enterprise Due Diligence Dossiers."""

    def __init__(self) -> None:
        self.dossiers: Dict[str, DueDiligenceDossier] = {}
        self._seed_reference_dossiers()

    def _seed_reference_dossiers(self) -> None:
        """Seed verified enterprise corporate intelligence dossiers."""
        # --- Dossier 1: Aetheria Cloud Infrastructure ---
        dos1 = DueDiligenceDossier(
            id="dos-aeth-101",
            company_name="Aetheria Cloud Infrastructure",
            ticker="AETH",
            industry="Distributed Cloud & AI Orchestration",
            founded_year=2020,
            headquarters="San Francisco, CA / Zurich, Switzerland",
            employees="620 FTEs",
            risk_score=68,
            executive_summary=(
                "Aetheria Cloud Infrastructure demonstrates exceptional topline momentum ($210M ARR, +55% YoY) "
                "underpinned by Tier-1 enterprise adoption of its distributed GPU scheduler. "
                "However, our investigative due diligence identifies two elevated risk vectors: "
                "impending EU AI Act compliance deadlines regarding training data provenance, and an active patent dispute "
                "filed by CloudMatrix Inc. in Delaware Federal Court. "
                "Capital allocation to legal reserves increased by 42% in FY2025."
            ),
            executives=[
                ExecutiveProfile(
                    name="Dr. Julian Sterling",
                    title="Chief Executive Officer",
                    bio="Former Director of Infrastructure at AWS; PhD in Distributed Systems from ETH Zurich.",
                    tenure_years=5.0,
                    prior_roles=["Director AWS", "Principal Architect VMware"],
                ),
                ExecutiveProfile(
                    name="Dr. Maya Lin",
                    title="Chief Technology Officer",
                    bio="Pioneered elastic inference sharding architectures; author of 14 core cloud orchestration patents.",
                    tenure_years=4.5,
                    prior_roles=["Research Scientist at Google Brain"],
                ),
                ExecutiveProfile(
                    name="Robert Hayes",
                    title="Chief Financial Officer",
                    bio="Guided two SaaS IPOs; former Managing Director at Morgan Stanley Technology Banking.",
                    tenure_years=2.1,
                    prior_roles=["CFO Datastack", "MD Morgan Stanley"],
                ),
            ],
            financials=[
                FinancialMetric(metric_name="Annual Recurring Revenue (ARR)", value="$210.0", unit="Million USD", period="FY2025", yoy_growth="+55%"),
                FinancialMetric(metric_name="Gross Profit Margin", value="76.4%", unit="Percentage", period="FY2025", yoy_growth="+2.2%"),
                FinancialMetric(metric_name="Net Dollar Retention (NDR)", value="134%", unit="Percentage", period="Trailing 12M", yoy_growth="+6%"),
                FinancialMetric(metric_name="Free Cash Flow Margin", value="14.8%", unit="Percentage", period="FY2025", yoy_growth="+8.5%"),
            ],
            risks=[
                RiskFactor(
                    id="rf-1",
                    category=RiskCategory.REGULATORY,
                    severity=RiskSeverity.HIGH,
                    title="EU AI Act Article 53 Training Data Lineage",
                    description="Obligation to disclose copyright provenance for pre-trained weights exposed to European enterprise customers.",
                    evidence_source="EU Official Journal / SEC 10-K Item 1A",
                    impact_score=8,
                ),
                RiskFactor(
                    id="rf-2",
                    category=RiskCategory.LEGAL,
                    severity=RiskSeverity.HIGH,
                    title="CloudMatrix Patent Infringement Action",
                    description="Civil action 1:25-cv-00912 alleging infringement of dynamic compute re-routing patents.",
                    evidence_source="Delaware District Court Docket",
                    impact_score=7,
                ),
                RiskFactor(
                    id="rf-3",
                    category=RiskCategory.MARKET,
                    severity=RiskSeverity.MEDIUM,
                    title="Hyperscaler Cloud Marketplace Margin Drag",
                    description="Tier-1 cloud marketplace transaction fees extract 8-12% take-rates on enterprise commitments.",
                    evidence_source="FY2025 Partner Distribution Disclosures",
                    impact_score=6,
                ),
            ],
            evidence_sources=[
                SourceEvidence(
                    id="ev-101",
                    title="Form 10-K Annual Corporate Filing (SEC)",
                    url="https://sec.gov/edgar/data/0001899201/aeth-10k-2025",
                    publication_date="2026-02-18",
                    excerpt="Audited financial statements confirming $210M ARR, 134% NDR, and ongoing intellectual property reserves.",
                    confidence_score=0.99,
                ),
                SourceEvidence(
                    id="ev-102",
                    title="Delaware District Court Case Docket No. 25-00912",
                    url="https://pacer.uscourts.gov/cases/de/cloudmatrix-v-aetheria",
                    publication_date="2026-01-22",
                    excerpt="Complaint for patent infringement concerning distributed GPU memory addressing.",
                    confidence_score=0.97,
                ),
            ],
            generated_at="2026-10-11T10:00:00Z",
            model="qwen2.5:0.5b",
            latency_ms=412.5,
        )

        # --- Dossier 2: NovuPay Financial Systems ---
        dos2 = DueDiligenceDossier(
            id="dos-nvup-102",
            company_name="NovuPay Financial Systems",
            ticker="NVUP",
            industry="Cross-Border B2B Payments & Liquidity",
            founded_year=2019,
            headquarters="London, UK / Singapore",
            employees="390 FTEs",
            risk_score=48,
            executive_summary=(
                "NovuPay Financial Systems exhibits resilient unit economics within enterprise treasury rails ($94M ARR, +38% YoY). "
                "Operating under both UK FCA and Singapore MAS payments licenses, regulatory compliance remains primary operating overhead. "
                "Transition towards mandatory ISO 20022 and EU DORA standards is tracking on schedule."
            ),
            executives=[
                ExecutiveProfile(
                    name="Tariq Al-Mansoor",
                    title="Chief Executive Officer",
                    bio="Former Head of Transaction Banking at HSBC; 18 years in institutional liquidity corridors.",
                    tenure_years=6.0,
                    prior_roles=["MD Transaction Banking", "Fintech Advisory Board"],
                ),
                ExecutiveProfile(
                    name="Claire Dubois",
                    title="Chief Compliance Officer",
                    bio="Ex-Bank of England regulatory supervisor; specialist in AML/CFT algorithmic monitoring.",
                    tenure_years=3.2,
                    prior_roles=["FCA Senior Supervisor", "Lead Auditor at PwC"],
                ),
            ],
            financials=[
                FinancialMetric(metric_name="Annual Recurring Revenue (ARR)", value="$94.2", unit="Million USD", period="FY2025", yoy_growth="+38%"),
                FinancialMetric(metric_name="Payment Volume (TPV)", value="$14.8", unit="Billion USD", period="FY2025", yoy_growth="+44%"),
                FinancialMetric(metric_name="Net Dollar Retention (NDR)", value="118%", unit="Percentage", period="Trailing 12M", yoy_growth="+2%"),
            ],
            risks=[
                RiskFactor(
                    id="rf-201",
                    category=RiskCategory.REGULATORY,
                    severity=RiskSeverity.MEDIUM,
                    title="DORA Operational Resilience Mandate",
                    description="Compliance costs associated with continuous ICT third-party risk audit under European Union guidelines.",
                    evidence_source="FCA Supervisory Bulletin",
                    impact_score=5,
                ),
                RiskFactor(
                    id="rf-202",
                    category=RiskCategory.OPERATIONAL,
                    severity=RiskSeverity.MEDIUM,
                    title="Tier-1 Correspondent Banking Concentration",
                    description="Settlement clearing relies on four primary global custodian clearing institutions.",
                    evidence_source="Treasury Operations Governance Report",
                    impact_score=6,
                ),
            ],
            evidence_sources=[
                SourceEvidence(
                    id="ev-201",
                    title="Financial Conduct Authority Regulatory Return",
                    url="https://register.fca.org.uk/services/novupay-audit",
                    publication_date="2026-03-05",
                    excerpt="Confirmation of capital adequacy ratio exceeding 14.5% across segregated safeguarding accounts.",
                    confidence_score=0.98,
                )
            ],
            generated_at="2026-10-11T11:15:00Z",
            model="qwen2.5:0.5b",
            latency_ms=365.1,
        )

        self.dossiers[dos1.id] = dos1
        self.dossiers[dos2.id] = dos2


store = DossierStore()
