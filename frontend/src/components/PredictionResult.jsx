import { AlertCircle, CheckCircle2, Info, Layers3, Percent, TrendingUp } from 'lucide-react';

export default function PredictionResult({ result, error, loading }) {
  const probability = result ? Math.max(0, Math.min(1, Number(result.default_probability))) : null;
  const score = result ? Number(result.credit_score) : null;
  const rating = result?.rating || '';
  const risk = result?.risk_flag || '';
  const highRisk = risk.toLowerCase() === 'review';
  const arc = score == null ? 0 : Math.max(0, Math.min(1, (score - 300) / 600));
  const x = 24 + 192 * arc;
  const y = 115 - 96 * Math.sin(Math.PI * arc);

  return (
    <section className="panel result-panel" aria-live="polite">
      <div className="panel-heading"><span className="panel-heading-icon"><TrendingUp size={23}/></span><div><h2>Prediction Result</h2><p>Your XGBoost credit risk assessment.</p></div></div>
      {error && <div className="error-alert" role="alert"><AlertCircle size={20}/><span>{error}</span></div>}
      {!result ? (
        <div className="empty-state"><div className="empty-icon"><TrendingUp size={40}/></div><h3>{loading ? 'Analyzing application…' : 'Ready to assess credit risk'}</h3><p>{loading ? 'Sending your information to the FastAPI model.' : 'Fill in the loan application and select “Predict Credit Risk” to see your results.'}</p></div>
      ) : (
        <>
          <div className={`score-hero ${highRisk ? 'elevated' : ''}`}>
            <div className="score-gauge">
              <svg viewBox="0 0 240 144" role="img" aria-label={`Illustrative credit score ${score} out of 900`}>
                <defs><linearGradient id="gaugeGradient" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#23bb70"/><stop offset="0.57" stopColor="#7dcf4b"/><stop offset="1" stopColor="#fcbf33"/></linearGradient></defs>
                <path d="M24 115 A96 96 0 0 1 216 115" fill="none" stroke="#dceee7" strokeWidth="17" strokeLinecap="round" />
                <path d="M24 115 A96 96 0 0 1 216 115" fill="none" stroke="url(#gaugeGradient)" strokeWidth="17" strokeLinecap="round" pathLength="100" strokeDasharray={`${arc*100} 100`} />
                <circle cx={x} cy={y} r="5" fill="#fff" stroke="#41536b" strokeWidth="2" />
                <text x="120" y="103" textAnchor="middle" className="gauge-number">{score}</text>
                <text x="120" y="126" textAnchor="middle" className="gauge-max">/ 900</text>
              </svg>
            </div>
            <div className="score-description"><div className={`rating-chip ${highRisk ? 'danger' : ''}`}>{highRisk ? <AlertCircle size={19}/> : <CheckCircle2 size={19}/>} {rating}</div><p>{highRisk ? 'Flagged for additional review' : 'Lower risk at current threshold'}</p><div className={`flag-chip ${highRisk ? 'danger' : ''}`}>Risk flag: {risk}</div></div>
          </div>
          <div className="result-metrics"><div className="metric-box"><div className="metric-label"><Layers3 size={19}/> Default Probability</div><strong>{(probability*100).toFixed(2)}%</strong></div><div className="metric-box"><div className="metric-label"><Percent size={19}/> Loan-to-Income Ratio</div><strong>{Number(result.loan_to_income_ratio).toFixed(2)}</strong></div></div>
          <div className="meaning-box"><h3><Info size={20}/> What this means</h3><p>The model estimates a <b>{(probability*100).toFixed(2)}%</b> probability of default and assigns an illustrative score of <b>{score}</b>. The current risk flag is <b>{risk}</b>. Predictions support review, not automatic lending decisions.</p></div>
        </>
      )}
      <div className="result-footnote">Scores are illustrative and probabilities have not been independently calibrated.</div>
    </section>
  );
}
