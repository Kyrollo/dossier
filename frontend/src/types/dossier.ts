export type RiskCategory =
  | 'REGULATORY'
  | 'OPERATIONAL'
  | 'MARKET'
  | 'LEGAL'
  | 'FINANCIAL';

export type RiskSeverity = 'HIGH' | 'MEDIUM' | 'LOW';

export interface RiskFactor {
  id: string;
  category: RiskCategory;
  severity: RiskSeverity;
  title: string;
  description: string;
  evidence_source: string;
  impact_score: number;
}

export interface ExecutiveProfile {
  name: string;
  title: string;
  bio: string;
  tenure_years: number;
  prior_roles: string[];
}

export interface FinancialMetric {
  metric_name: string;
  value: string;
  unit: string;
  period: string;
  yoy_growth?: string | null;
}

export interface SourceEvidence {
  id: string;
  title: string;
  url: string;
  publication_date: string;
  excerpt: string;
  confidence_score: number;
}

export interface DueDiligenceDossier {
  id: string;
  company_name: string;
  ticker?: string | null;
  industry: string;
  founded_year: number;
  headquarters: string;
  employees: string;
  risk_score: number;
  executive_summary: string;
  executives: ExecutiveProfile[];
  financials: FinancialMetric[];
  risks: RiskFactor[];
  evidence_sources: SourceEvidence[];
  generated_at: string;
  model: string;
  latency_ms: number;
}

export interface ResearchRequest {
  company_name: string;
  ticker?: string | null;
  industry?: string;
  focus_areas?: string[];
  model?: string;
}
