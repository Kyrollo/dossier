import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { DueDiligenceTab } from './components/DueDiligenceTab';
import { RiskRadarTab } from './components/RiskRadarTab';
import { AutonomousLabTab } from './components/AutonomousLabTab';
import { fetchDossiers } from './lib/api';
import { DueDiligenceDossier } from './types/dossier';
import {
  FileText,
  ShieldAlert,
  Search,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function App() {
  const [dossiers, setDossiers] = useState<DueDiligenceDossier[]>([]);
  const [selectedDossierId, setSelectedDossierId] = useState<string>('dos-aeth-101');
  const [activeTab, setActiveTab] = useState<'dossier' | 'radar' | 'lab'>('dossier');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDossiers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchDossiers();
      setDossiers(data);
      if (data.length > 0 && !data.some((d) => d.id === selectedDossierId)) {
        setSelectedDossierId(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load enterprise dossiers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDossiers();
  }, []);

  const currentDossier =
    dossiers.find((d) => d.id === selectedDossierId) || dossiers[0] || null;

  const handleDossierGenerated = (newDossier: DueDiligenceDossier) => {
    setDossiers((prev) => [newDossier, ...prev]);
    setSelectedDossierId(newDossier.id);
    setActiveTab('dossier');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Header
        currentDossier={currentDossier}
        dossiers={dossiers}
        onSelectDossier={(id) => setSelectedDossierId(id)}
      />

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card/40 px-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'dossier'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Due Diligence Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'radar'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Risk Taxonomy & Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'lab'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Autonomous Research Lab</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            <p className="text-xs text-muted-foreground font-mono">
              Loading corporate dossiers, leadership graphs, and SEC filings...
            </p>
          </div>
        ) : error ? (
          <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 text-center">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 max-w-md">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
              <h3 className="text-sm font-semibold">Dossier Load Failure</h3>
              <p className="text-xs mt-1 font-mono text-rose-300">{error}</p>
              <button
                onClick={loadDossiers}
                className="mt-3 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        ) : currentDossier ? (
          <>
            {activeTab === 'dossier' && <DueDiligenceTab dossier={currentDossier} />}
            {activeTab === 'radar' && <RiskRadarTab dossier={currentDossier} />}
            {activeTab === 'lab' && <AutonomousLabTab onDossierGenerated={handleDossierGenerated} />}
          </>
        ) : null}
      </main>
    </div>
  );
}
