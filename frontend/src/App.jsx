
import { useState } from "react";
import { assessCreditRisk } from "./api";


const initialForm = {
  age: 28,
  income: 1200000,
  loan_amount: 2560000,
  loan_tenure_months: 36,
  num_open_accounts: 2,
  credit_utilization_ratio: 30,
  delinquency_ratio: 5,
  avg_dpd_per_delinquency: 2,
  residence_type: "Owned",
  loan_purpose: "Education",
  loan_type: "Unsecured",
};


const numberFields = [
  {
    name: "age",
    label: "Applicant Age",
    min: 18,
    max: 100,
  },
  {
    name: "income",
    label: "Annual Income",
    min: 0.01,
  },
  {
    name: "loan_amount",
    label: "Loan Amount",
    min: 0.01,
  },
  {
    name: "loan_tenure_months",
    label: "Loan Tenure (Months)",
    min: 1,
  },
  {
    name: "num_open_accounts",
    label: "Open Loan Accounts",
    min: 0,
  },
  {
    name: "credit_utilization_ratio",
    label: "Credit Utilization (%)",
    min: 0,
    max: 100,
  },
  {
    name: "delinquency_ratio",
    label: "Delinquency Ratio (%)",
    min: 0,
    max: 100,
  },
  {
    name: "avg_dpd_per_delinquency",
    label: "Average Days Past Due",
    min: 0,
  },
];


const selectFields = [
  {
    name: "residence_type",
    label: "Residence Type",
    options: ["Owned", "Rented", "Mortgage"],
  },
  {
    name: "loan_purpose",
    label: "Loan Purpose",
    options: ["Education", "Home", "Auto", "Personal"],
  },
  {
    name: "loan_type",
    label: "Loan Type",
    options: ["Unsecured", "Secured"],
  },
];


const integerFields = [
  "age",
  "loan_tenure_months",
  "num_open_accounts",
];


// Default probability gauge
function RiskGauge({ probability }) {
  const percent = Math.max(
    0,
    Math.min(probability * 100, 100)
  );

  const angle = Math.PI * (1 - percent / 100);

  const indicatorX = 160 + 125 * Math.cos(angle);
  const indicatorY = 155 - 125 * Math.sin(angle);

  return (
    <div className="risk-gauge">
      <svg
        viewBox="0 0 320 190"
        role="img"
        aria-label={`Default probability ${percent.toFixed(2)} percent`}
      >
        <defs>
          <linearGradient
            id="gaugeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#21B478" />
            <stop offset="30%" stopColor="#A9D64D" />
            <stop offset="52%" stopColor="#FFD154" />
            <stop offset="76%" stopColor="#FF9645" />
            <stop offset="100%" stopColor="#F05C55" />
          </linearGradient>
        </defs>

        <path
          d="M 35 155 A 125 125 0 0 1 285 155"
          fill="none"
          stroke="#E8EDE8"
          strokeWidth="25"
          strokeLinecap="round"
        />

        <path
          d="M 35 155 A 125 125 0 0 1 285 155"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="25"
          strokeLinecap="round"
        />

        <circle
          cx={indicatorX}
          cy={indicatorY}
          r="11"
          fill="#FFFFFF"
          stroke="#075B3D"
          strokeWidth="5"
        />

        <text
          x="160"
          y="112"
          textAnchor="middle"
          className="gauge-percentage"
        >
          {percent.toFixed(2)}%
        </text>

        <text
          x="160"
          y="136"
          textAnchor="middle"
          className="gauge-caption"
        >
          Default Probability
        </text>
      </svg>
    </div>
  );
}


export default function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Update form fields
  function updateField(name, value) {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setResult(null);
    setError("");
  }


  // Reset form
  function resetForm() {
    setForm(initialForm);
    setResult(null);
    setError("");
  }


  // Call the trained model through FastAPI
  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const prediction = await assessCreditRisk(form);

      setResult(prediction);
    } catch (err) {
      setError(
        err.message || "Unable to calculate credit risk."
      );
    } finally {
      setLoading(false);
    }
  }


  // Calculate loan-to-income ratio
  const loanToIncome =
    Number(form.income) > 0
      ? (
        Number(form.loan_amount) /
        Number(form.income)
      ).toFixed(2)
      : "—";

  const isReview = result?.risk_flag === "Review";


  return (
    <div className="app">

      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">

          <div className="brand">
            <div className="brand-mark">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="29"
                  width="8"
                  height="13"
                  rx="2"
                  fill="#87CE72"
                />

                <rect
                  x="18"
                  y="21"
                  width="8"
                  height="21"
                  rx="2"
                  fill="#38B77A"
                />

                <rect
                  x="31"
                  y="11"
                  width="8"
                  height="31"
                  rx="2"
                  fill="#087A50"
                />

                <path
                  d="M6 22L21 12L28 16L41 4"
                  stroke="#075B3D"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="brand-text">
              <strong>Credit Risk</strong>
              <span>INTELLIGENCE</span>
            </div>
          </div>

          <div className="navbar-badge">
            <span className="badge-dot" />
            ML-Powered Risk Assessment
          </div>

        </div>
      </header>


      <main className="main-container">

        {/* Hero */}
        <section className="hero">
          <div className="hero-copy">

            <div className="hero-eyebrow">
              CREDIT RISK INTELLIGENCE
            </div>

            <h1>
              Loan <span>Risk Assessment</span>
            </h1>

            <p>
              Estimate the probability of loan default using
              a trained machine learning model.
            </p>
          </div>

          <div
            className="hero-illustration"
            aria-hidden="true"
          >
            <div className="illustration-glow" />

            <div className="illustration-bars">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="illustration-bank">
              <div className="bank-roof" />

              <div className="bank-columns">
                <span />
                <span />
                <span />
              </div>

              <div className="bank-base" />
            </div>

            <div className="illustration-paper">
              <strong>LOAN</strong>
              <span />
              <span />
              <span />
            </div>

            <div className="illustration-shield">
              ✓
            </div>
          </div>
        </section>


        {/* Dashboard */}
        <section className="dashboard">

          {/* Loan Application Form */}
          <form
            className="dashboard-card applicant-card"
            onSubmit={handleSubmit}
          >
            <div className="card-header">
              <div className="section-mark">
                <span>01</span>
              </div>

              <div className="card-header-text">
                <h2>Applicant Information</h2>
                <p>
                  Enter customer and loan information
                  for risk prediction.
                </p>
              </div>
            </div>


            {/* Numerical inputs */}
            <div className="form-grid">
              {numberFields.map((field) => (
                <label
                  className="form-field"
                  key={field.name}
                >
                  <span className="field-label">
                    {field.label}
                  </span>

                  <input
                    type="number"
                    required
                    min={field.min}
                    max={field.max}
                    step={
                      integerFields.includes(field.name)
                        ? "1"
                        : "any"
                    }
                    value={form[field.name]}
                    onChange={(event) =>
                      updateField(
                        field.name,
                        event.target.value === ""
                          ? ""
                          : Number(event.target.value)
                      )
                    }
                  />
                </label>
              ))}


              {/* Categorical inputs */}
              {selectFields.map((field) => (
                <label
                  className="form-field"
                  key={field.name}
                >
                  <span className="field-label">
                    {field.label}
                  </span>

                  <select
                    value={form[field.name]}
                    onChange={(event) =>
                      updateField(
                        field.name,
                        event.target.value
                      )
                    }
                  >
                    {field.options.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>


            {/* Loan-to-income ratio */}
            <div className="ratio-panel">
              <div className="ratio-details">
                <strong>Loan-to-Income Ratio</strong>

                <span>
                  Automatically calculated from the
                  loan amount and income.
                </span>
              </div>

              <div className="ratio-value">
                {loanToIncome}
              </div>
            </div>


            {/* Form actions */}
            <div className="form-actions">
              <button
                type="button"
                className="reset-button"
                onClick={resetForm}
              >
                Reset Form
              </button>

              <button
                type="submit"
                className="analyze-button"
                disabled={loading}
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Credit Risk"}
              </button>
            </div>


            {/* Error message */}
            {error && (
              <div
                className="error-message"
                role="alert"
              >
                {error}
              </div>
            )}
          </form>


          {/* Risk Assessment Results */}
          <div className="dashboard-card results-card">
            <div className="card-header">
              <div className="section-mark">
                <span>02</span>
              </div>

              <div className="card-header-text">
                <h2>Risk Assessment Result</h2>
                <p>
                  Machine learning prediction for the
                  current loan application.
                </p>
              </div>
            </div>


            {result ? (
              <div
                className="results-content"
                aria-live="polite"
              >

                {/* Default probability */}
                <div className="risk-overview">
                  <RiskGauge
                    probability={
                      result.default_probability
                    }
                  />

                  <div
                    className={`risk-status ${isReview
                        ? "risk-review"
                        : "risk-low"
                      }`}
                  >
                    <span className="status-symbol">
                      {isReview ? "!" : "✓"}
                    </span>

                    <div>
                      <strong>
                        {isReview
                          ? "Review Required"
                          : "Lower Risk"}
                      </strong>

                      <span>
                        {isReview
                          ? "Further assessment recommended"
                          : "Lower predicted default risk"}
                      </span>
                    </div>
                  </div>
                </div>


                {/* Prediction metrics */}
                <div className="metrics-grid">

                  <div className="metric-card">
                    <span className="metric-label">
                      Credit Score
                    </span>

                    <strong className="metric-number">
                      {result.credit_score}
                      <small> / 900</small>
                    </strong>
                  </div>

                  <div className="metric-card">
                    <span className="metric-label">
                      Risk Rating
                    </span>

                    <strong className="metric-rating">
                      {result.rating}
                    </strong>
                  </div>

                  <div className="metric-card">
                    <span className="metric-label">
                      Loan-to-Income
                    </span>

                    <strong className="metric-number">
                      {result.loan_to_income_ratio}
                    </strong>
                  </div>

                </div>
              </div>
            ) : (

              /* Empty state */
              <div className="empty-result">
                <div className="empty-result-circle">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 45A24 24 0 0 1 54 45"
                      stroke="#8BCBA7"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M32 45L45 28"
                      stroke="#075B3D"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    <circle
                      cx="32"
                      cy="45"
                      r="5"
                      fill="#075B3D"
                    />
                  </svg>
                </div>

                <h3>Ready for assessment</h3>

                <p>
                  Enter the applicant information and
                  click Analyze Credit Risk to view
                  the prediction results.
                </p>
              </div>
            )}
          </div>

        </section>


        <footer className="footer">
          <span>© 2026 Credit Risk Intelligence</span>
          <span>React · FastAPI · Machine Learning</span>
        </footer>

      </main>
    </div>
  );
}
