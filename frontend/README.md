# Credit Risk Prediction — React Frontend

A responsive React + Vite app inspired by the approved credit-risk dashboard concept. It sends the exact form fields to the FastAPI `POST /predict` endpoint.

## Requirements
- Node.js 20.19+ or 22.12+
- Running FastAPI server at `http://127.0.0.1:8000`

## Setup (from your project root)
```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```
Visit `http://localhost:5173`.

If using CMD instead of PowerShell, use `copy .env.example .env`.

## Backend (in a separate terminal)
```powershell
cd backend
uvicorn app.main:app --reload
```
The backend needs `backend/artifacts/model_data.joblib` and CORS enabled for `http://localhost:5173` (already in the backend example). Verify `http://127.0.0.1:8000/docs` first.

## API contract
`POST /predict` expects:
```json
{
  "age": 28,
  "income": 1200000,
  "loan_amount": 2560000,
  "loan_tenure_months": 36,
  "avg_dpd_per_delinquency": 20,
  "delinquency_ratio": 30,
  "credit_utilization_ratio": 30,
  "num_open_accounts": 2,
  "residence_type": "Owned",
  "loan_purpose": "Education",
  "loan_type": "Unsecured"
}
```
Response: `default_probability`, `credit_score`, `rating`, `risk_flag`, `loan_to_income_ratio`.

## Notes
- No hard-coded prediction values: the result panel is blank until the API returns a prediction.
- The loan-to-income ratio is previewed in the form but computed independently by FastAPI as the source of truth.
- No PostgreSQL or MLflow frontend integration is necessary.
- The 300–900 credit score is an illustrative derived score, not a validated credit bureau score. Raw probabilities require calibration before real lending use.
