import React from 'react';
import {
  DueDiligenceDossier,
  RiskCategory,
  RiskFactor,
  RiskSeverity,
} from '../types/dossier';
import {
  ShieldAlert,
  AlertOctagon,
  AlertTriangle,
  Scale,
  TrendingDown,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface RiskRadarTabProps {
  dossier: DueDiligenceDossier;
}

const CATEGORY_ICONS: Record<RiskCategory, React.ReactNode> = {
  REGULATORY: <Scale className="w-4 h-4 text-rose-400" />,
  LEGAL: <AlertOctagon className="w-4 h-4 text-purple-400" />,
  MARKET: <TrendingDown className="w-4 h-4 text-amber-400" />,
  OPERATIONAL: <Cpu className="w-4 h-4 text-cyan-400" />,
  FINANCIAL: <AlertTriangle className="w-4 h-4 text-emerald-400" />,
};

const SEVERITY_COLORS: Record<RiskSeverity, { bg: string; text: string; border: string }> = {
  HIGH: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  MEDIUM: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  LOW: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

export const RiskRadarTab: React.FC<RiskRadarTabProps> = ({ dossier }) => {
  const risksByCategory = React.useMemo(() => {
    const map: Partial<Record<RiskCategory, RiskFactor[]>> = {};
    dossier.risks.forEach((r) => {
      if (!map[r.category]) map[r.category] = [];
      map[r.category]!.push(r);
    });
    return map;
  }, [dossier.risks]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] overflow-y-auto p-6 space-y-6 bg-background">
      {/* Risk Overview Header */}
      <div className="p-6 rounded-2xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Risk Taxonomy & Due Diligence Matrix
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            4-Pillar risk breakdown across regulatory, legal, operational, and market threats for{' '}
            <strong className="text-foreground">{dossier.company_name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-muted/40 p-3 rounded-xl border border-border">
          <div className="text-right">
            <span className="text-[11px] text-muted-foreground block">Composite Risk Score</span>
            <span className="text-2xl font-black font-mono text-rose-400">
              {dossier.risk_score} / 100
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-rose-500/30 border-t-rose-500 flex items-center justify-center font-bold text-xs font-mono">
            {dossier.risk_score}%
          </div>
        </div>
      </div>

      {/* 4 Pillars Risk Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(['REGULATORY', 'LEGAL', 'MARKET', 'OPERATIONAL'] as RiskCategory[]).map((cat) => {
          const categoryRisks = risksByCategory[cat] || [];
          const maxImpact = Math.max(0, ...categoryRisks.map((r) => r.impact_score));

          return (
            <div
              key={cat}
              className="p-4 rounded-xl bg-card border border-border space-y-3 shadow-sm hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {CATEGORY_ICONS[cat]}
                  <span className="text-xs font-bold text-foreground">{cat}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  {categoryRisks.length} Factors
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Pillar Exposure</span>
                  <span className="font-mono font-bold text-foreground">{maxImpact}/10</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      maxImpact >= 7
                        ? 'bg-rose-500'
                        : maxImpact >= 4
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${maxImpact * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Risk Factor Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Individual Risk Exposures & Evidence Attribution ({dossier.risks.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dossier.risks.map((risk) => {
            const sevColor = SEVERITY_COLORS[risk.severity];

            return (
              <div
                key={risk.id}
                className="p-5 rounded-2xl bg-card border border-border space-y-3 shadow-sm hover:border-indigo-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-muted-foreground px-2 py-0.5 rounded bg-muted">
                        {risk.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${sevColor.bg} ${sevColor.text} ${sevColor.border}`}
                      >
                        {risk.severity} SEVERITY
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-rose-400">
                      Impact: {risk.impact_score}/10
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-foreground">{risk.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {risk.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span className="truncate">Source: {risk.evidence_source}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
