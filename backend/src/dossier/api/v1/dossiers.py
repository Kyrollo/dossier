from __future__ import annotations

from fastapi import APIRouter, HTTPException, status
from src.dossier.domain.entities import DueDiligenceDossier, ResearchRequest
from src.dossier.services.store import store
from src.dossier.services.synthesis_engine import UpstreamOllamaError, generate_due_diligence_dossier

router = APIRouter(prefix="/dossiers", tags=["dossiers"])


@router.get("", response_model=list[DueDiligenceDossier])
async def list_dossiers() -> list[DueDiligenceDossier]:
    """Retrieve all tracked enterprise due diligence dossiers."""
    return list(store.dossiers.values())


@router.get("/{dossier_id}", response_model=DueDiligenceDossier)
async def get_dossier(dossier_id: str) -> DueDiligenceDossier:
    """Retrieve detailed due diligence dossier with leadership, financials, and risk taxonomy."""
    dossier = store.dossiers.get(dossier_id)
    if not dossier:
        raise HTTPException(status_code=404, detail=f"Dossier {dossier_id} not found")
    return dossier


@router.post("/generate", response_model=DueDiligenceDossier)
async def generate_dossier(req: ResearchRequest) -> DueDiligenceDossier:
    """
    Triggers autonomous multi-source due diligence investigation on target company.
    Synthesizes executive briefing and risk score using local GPU Ollama.
    """
    if not req.company_name.strip():
        raise HTTPException(status_code=400, detail="Target company name cannot be empty")

    try:
        dossier = await generate_due_diligence_dossier(req)
        store.dossiers[dossier.id] = dossier
        return dossier
    except UpstreamOllamaError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "type": "https://dossier.ai/errors/upstream-unavailable",
                "title": "Local GPU LLM Engine Unavailable",
                "status": 503,
                "detail": str(exc),
            },
        )
