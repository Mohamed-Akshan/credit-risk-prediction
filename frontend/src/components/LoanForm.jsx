
import { BadgeCheck, FileText, Sparkles } from 'lucide-react';


const fields = [
  { name: 'age', label: 'Age (years)', min: 18, max: 100, step: 1 },
  { name: 'income', label: 'Annual Income (LKR)', min: 0.01, step: 'any' },
  { name: 'loan_amount', label: 'Loan Amount (LKR)', min: 0.01, step: 'any' },
  { name: 'loan_tenure_months', label: 'Loan Tenure (months)', min: 1, step: 1 },
  { name: 'avg_dpd_per_delinquency', label: 'Average DPD (days)', min: 0, step: 1 },
  { name: 'delinquency_ratio', label: 'Delinquency Ratio (%)', min: 0, max: 100, step: 1 },
  { name: 'credit_utilization_ratio', label: 'Credit Utilization (%)', min: 0, max: 100, step: 1 },
  { name: 'num_open_accounts', label: 'Open Loan Accounts', min: 0, step: 1 },
];


const selections = [
  {
    name: 'residence_type',
    label: 'Residence Type',
    options: ['Owned', 'Rented', 'Mortgage']
  },
  {
    name: 'loan_purpose',
    label: 'Loan Purpose',
    options: ['Education', 'Home', 'Auto', 'Personal']
  },
  {
    name: 'loan_type',
    label: 'Loan Type',
    options: ['Unsecured', 'Secured']
  },
];


export default function LoanForm({
  form,
  onChange,
  onSubmit,
  loading
}) {

  const ratio = Number(form.income) > 0
    ? Number(form.loan_amount) / Number(form.income)
    : null;

  return (
    <section className="panel form-panel">

      <div className="panel-heading">
        <span className="panel-heading-icon">
          <FileText size={23} />
        </span>

        <div>
          <h2>Loan Application Details</h2>
          <p>Enter applicant information to estimate credit risk.</p>
        </div>
      </div>

      <form onSubmit={onSubmit}>

        <div className="field-grid">

          {fields.map(({ name, label, min, max, step }) => (

            <label className="field" key={name}>

              <span>{label}</span>

              <input
                type="number"
                name={name}
                aria-label={label}
                value={form[name]}
                onChange={(e) => onChange(name, e.target.value)}
                min={min}
                max={max}
                step={step}
                required
              />

            </label>

          ))}

        </div>

        <div className="ratio-line">

          <div>
            <BadgeCheck size={17} />
            Loan-to-Income Ratio
            <small>Automatically calculated</small>
          </div>

          <strong>
            {ratio === null ? '—' : ratio.toFixed(2)}
          </strong>

        </div>

        <div className="select-grid">

          {selections.map(({ name, label, options }) => (

            <label className="field" key={name}>

              <span>{label}</span>

              <select
                name={name}
                value={form[name]}
                onChange={(e) => onChange(name, e.target.value)}
              >

                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}

              </select>

            </label>

          ))}

        </div>

        <button
          className="submit-button"
          type="submit"
          disabled={loading}
        >
          <Sparkles size={19} />

          {loading ? 'Calculating risk…' : 'Predict Credit Risk'}

        </button>

      </form>

    </section>
  );
}
