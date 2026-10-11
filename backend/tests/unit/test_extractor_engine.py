from __future__ import annotations

from src.dossier.domain.entities import RiskCategory, RiskSeverity
from src.dossier.services.extractor_engine import (
    calculate_dossier_risk_score,
    extract_key_executives,
    extract_risk_factors,
)


def test_extract_key_executives() -> None:
    text = "Company leadership includes CEO: Sarah Connor, CTO: John Reese, and CFO: Miles Dyson."
    execs = extract_key_executives(text)

    assert len(execs) == 3
    titles = {e.title for e in execs}
    names = {e.name for e in execs}
    assert "Chief Executive Officer" in titles
    assert "Sarah Connor" in names
    assert "John Reese" in names


def test_extract_risk_factors_and_score() -> None:
    text = (
        "The company is currently facing intense regulatory investigation by the SEC and EU authorities "
        "along with active patent infringement lawsuits from direct competitors."
    )
    risks = extract_risk_factors("Cyberdyne Corp", text)

    assert len(risks) >= 2
    cats = {r.category for r in risks}
    assert RiskCategory.REGULATORY in cats
    assert RiskCategory.LEGAL in cats

    score = calculate_dossier_risk_score(risks)
    assert score >= 50  # Elevated risk due to High severity regulatory and legal
