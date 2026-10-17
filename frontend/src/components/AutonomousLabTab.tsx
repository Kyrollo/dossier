import React, { useState } from 'react';
import {
  DueDiligenceDossier,
  ResearchRequest,
} from '../types/dossier';
import { generateDossier } from '../lib/api';
import {
  Search,
  Sparkles,
  Building2,
  Cpu,
  Clock,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Zap,
} from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface AutonomousLabTabProps {
  onDossierGenerated: (dossier: DueDiligenceDossier) => void;
}

const PRESET_COMPANIES = [
  {
    name: 'Anthropic PBC',
    ticker: 'PRIVATE',
    industry: 'Frontier AI Research & LLM Alignment',
    focus: ['EU AI Act & Red-Teaming Lineage', 'AWS & Google Compute Commitments', 'Executive Governance'],
  },
  {
    name: 'Stripe Inc',
    ticker: 'PRIVATE',
    industry: 'Global Payments & Financial Infrastructure',
    focus: ['Cross-Border Money Transmission Licenses', 'Revenue Trajectory & Gross Margin', 'Acquisition Integrations'],
  },
  {
    name: 'Databricks Inc',
    ticker: 'PRIVATE',
    industry: 'Data Intelligence & Lakehouse Cloud Software',
    focus: ['Enterprise NDR & Market Concentration', 'Hyperscaler Compute Egress', 'IP & Patent Portfolio'],
  },
];

export const AutonomousLabTab: React.FC<AutonomousLabTabProps> = ({
  onDossierGenerated,
}) => {
  const [companyName, setCompanyName] = useState('Anthropic PBC');
  const [ticker, setTicker] = useState('PRIVATE');
  const [industry, setIndustry] = useState('Frontier AI Research & LLM Alignment');
  const [focusAreas, setFocusAreas] = useState<string[]>([
    'Regulatory Compliance',
    'Executive Background',
    'Revenue Growth',
    'Litigation Risk',
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DueDiligenceDossier | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPreset = (p: typeof PRESET_COMPANIES[0]) => {
    setCompanyName(p.name);
    setTicker(p.ticker);
    setIndustry(p.industry);
    setFocusAreas(p.focus);
    setResult(null);
    setError(null);
  };

  const handleRunInvestigation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const dos = await generateDossier({
        company_name: companyName,
        ticker: ticker || undefined,
        industry,
        focus_areas: focusAreas,
        model: 'qwen2.5:0.5b',
      });
      setResult(dos);
      onDossierGenerated(dos);
    } catch (err: any) {
      setError(err.message || 'Investigation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] overflow-hidden bg-background">
      {/* Left Column: Research Configuration (6 cols) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-border bg-card/20">
        <div className="p-4 border-b border-border flex items-center justify-between bg-card/40">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-foreground">
              Autonomous Investigation Workbench
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">Local GPU Inference Pipeline</span>
        </div>

        <form onSubmit={handleRunInvestigation} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Preset Targets */}
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Select Enterprise Diligence Target Preset:
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COMPANIES.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleSelectPreset(p)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg border font-medium transition-colors text-left ${
                    companyName === p.name
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-muted/60 border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Company Name & Ticker */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full text-xs font-mono py-2 px-3 bg-muted/80 border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Ticker
              </label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="w-full text-xs font-mono py-2 px-3 bg-muted/80 border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">
              Industry Vertical
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full text-xs font-mono py-2 px-3 bg-muted/80 border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>

          {/* Focus Areas */}
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Active Focus Areas ({focusAreas.length})
            </label>
            <div className="flex flex-wrap gap-1.5">
              {focusAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-muted border border-border text-foreground"
                >
                  ✓ {area}
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !companyName.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md shadow-amber-600/20"
            >
              {isLoading ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-amber-200" />
                  <span>Synthesizing Due Diligence Dossier...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Synthesize Due Diligence Dossier</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Live Output & Report Preview (6 cols) */}
      <div className="w-full lg:w-[480px] flex flex-col h-full overflow-hidden bg-card/60 backdrop-blur-md">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-foreground">Synthesis Telemetry</h2>
          </div>
          {result && (
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                {result.latency_ms}ms
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
              {error}
            </div>
          )}

          {result ? (
            <div className="space-y-4">
              {/* Header result */}
              <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground">
                    {result.company_name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                    Risk: {result.risk_score}/100
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {result.industry} • Generated at {result.generated_at}
                </p>
              </div>

              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Executive Due Diligence Summary
                </h4>
                <MarkdownRenderer content={result.executive_summary} defaultMaxHeight="max-h-[420px]" />
              </div>

              {/* Key Executives */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Extracted Corporate Leadership ({result.executives.length})
                </h4>
                {result.executives.map((e, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-muted/60 border border-border text-xs">
                    <span className="font-bold text-foreground">{e.name}</span>
                    <span className="text-cyan-400 text-[11px] font-mono ml-2">({e.title})</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <Sparkles className="w-10 h-10 text-amber-500/40 mb-3" />
              <p className="text-xs">No active investigation output.</p>
              <p className="text-[11px] text-muted-foreground/70 mt-1">
                Select a target enterprise or input custom corporate details to run local GPU analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
