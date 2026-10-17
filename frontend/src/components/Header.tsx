import React from 'react';
import {
  FileText,
  ShieldAlert,
  AlertTriangle,
  Cpu,
  Building2,
  Users,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { DueDiligenceDossier } from '../types/dossier';

interface HeaderProps {
  currentDossier: DueDiligenceDossier | null;
  dossiers: DueDiligenceDossier[];
  onSelectDossier: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDossier,
  dossiers,
  onSelectDossier,
}) => {
  const getRiskScoreBadge = (score: number) => {
    if (score >= 65) {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-500/20 font-mono">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>ELEVATED RISK: {score}/100</span>
        </span>
      );
    }
    if (score >= 40) {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/20 font-mono">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>MODERATE RISK: {score}/100</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/20 font-mono">
        <TrendingUp className="w-3.5 h-3.5" />
        <span>LOW RISK: {score}/100</span>
      </span>
    );
  };

  return (
    <header className="border-b border-border bg-card/60 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-bold text-lg">
            DS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Dossier
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium font-mono">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Autonomous Enterprise Research & Due Diligence Dossier
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Target Company Selector */}
          <select
            value={currentDossier?.id || ''}
            onChange={(e) => onSelectDossier(e.target.value)}
            className="text-xs py-1.5 px-3 bg-muted/80 border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
          >
            {dossiers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.company_name} ({d.ticker || 'PRIVATE'})
              </option>
            ))}
          </select>

          {/* Risk Score Pill */}
          {currentDossier && getRiskScoreBadge(currentDossier.risk_score)}

          {/* Company Meta Badges */}
          {currentDossier && (
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground font-mono bg-muted/50 px-3 py-1 rounded-lg border border-border">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[120px]">{currentDossier.headquarters.split('/')[0]}</span>
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-400" />
                <span>{currentDossier.employees}</span>
              </span>
            </div>
          )}

          {/* Local GPU Telemetry Tag */}
          <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-1 rounded-lg border border-border text-xs text-emerald-400 font-medium">
            <Cpu className="w-3.5 h-3.5" />
            <span>Dedicated NVIDIA GPU</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
