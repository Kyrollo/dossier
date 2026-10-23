import { DueDiligenceDossier, ResearchRequest } from '../types/dossier';

const API_BASE = '/api/v1';

export async function fetchDossiers(): Promise<DueDiligenceDossier[]> {
  const res = await fetch(`${API_BASE}/dossiers`);
  if (!res.ok) throw new Error(`Failed to fetch dossiers: ${res.statusText}`);
  return res.json();
}

export async function fetchDossier(id: string): Promise<DueDiligenceDossier> {
  const res = await fetch(`${API_BASE}/dossiers/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch dossier ${id}: ${res.statusText}`);
  return res.json();
}

export async function generateDossier(
  req: ResearchRequest
): Promise<DueDiligenceDossier> {
  const res = await fetch(`${API_BASE}/dossiers/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err.detail?.detail || err.detail || `Research failed (${res.status})`;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }
  return res.json();
}
