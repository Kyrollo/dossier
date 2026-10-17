import React from 'react';
import {
  DueDiligenceDossier,
} from '../types/dossier';
import {
  Building2,
  FileText,
  DollarSign,
  Users,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface DueDiligenceTabProps {
  dossier: DueDiligenceDossier;
}

export const DueDiligenceTab: React.FC<DueDiligenceTabProps> = ({ dossier }) => {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] overflow-hidden bg-background">
      {/* Center Main Content: Briefing, Financials, Leadership (8 cols) */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 space-y-6">
        {/* Company Header Card */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {dossier.company_name}
                </h2>
                {dossier.ticker && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-bold">
                    NASDAQ: {dossier.ticker}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {dossier.industry} • Founded {dossier.founded_year} • HQ: {dossier.headquarters}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Synthesis Latency: {dossier.latency_ms}ms</span>
            </div>
          </div>

          {/* Executive Briefing Summary */}
          <div className="pt-3 border-t border-border space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Due Diligence Briefing (Ollama {dossier.model})</span>
            </div>
            <MarkdownRenderer content={dossier.executive_summary} defaultMaxHeight="max-h-[500px]" />
          </div>
        </div>

        {/* Financial Indicators Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Financial Durability Indicators ({dossier.financials.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {dossier.financials.map((fin, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-card border border-border shadow-sm space-y-1 hover:border-emerald-500/40 transition-colors"
              >
                <span className="text-[11px] text-muted-foreground font-medium block truncate">
                  {fin.metric_name}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black font-mono text-foreground">
                    {fin.value}
                  </span>
                  {fin.yoy_growth && (
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {fin.yoy_growth}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground/70 font-mono block">
                  Period: {fin.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Leadership Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Key Executive Leadership ({dossier.executives.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dossier.executives.map((exec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-card border border-border shadow-sm space-y-2.5 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400 truncate">
                      {exec.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                      {exec.tenure_years} yrs tenure
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">{exec.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {exec.bio}
                  </p>
                </div>

                {exec.prior_roles.length > 0 && (
                  <div className="pt-2 border-t border-border flex flex-wrap gap-1">
                    {exec.prior_roles.map((role, rIdx) => (
                      <span
                        key={rIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Source Footnotes & Verifiable Evidence Drawer (4 cols, 380px) */}
      <div className="w-full lg:w-96 border-l border-border bg-card/60 backdrop-blur-md flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-foreground">
              Verifiable Footnotes & Evidence
            </h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {dossier.evidence_sources.length} Sources
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {dossier.evidence_sources.map((src) => (
            <div
              key={src.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-border space-y-2 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {Math.round(src.confidence_score * 100)}% Confidence
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {src.publication_date}
                </span>
              </div>

              <h4 className="text-xs font-bold text-foreground leading-snug">
                {src.title}
              </h4>

              <p className="text-[11px] text-slate-300 italic bg-slate-900 p-2 rounded border border-slate-800 leading-relaxed">
                "{src.excerpt}"
              </p>

              <a
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 truncate transition-colors pt-1"
              >
                <span className="truncate">{src.url}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
