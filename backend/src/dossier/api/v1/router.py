from __future__ import annotations

from fastapi import APIRouter
from .health import router as health_router
from .auth import router as auth_router
from .dossiers import router as dossiers_router

api_v1_router = APIRouter()
api_v1_router.include_router(health_router)
api_v1_router.include_router(auth_router)
api_v1_router.include_router(dossiers_router)


@api_v1_router.get("/info", tags=["info"])
async def get_system_info() -> dict[str, str]:
    return {
        "name": "Dossier",
        "slug": "dossier",
        "archetype": "Bloomberg / Financial Investigation Dossier",
        "version": "1.0.0",
        "description": "Autonomous Enterprise Research & Due Diligence Dossier: leadership graphs, financial performance, risk taxonomy, and local GPU executive synthesis",
    }
