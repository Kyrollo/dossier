from __future__ import annotations

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_list_dossiers(client: AsyncClient) -> None:
    resp = await client.get("/api/v1/dossiers")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) >= 2
    assert any(d["ticker"] == "AETH" for d in data)


@pytest.mark.asyncio
async def test_get_dossier_detail(client: AsyncClient) -> None:
    resp = await client.get("/api/v1/dossiers/dos-aeth-101")
    assert resp.status_code == 200
    dos = resp.json()
    assert dos["id"] == "dos-aeth-101"
    assert dos["company_name"] == "Aetheria Cloud Infrastructure"
    assert dos["risk_score"] == 68
    assert len(dos["executives"]) >= 3
    assert len(dos["financials"]) >= 3
    assert len(dos["risks"]) >= 3
    assert len(dos["evidence_sources"]) >= 2


@pytest.mark.asyncio
async def test_get_system_info(client: AsyncClient) -> None:
    resp = await client.get("/api/v1/info")
    assert resp.status_code == 200
    info = resp.json()
    assert info["slug"] == "dossier"
