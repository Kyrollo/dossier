from __future__ import annotations

from fastapi import APIRouter
from .health import router as health_router
from .auth import router as auth_router

api_v1_router = APIRouter()
api_v1_router.include_router(health_router)
api_v1_router.include_router(auth_router)


@api_v1_router.get("/info", tags=["info"])
async def get_system_info() -> dict[str, str]:
    return {
        "name": "Dossier",
        "slug": "dossier",
        "archetype": "Editorial / long-form",
        "version": "1.0.0",
        "description": "Agentic Deep Research Platform: autonomous market & competitor synthesis with human-in-the-loop validation and verifiable citations",
    }
