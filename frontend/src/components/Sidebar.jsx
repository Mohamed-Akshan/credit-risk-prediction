import { Activity, BarChart3, BrainCircuit, CircleHelp, ShieldCheck } from 'lucide-react';

const tabs = [
  { id: 'assessment', label: 'Risk Assessment', icon: Activity },
  { id: 'how', label: 'How It Works', icon: CircleHelp },
  { id: 'metrics', label: 'Model & Metrics', icon: BarChart3 },
  { id: 'about', label: 'About', icon: BrainCircuit },
];

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><ShieldCheck size={30} strokeWidth={2.4} /></div><span>Credit Risk<br />Prediction</span></div>
      <nav className="navigation" aria-label="Main navigation">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={`nav-link ${page === id ? 'active' : ''}`} onClick={() => onNavigate(id)} aria-current={page === id ? 'page' : undefined}>
            <Icon size={20} /> <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer"><div className="sidebar-bars"><i /><i /><i /><i /><i /></div><span>ML-powered decision support</span><small>Educational prototype · Not a lending decision</small></div>
    </aside>
  );
}
